import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from "../ErrorHandler";


export const AddParentApi = (firstName, lastName, emailId, mobileNo, studentName, address, city, state, pincode, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        fisrtName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        address: address,
        aadharNo: "",
        city: city,
        state: state,
        country: "",
        pinCode: pincode,

    };
    // if (sId !== null && sId !== "") {
    //     data.id = sId;
    // }
    const url = 'Student/AddStuent';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('API response:', response);
 toast.success("Parent added successfully!");
            // if (data.id) {
            //     toast.success("Student updated successfully!");
            // } else {
            //     toast.success("Student added successfully!");
            // }
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

export const getAllParentApi = (navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        userId: userId,
    };
    const url = 'ParentMaster/GetAllParent';
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

export const getStudentApi = (studentId, navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        userId: userId,
        Id: studentId,
    };
    const url = 'Student/GetStuent';
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

export const deleteStudentApi = (studentId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        id: studentId,
    };
    const url = 'Student/Delete';
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