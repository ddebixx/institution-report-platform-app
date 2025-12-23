import { NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

export async function GET() {
  try {
    const csvPath = join(process.cwd(), 'data', 'institutions.csv')
    const exists = existsSync(csvPath)
    
    if (!exists) {
      return NextResponse.json(
        { 
          error: 'CSV file not found',
          path: csvPath,
          cwd: process.cwd(),
        },
        { status: 404 }
      )
    }

    const content = readFileSync(csvPath, 'utf-8')
    const lines = content.split('\n')
    const firstLine = lines[0] || ''
    const secondLine = lines[1] || ''
    const firstDataFields = secondLine.split(';')
    
    return NextResponse.json({
      success: true,
      path: csvPath,
      fileSize: content.length,
      totalLines: lines.length,
      firstLinePreview: firstLine.substring(0, 100),
      firstDataRowFields: firstDataFields.length,
      nameColumnValue: firstDataFields[4]?.substring(0, 80) || 'N/A',
      rspoColumnValue: firstDataFields[0]?.substring(0, 20) || 'N/A',
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}


