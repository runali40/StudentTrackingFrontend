import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from "../ErrorHandler";


export const AddPrincipalApi = (firstName, lastName, emailId, mobileNo, schoolName, schoolAddress, city, state, pincode, pId, roleName, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        fisrtName: firstName,
        lastName: lastName,
        emailId: emailId,
        mobileNo: mobileNo,
        address: schoolAddress,
        aadharNo: "",
        city: city.value,
        state: state.value,
        country: "",
        pinCode: pincode,
        schoolName: schoolName,
        roleName : roleName.value

    };
    if (pId !== null && pId !== "") {
        data.id = pId;
    }
    const url = 'ParentMaster/InsertParent';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('API response:', response);
            // toast.success("Parent added successfully!");
            if (data.id) {
                toast.success("Parent updated successfully!");
            } else {
                toast.success("Parent added successfully!");
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

export const getAllPrincipalApi = (navigate) => {
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

export const getPrincipalApi = (parentId, navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        userId: userId,
        Id: parentId,
    };
    const url = 'ParentMaster/GetParent';
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

export const deletePrincipalApi = (parentId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        id: parentId,
    };
    const url = 'ParentMaster/Delete';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('delete API response:', response.data);
            toast.success("Parent Deleted Successfully!")
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