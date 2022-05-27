// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/api/login`,
  registerEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/api/register`,
  refreshEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/api/refresh`,
  logoutEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/api/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
