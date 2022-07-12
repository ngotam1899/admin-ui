
export const AuthorizationActionTypes = {
  LOGIN : "LOGIN",
  LOGIN_SUCCESS : "LOGIN_SUCCESS",
  LOGIN_ERROR : "LOGIN_ERROR",

  LOGOUT : "LOGOUT",
}
/**
 *
 * @param {email, password} payload
 */
const onLogin = (payload) => ({
  type: AuthorizationActionTypes.LOGIN,
  payload,
});

const onLoginSuccess = (payload) => ({
  type: AuthorizationActionTypes.LOGIN_SUCCESS,
  payload,
});

const onLoginError = (error) => ({
  type: AuthorizationActionTypes.LOGIN_ERROR,
  payload: error,
});

const onLogout = () => ({
  type: AuthorizationActionTypes.LOGOUT,
});

const AuthorizationActions = {
  onLogin,
  onLoginSuccess,
  onLoginError,

  onLogout,
};

export default AuthorizationActions;
