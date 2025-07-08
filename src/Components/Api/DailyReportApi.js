import {apiClient }from "../../apiClient";
import ErrorHandler from "../ErrorHandler";
import Cookies from 'js-cookie';
 import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const fetchDailyReports = async (params, setCandidateData) => {
    try {
        const response = await apiClient({
            method: "get",
            params,
            url: `CandidateDailyReport/GetAll`,
        });
        const candidateData = response.data.data;
        setCandidateData(candidateData);
        const token1 = response.data.outcome.tokens;
        Cookies.set("UserCredential", token1, { expires: 7 });
    } catch (error) {
        if (error.response && error.response.data && error.response.data.outcome) {
            const token1 = error.response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
        }
        console.error(error);
        const errors = ErrorHandler(error);
        toast.error(errors);
    }
};