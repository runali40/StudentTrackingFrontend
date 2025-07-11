import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Storage from "../../../Storage";
import { apiClient } from "../../../apiClient";
import ErrorHandler from "../../../Components/ErrorHandler";
import Select from "react-select";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddParentApi } from "../../../Components/Api/ParentMasterApi";

const ParentMasterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dId } = location.state || {};
  const [dutyName, setDutyName] = useState("");
  const [allDutyName, setAllDutyName] = useState("")
  const [dutyDescription, setDutyDescription] = useState("");
  const [module, setModule] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [active, setActive] = useState(true);
  const [allScreens, setAllScreens] = useState([]);
  const [menuDataArray, setMenuDataArray] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [studentName, setStudentName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  const AddParentMaster = async () => {
        const data = await AddParentApi(firstName, lastName, emailId, mobileNo, studentName, address, city, state, pincode, navigate);
        console.log(data)  
    }

  useEffect(() => {
    if (isDataLoaded && dId) {
      const recruitId = localStorage.getItem("recruitId");
      const UserId = localStorage.getItem("userId");
      apiClient({
        method: "get",
        url: `DutyMaster/GetDutyById`,
        params: {
          UserId: UserId,
          d_id: dId,
          d_recruitid: recruitId,
          d_isactive: active === true ? "1" : "2"
        },
      })
        .then((response) => {
          console.log(response, "get by id duty master");
          if (response && response.data && response.data.data && response.data.data.length > 0) {
            const temp = response.data.data;

            // Map the data to options format
            const options = temp.map((item) => ({
              value: item.d_id,
              label: item.d_dutyname,
            }));

            // Set the state with the mapped options
            setDutyName(options[0]);
            setDutyDescription(response.data.data[0].d_description);
            setModule(response.data.data[0].d_module);
            setNoOfUsers(response.data.data[0].d_no_of_user);
            setMenuDataArray(response.data.data);
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
          } else {
            console.error("No data found in response");
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.outcome) {
            const token1 = error.response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
          }
          console.log(error);
          const errors = ErrorHandler(error);
          toast.error(errors);
        });
    }
  }, [isDataLoaded, dId, active]);

  const getAllData = () => {
    const recruitId = localStorage.getItem("recruitId");
    const UserId = localStorage.getItem("userId");
    return apiClient({
      method: "get",
      url: `GetWebMenu/GetMenu`,
      params: {
        UserId: UserId,
        RecruitId: recruitId,
      },
    })
      .then((response) => {
        console.log("response screens", response.data.data);
        setAllScreens(response.data.data);
        const token1 = response.data.outcome.tokens;
        Cookies.set("UserCredential", token1, { expires: 7 });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.outcome) {
          const token1 = error.response.data.outcome.tokens;
          Cookies.set("UserCredential", token1, { expires: 7 });
        }
        console.log(error);
        const errors = ErrorHandler(error);
        toast.error(errors);
      });
  };

  const getDutyName = () => {
    const recruitId = localStorage.getItem("recruitId");
    const UserId = localStorage.getItem("userId");
    return apiClient({
      method: "get",
      url: `DutyMaster/GetDutyName`,
      params: {
        UserId: UserId,
        RecruitId: recruitId,
      },
    })
      .then((response) => {
        console.log("response all duty name", response.data.data);
        const temp = response.data.data;
        const options = temp.map((data) => ({
          value: data.id,
          label: data.dutyname,
        }));
        setAllDutyName(options);
        const token1 = response.data.outcome.tokens;
        Cookies.set("UserCredential", token1, { expires: 7 });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.outcome) {
          const token1 = error.response.data.outcome.tokens;
          Cookies.set("UserCredential", token1, { expires: 7 });
        }
        console.log(error);
        const errors = ErrorHandler(error);
        toast.error(errors);
      });
  };

  const handleDutyName = (selected) => {
    setDutyName(selected);
  };



  useEffect(() => {
    // console.log(menuDataArray);
  }, [menuDataArray]);

  const addRoleMaster = () => {
    const recruitId = localStorage.getItem("recruitId");
    const UserId = localStorage.getItem("userId");
    // console.log(menuDataArray, "menuDataArray");
    let data;
    if (dutyName === "" || noOfUsers === "" || menuDataArray.length === 0) {
      toast.warning("Please fill data in all fields!");
    } else {
      data = {
        userId: UserId,
        d_recruitid: recruitId,
        d_dutyName: dutyName.label,
        d_description: dutyDescription,
        d_module: module,
        d_isactive: active === true ? "1" : "2",
        d_no_of_user: noOfUsers,
        Privilage: menuDataArray,
      };
      console.log(data.Privilage, "Privilage");
      if (dId !== null && dId !== "") {
        data.d_id = dId;
      }
      apiClient({
        method: "post",
        url: `DutyMaster`,
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add Duty Master");
          if (dId !== null && dId !== undefined) {
            toast.success("Duty updated successfully!");
          } else {
            toast.success("Duty added successfully!");
          }
          console.log(menuDataArray, "menu data array");
          const token1 = response.data.outcome.tokens;
          Cookies.set("UserCredential", token1, { expires: 7 });
          navigate("/dutyMaster");
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.outcome) {
            const token1 = error.response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
          }
          console.log(error);
          const errors = ErrorHandler(error);
          toast.error(errors);
        });
    }
  };


  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card-header" /* style={{ backgroundColor: 'white' }} */
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Add Parent</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    {/* <input
                      type="text"
                      id="custom-search"
                      className="form-control "
                      placeholder="Search"
                    /> */}
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-custom me-1">
                      <div
                        id="tableSearch"
                        className="dataTables_wrapper"
                      ></div>
                    </div>

                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/parentMaster");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <ArrowBack />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        First Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control mt-3"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {/* <Select
                        className="mt-3"
                        value={dutyName}
                        onChange={handleDutyName}
                        options={allDutyName}
                        placeholder="Select Duty Name"

                      /> */}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Last Name:
                      </label>{" "}
                      {/* <span className="text-danger fw-bold">*</span> */}
                      <input
                        type="text"
                        className="form-control mt-3"
                        id="lastName"
                        rows="2"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Email:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="emailId"
                        name="emailId"
                        className="form-control mt-3"
                        autoComplete="off"
                        placeholder="Enter Email Id"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Mobile No:
                      </label>
                      {" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="emailId"
                        name="emailId"
                        className="form-control mt-3"
                        autoComplete="off"
                        placeholder="Enter Mobile No"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Student Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <Select
                        className="mt-3"
                        value={studentName}
                        onChange={handleDutyName}
                        options={allDutyName}
                        placeholder="Select Student Name"

                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Address:
                      </label>
                      {" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control mt-3"
                        autoComplete="off"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        City:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <Select
                        className="mt-3"
                        value={city}
                        onChange={handleDutyName}
                        options={allDutyName}
                        placeholder="Select City"

                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        State:
                      </label>
                      {" "}
                      <span className="text-danger fw-bold">*</span>
                      <Select
                        className="mt-3"
                        value={state}
                        onChange={handleDutyName}
                        options={allDutyName}
                        placeholder="Select State"

                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Pin Code:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        className="form-control mt-3"
                        id="pinCode"
                        rows="2"
                        placeholder="Enter Pin Code"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                  </div>

                </div>
                <br />
              </div>
              <div className="card-footer">
                <button className="btn btn-primarty" onClick={AddParentMaster}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ParentMasterForm;
