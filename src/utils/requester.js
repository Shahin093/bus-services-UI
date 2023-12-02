import { merge } from "merge";
const axios = require("./axiosInterceptor");

const DEFAULTCONFIG = (type) => {
  return {
    method: type,
    headers: {
      "Content-Type": "application/type",
    },
    credentials: "same-origin",
  };
};

const jsonParse = (res) => {
  return res.json();
};

const requester = (req) => {
  try {
    let success = axios({
      method: req.method,
      url: req.url,
      data: req.body,
    })
      .then(function (response) {
        return {
          data: response.data.data,
          status_code: response.status,
          message: response.data.message,
          status_msg: response.data.status,
        };
      })
      .catch(function (error) {
        console.log(error);
      });
    return success;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export default requester;
