import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

// // Request interceptor to add the token to all outgoing requests
// async function setupAxiosInterceptors() {
//   const token = (await localStorage.getItem("token")) ?? "";

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       console.log("inside", token);
//       config.headers["Authorization"] = `Bearer ${token}`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// }

// // Call the setupAxiosInterceptors function after token initialization (e.g., after user login)
// setupAxiosInterceptors();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      // Token expired or invalid, redirect to login page
      window.location.href = "/sign";
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
