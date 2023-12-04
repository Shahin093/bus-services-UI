import { toast } from "react-toastify";
import axios from "../utils/axiosInterceptor";
// https://bus-service-dwuo9v8f7-shahin093.vercel.app
export const createAppointment = async (data) => {
  const result = await axios
    .post("https://bus-service-a999akkxn-shahin093.vercel.app/api/v1/", data)
    .then((response) => {
      // toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // toast.error(error.response.data.message);
      throw error.response.data;
    });
  return result;
};

export const getBusBookings = async (page) => {
  const pageNo = page ? page : 1;
  const queryParams = new URLSearchParams({});

  try {
    const response = await axios.get(
      `https://bus-service-a999akkxn-shahin093.vercel.app/api/v1/user`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const deleteAppointment = async (id) => {
  const result = await axios
    .delete(`http://localhost:4000/api/appointment/delete/${id}`)
    .then((response) => {
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return result;
};

export const updateAppointment = async (data) => {
  console.log("id, data", data);
  const result = await axios
    .put(`http://localhost:4000/api/appointment/update/${data?._id}`, data)
    .then((response) => {
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      throw error.response.data;
    });
  return result;
};
