import { Category } from "@material-ui/icons";
import { apiClient } from "../../apiClient";
import axios from "axios";
import ErrorHandler from "../ErrorHandler";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserLogin = async (imei, simNo, navigate) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const data = {
    userId: UserId,
    // imei: "867597018653144",
    // sim_number: "5754255847089",
     email: "runali.devit@gmail.com",
    password: "Rytmap@1234",
   
  };
  try {
    const response = await axios({
      method: "post",
      url: `http://43.240.64.219/api/login`,
      data: data,
    });
    // const token = response.data.outcome.tokens;
    // localStorage.setItem("UserCredential", token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error adding running event:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};

export const addGpsConfiguration = async (imei, simNo, navigate) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const data = {
    userId: UserId,
    // imei: "867597018653144",
    // sim_number: "5754255847089",
     imei: imei,
    sim_number: simNo,
    hashKey: null
  };
  try {
    const response = await apiClient({
      method: "post",
      url: `Device/Insert`,
      data: data,
    });
    // const token = response.data.outcome.tokens;
    // localStorage.setItem("UserCredential", token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error adding running event:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};