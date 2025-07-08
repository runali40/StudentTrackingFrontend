import { Category } from "@material-ui/icons";
import { apiClient } from "../../apiClient";
import ErrorHandler from "../ErrorHandler";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const getAllRunningEvents = async (menuId) => {
  console.log(menuId, "menuId")
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  try {
    const response = await apiClient({
      method: "get",
      url: `Running/GetAll`.toString(),
      params: {
        UserId: UserId,
        RecruitId: recruitId,
        eventId: menuId,
      },
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
    // const title = response.data.outcome.outcomeDetail;
    // localStorage.setItem("title", title);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error fetching all running events:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};

export const getRunningEvent = async (id, candidateId) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  try {
    const response = await apiClient({
      method: "get",
      url: `Running/Get`.toString(),
      params: {
        UserId: UserId,
        RecruitId: recruitId,
        CandidateId: candidateId,
        Id: id,
      },
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error fetching running event:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};

export const updateRunningEventSign = async (data) => {
  try {
    const response = await apiClient({
      method: "post",
      url: `Running/UpdateSign100`,
      data: data,
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error updating running event sign:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};

export const getAllChestNumbers = async (groupId) => {
  const menuId = localStorage.getItem("menuId");
  console.log("menuId", menuId)
  console.log(menuId,"menuid")
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const params = {
    UserId: UserId,
    RecruitId: recruitId,
    EventId: menuId,
    //   Gender: gender === "All" ? "All" : gender,
    groupid: groupId,
    Groundtestdata1: ""
  };
  try {
    const response = await apiClient({
      method: "get",
      params: params,
      url: `Candidate/GetAllChestNo`.toString(),
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error fetching all chest numbers:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};

export const addRunningEvent = async (runningData) => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const data = {
    userId: UserId,
    RecruitId: recruitId,
    runningData: runningData,
  };
  try {
    const response = await apiClient({
      method: "post",
      url: `Running/Insert`,
      data: data,
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
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

export const addShotPut = (data, storedToken, navigate, menuId) => {
  apiClient({
    method: "post",
    url: `ShotPut/Insert`,
    data: data,
  })
    .then((response) => {
      console.log("shot put", response.data.data);
      const token1 = response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
      // navigate(`/event/${menuId}`);
      navigate(-1);
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.outcome) {
        const token1 = error.response.data.outcome.tokens;
        Cookies.set("UserCredential", token1, { expires: 7 });
      }
      console.log(error);
      let errors = ErrorHandler(error);
      toast.error(errors);
    });
};

export const getAllGroup = async () => {
  const recruitId = localStorage.getItem("recruitId");
  const UserId = localStorage.getItem("userId");
  const eventId = localStorage.getItem("menuId");
  const parentId = localStorage.getItem("parentId").toLowerCase();
  const params = {
    UserId: UserId,
    RecruitId: recruitId,
    EventId: eventId,
    Category: parentId,
    Groundtestdata1: ""
  };
  try {
    const response = await apiClient({
      method: "get",
      params: params,
      url: `Candidate/GetGroup`.toString(),
    });
    const token = response.data.outcome.tokens;
    localStorage.setItem("UserCredential", token);
    const title = response.data.outcome.outcomeDetail;
    localStorage.setItem("title", title);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.outcome) {
      const token1 = error.response.data.outcome.tokens;
      Cookies.set("UserCredential", token1, { expires: 7 });
    }
    console.error("Error fetching all chest numbers:", error);
    const errors = ErrorHandler(error);
    toast.error(errors);
    throw error;
  }
};