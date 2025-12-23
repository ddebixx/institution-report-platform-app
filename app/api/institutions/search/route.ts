import { NextRequest, NextResponse } from "next/server"

import { searchInstitutionsFromCsv } from "@/lib/institutions-csv"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        { items: [] },
        { status: 200 }
      )
    }

    const trimmedQuery = query.trim()
    console.log(`[API] Search request for: "${trimmedQuery}"`)

    const results = searchInstitutionsFromCsv(trimmedQuery)

    console.log(`[API] Returning ${results.length} results`)

    return NextResponse.json(
      { items: results },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error("[API] Error:", error)
    
    const errorMessage =
      error instanceof Error ? error.message : "Failed to search institutions"

    return NextResponse.json(
      { 
        message: errorMessage,
        items: [],
      },
      { status: 500 }
    )
  }
}


