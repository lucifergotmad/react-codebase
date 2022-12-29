export enum SignInTypes {
  SIGN_IN_START = 'sign-in/SIGN_IN_START',
  SIGN_IN_SUCCESS = 'sign-in/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED = 'sign-in/SIGN_IN_FAILED',
}

export interface ISignInResponse {
  username: string
  password: string
  accessToken: string
  refreshToken: string
}
