// import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const checkAuthStatus = () => {
  // Retrieve the JWT token from the HTTP-only cookie
  // const accessToken = Cookies.get("access_token");

  const accessToken = localStorage.getItem("token") ?? "";

  if (accessToken) {
    // Validate the JWT token
    const isTokenValid = validateJwtToken(accessToken);
    return isTokenValid;
  }

  return false;
};

export const validateJwtToken = async (accessToken) => {
  try {
    const decodedToken = await jwt_decode(accessToken);

    // Check if the token has expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
