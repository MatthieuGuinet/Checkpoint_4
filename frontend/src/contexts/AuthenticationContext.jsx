import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthenticationContext = createContext();

export default AuthenticationContext;

export function AuthenticationProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfo, setUserInfo] = useState({});
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 12 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const logoutHandler = () => {
    Cookies.remove("userToken");
  };

  const AuthValue = useMemo(
    () => ({ userToken, setUser, userInfo, setUserInfo, logoutHandler }),
    [userToken, userInfo]
  );

  return (
    <AuthenticationContext.Provider value={AuthValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

AuthenticationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};