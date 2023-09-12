import { axiosInstance } from "../api";

export const login = async (loginCredentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginCredentials);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
