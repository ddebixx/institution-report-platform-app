import { searchInstitutions } from "@/fetchers/institutions"

type HandleInstitutionSearchParams = {
  query: string
  accessToken: string | null
}

export const handleInstitutionSearch = async ({
  query,
  accessToken,
}: HandleInstitutionSearchParams) => {
  return await searchInstitutions(query, accessToken ?? undefined)
}

