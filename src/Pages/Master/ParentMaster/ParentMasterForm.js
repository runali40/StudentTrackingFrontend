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
import { AddParentApi, getParentApi } from "../../../Components/Api/ParentMasterApi";
import { getAllStudentApi } from "../../../Components/Api/StudentApi";
import { getAllStateApi } from "../../../Components/Api/StateMasterApi";
import { getAllCityApi } from "../../../Components/Api/CityMasterApi";

const ParentMasterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parentId } = location.state || {};
  const [dutyName, setDutyName] = useState("");
  const [allDutyName, setAllDutyName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [studentName, setStudentName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [pId, setPId] = useState("")
  const [allStudent, setAllStudent] = useState([])
  const [allState, setAllState] = useState([])
  const [allCity, setAllCity] = useState([])

  const headerCellStyle = {
    backgroundColor: "#036672",
    color: "#fff",
  };

  useEffect(() => {
    getParent();
  }, [parentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllStudent();
        await getAllState();
        // await getAllCity();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getAllStudent = async () => {
    const data = await getAllStudentApi(navigate);
    console.log(data)
    const options = data.map((data) => ({
      value: data.Id,
      label: `${data.StudentName}`,
    }));
    setAllStudent(options);
  }

  const getAllState = async () => {
    const data = await getAllStateApi(navigate);
    console.log(data)
    const options = data.map((data) => ({
      value: data.s_id,
      label: `${data.s_Statename}`,
    }));
    setAllState(options);
  }

  const handleState = (selected) => {
    const selectedValue = selected;
    setState(selectedValue);
    console.log(selectedValue, "selected state value");
    getAllCity(selectedValue);
  }

  const getAllCity = async (selectedValue) => {
    const stateId = selectedValue.value;
    console.log(stateId,"88")
    const data = await getAllCityApi(stateId, navigate);
    console.log(data)
    const options = data.map((data) => ({
      value: data.c_id,
      label: `${data.c_cityvalue}`,
    }));
    setAllCity(options);
  }

  const handleStudent = (selected) => {
    const selectedValue = selected;
    setStudentName(selectedValue);
    console.log(selectedValue, "selected value");
  }



  const handleCity = (selected) => {
    const selectedValue = selected;
    setCity(selectedValue);
    console.log(selectedValue, "selected state value");
  }

  const AddParentMaster = async () => {
    const data = await AddParentApi(firstName, lastName, emailId, mobileNo, studentName, address, city, state, pincode, pId, navigate);
    console.log(data)
    navigate("/parentMaster")
  }

  const getParent = async () => {
    const data = await getParentApi(parentId, navigate);
    console.log(data)
    setFirstName(data.FisrtName)
    setLastName(data.LastName)
    setEmailId(data.EmailId)
    setMobileNo(data.MobileNo)
    setStudentName(data.ChildName)
    setAddress(data.Address)
    setCity(data.City)
    setState(data.State)
    setPincode(data.PinCode)
    setPId(data.Id)
  }

  const handleDutyName = (selected) => {
    setDutyName(selected);
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
                        onChange={handleStudent}
                        options={allStudent}
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
                        onChange={handleCity}
                        options={allCity}
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
                        onChange={handleState}
                        options={allState}
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
                <button className="btn btn-primary" onClick={AddParentMaster}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ParentMasterForm;
