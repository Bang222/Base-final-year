export const apiEndpoints = {
  me: process.env.NEXT_APP_BACKEND_URL + '/api/users/detail',
  login : process.env.NEXT_APP_BACKEND_URL + '/api/auth/login',
  register : process.env.NEXT_APP_BACKEND_URL + '/api/auth/register',
  oauthLogin:process.env.NEXT_APP_BACKEND_URL + '/api/auth/google/login'
}