import axios from "../utils/axiosInterceptor";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getLoggedInUser = async () => {
  const response = await axios.get("/api/getLoggedInUser").catch((error) => {
    throw error.response.data;
  });
  return response.data;
};

export const login = async (data) => {
  const response = await axios
    .post(
      "https://bus-service-dwuo9v8f7-shahin093.vercel.app/api/auth/login",
      data
    )
    .catch((error) => {
      throw error.response.data;
    });

  let userData = response.data.data;
  cookies.set("userPhoneNumber", userData.phoneNumber, { path: "/" });
  cookies.set("userId", userData._id, { path: "/" });
  cookies.set("role", userData.role, { path: "/" });

  localStorage.setItem("user", JSON.stringify({ ...userData }));

  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/api/auth/logout").catch((error) => {
    throw error.response.data;
  });
  return response.data;
};

export const signup = async (data) => {
  const response = await axios
    .post("https://bus-service-dwuo9v8f7-shahin093.vercel.app/api/signup", data)
    .catch((error) => {
      throw error.response.data;
    });
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axios
    .post("/api/forgotPassword", data)
    .catch((error) => {
      throw error.response.data;
    });
  return response.data;
};
export const resetPassword = async (data) => {
  const response = await axios
    .post("/api/resetPassword", data)
    .catch((error) => {
      throw error.response.data;
    });
  return response.data;
};
