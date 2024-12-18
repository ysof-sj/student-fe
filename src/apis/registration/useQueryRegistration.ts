import { IRegistrationInResponse } from '@domain/registration'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getSubjectRegistration } from '@src/services/registration'
import { useQuery } from '@tanstack/react-query'

export const useGetSubjectRegistration = (enabled = true) => {
  const query = useQuery<IRegistrationInResponse | null, Error>({
    queryKey: ['getSubjectRegistration'],
    queryFn: () => getSubjectRegistration(),
    enabled,
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
