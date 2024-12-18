import { ILoginRequest, ILoginResponse } from '@domain/auth/type'
import { post } from './HTTPService'
import { API_LIST } from '@constants/index'

export const APILogin = ({ email, password }: ILoginRequest): Promise<ILoginResponse> => {
  return post(API_LIST.auth.login, { email, password })
}
