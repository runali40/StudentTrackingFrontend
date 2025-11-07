import { Category } from "@material-ui/icons";
import { apiClient } from "../../apiClient";
import axios from "axios";
import ErrorHandler from "../ErrorHandler";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const DeviceLocationGetAll = async (imei, simNo, navigate) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const params = {
    userId: UserId,
    // imei: "867597018653144",
    // sim_number: "5754255847089",

    // hashKey: "$2y$10$p3VoFlZo6XBHXeDFq0ZJh.GgtDArrqIGnhlnYiJ4E9e8qjavQkoS."
  };
  try {
    const response = await apiClient({
      method: "get",
      url: `DeviceLocation/GetAll`,
      params: params,
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

export const DeviceLocationAddress = async (HashKey, navigate) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const params = {
    userId: UserId,
    // imei: "867597018653144",
    // sim_number: "5754255847089",

    HashKey: HashKey
  };
  try {
    const response = await apiClient({
      method: "get",
      url: `DeviceLocation/GetDevicesWithAddress`,
      params: params,
    });
    // const token = response.data.outcome.tokens;
    // localStorage.setItem("UserCredential", token);
    return response.data;
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