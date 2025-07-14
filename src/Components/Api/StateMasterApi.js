import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from "../ErrorHandler";


export const AddStateApi = (stateCode, stateName, sId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        s_Statename: stateName,
        s_code: stateCode,
        s_isactive: "1"

    };
    if (sId !== null && sId !== "") {
        data.s_id = sId;
    }
    const url = 'StateMaster';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('API response:', response);
            // toast.success("State added successfully!");
            if (data.s_id) {
                toast.success("State updated successfully!");
            } else {
                toast.success("State added successfully!");
            }
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const getAllStateApi = (navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        userId: userId,
        s_isactive: "1"
    };
    const url = 'StateMaster/GetAll';
    return apiClient({
        method: 'get',
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log('get all API response:', response.data);
            // toast.success("Job Added Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const GetStateApi = (stateId, navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        userId: userId,
        s_id: stateId,
    };
    const url = 'StateMaster/Get';
    return apiClient({
        method: 'get',
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log('get API response:', response.data);
            // toast.success("Job Added Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const DeleteStateApi = (stateId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        s_id: stateId,
    };
    const url = 'StateMaster/Delete';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('delete API response:', response.data);
            toast.success("Student Delete Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};