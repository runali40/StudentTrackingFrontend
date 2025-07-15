import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllStateApi } from "../../../Components/Api/StateMasterApi";
import { getAllCityApi } from "../../../Components/Api/CityMasterApi";
import { getAllRoleMasterData } from "../../../Components/Api/RoleMasterApi";
import { AddPrincipalApi, getPrincipalApi } from "../../../Components/Api/PrincipalMasterApi";

const PrincipalMasterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parentId } = location.state || {};
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [schoolAddress, setSchoolAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [pId, setPId] = useState("")
  const [allState, setAllState] = useState([])
  const [allCity, setAllCity] = useState([])
  const [allRole, setAllRole] = useState([])
  const [roleName, setRoleName] = useState("")
  const [active, setActive] = useState(true);

  const headerCellStyle = {
    backgroundColor: "#036672",
    color: "#fff",
  };

  useEffect(() => {
    getPrincipal();
  }, [parentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllState();
        await getAllRoleData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getAllRoleData = async () => {
    const data = await getAllRoleMasterData(active)
    console.log(data)
    const options = data.map((data) => ({
      value: data.r_id,
      label: `${data.r_rolename}`,
    }));
    setAllRole(options);
  };

  const handleRoleName = (selected) => {
    const selectedValue = selected;
    setRoleName(selectedValue);
  };

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
    console.log(stateId, "88")
    const data = await getAllCityApi(stateId, navigate);
    console.log(data)
    const options = data.map((data) => ({
      value: data.c_id,
      label: `${data.c_cityvalue}`,
    }));
    setAllCity(options);
  }

  const handleCity = (selected) => {
    const selectedValue = selected;
    setCity(selectedValue);
    console.log(selectedValue, "selected state value");
  }

  const AddPrincipalMaster = async () => {
    const data = await AddPrincipalApi(firstName, lastName, emailId, mobileNo, schoolName, schoolAddress, city, state, pincode, pId, roleName, navigate);
    console.log(data)
    navigate("/principalMaster")
  }

  const getPrincipal = async () => {
    const data = await getPrincipalApi(parentId, navigate);
    console.log(data)
    setFirstName(data.FisrtName)
    setLastName(data.LastName)
    setEmailId(data.EmailId)
    setMobileNo(data.MobileNo)
    setSchoolName(data.ChildName)
    setSchoolAddress(data.schoolAddress)
    setCity(data.City)
    setState(data.State)
    setPincode(data.PinCode)
    setPId(data.Id)
  }

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
                    <h4 className="card-title fw-bold">Add Principal</h4>
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
                        navigate("/principalMaster");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        // style={{ backgroundColor: "#1B5A90" }}
                        style={headerCellStyle}
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
                        School Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        className="form-control mt-3"
                        autoComplete="off"
                        placeholder="Enter School Name"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        School Address:
                      </label>
                      {" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="schoolAddress"
                        name="schoolAddress"
                        className="form-control mt-3"
                        autoComplete="off"
                        placeholder="Enter School Address"
                        value={schoolAddress}
                        onChange={(e) => setSchoolAddress(e.target.value)}
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
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Role Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <Select
                        className="mt-3"
                        value={roleName}
                        onChange={handleRoleName}
                        options={allRole}
                        placeholder="Select Role Name"

                      />
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <div className="card-footer">
                <button className="btn" style={headerCellStyle} onClick={AddPrincipalMaster}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PrincipalMasterForm;
