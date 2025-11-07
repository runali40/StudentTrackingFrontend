import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllStudentApi } from "../../Components/Api/StudentApi";
import { Add, Delete, Edit } from "@material-ui/icons";
import { addGpsConfiguration, UserLogin } from "../../Components/Api/GpsApi";
// import { AddParentApi, getParentApi } from "../../../Components/Api/ParentMasterApi";
// import { getAllStudentApi } from "../../../Components/Api/StudentApi";
// import { getAllStateApi } from "../../../Components/Api/StateMasterApi";
// import { getAllCityApi } from "../../../Components/Api/CityMasterApi";
// import { getAllRoleMasterData } from "../../../Components/Api/RoleMasterApi";

const GpsPage = () => {
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
    const [allRole, setAllRole] = useState([])
    const [roleName, setRoleName] = useState("")
    const [active, setActive] = useState(true);
    const [geofenceName, setGeofenceName] = useState("")
    const [type, setType] = useState("")
    const [shape, setShape] = useState("")
    const [color, setColor] = useState("")
    const [alertRule, setAlertRule] = useState("")
    const [deviceId, setDeviceId] = useState("")
    const [longitude, setLongitude] = useState("")
    const [imei, setImei] = useState("")
    const [simNo, setSimNo] = useState("")

    const headerCellStyle = {
        backgroundColor: "#036672",
        color: "#fff",
    };

    //   useEffect(() => {
    //     getParent();
    //   }, [parentId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllStudent();
                // await getAllState();
                // await getAllRoleData();
                // await getAllCity();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    //   const getAllRoleData = async () => {
    //     const data = await getAllRoleMasterData(active)
    //     console.log(data)
    //     const options = data.map((data) => ({
    //       value: data.r_id,
    //       label: `${data.r_rolename}`,
    //     }));
    //     setAllRole(options);
    //   };

    //     const handleRoleName = (selected) => {
    //     const selectedValue = selected;
    //     setRoleName(selectedValue);
    //   };

    const getAllStudent = async () => {
        const data = await getAllStudentApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.StudentName}`,
        }));
        setAllStudent(options);
    }

    const handleStudent = (selected) => {
        const selectedValue = selected;
        setStudentName(selectedValue);
        console.log(selectedValue, "selected value");
    }

    //   const getAllState = async () => {
    //     const data = await getAllStateApi(navigate);
    //     console.log(data)
    //     const options = data.map((data) => ({
    //       value: data.s_id,
    //       label: `${data.s_Statename}`,
    //     }));
    //     setAllState(options);
    //   }

    //   const handleState = (selected) => {
    //     const selectedValue = selected;
    //     setState(selectedValue);
    //     console.log(selectedValue, "selected state value");
    //     getAllCity(selectedValue);
    //   }

    //   const getAllCity = async (selectedValue) => {
    //     const stateId = selectedValue.value;
    //     console.log(stateId, "88")
    //     const data = await getAllCityApi(stateId, navigate);
    //     console.log(data)
    //     const options = data.map((data) => ({
    //       value: data.c_id,
    //       label: `${data.c_cityvalue}`,
    //     }));
    //     setAllCity(options);
    //   }

    //   const handleCity = (selected) => {
    //     const selectedValue = selected;
    //     setCity(selectedValue);
    //     console.log(selectedValue, "selected state value");
    //   }
const AddGpsData = async () => {
  try {
    // const data = await addGpsConfiguration(imei, simNo, navigate); // ✅ await should come before the function call
    const data = await UserLogin()
    console.log(data);
    // navigate("/parentMaster"); // ✅ uncomment if you want to redirect after success
  } catch (error) {
    console.error("Error adding GPS data:", error);
  }
};

    //   const getParent = async () => {
    //     const data = await getParentApi(parentId, navigate);
    //     console.log(data)
    //     setFirstName(data.FisrtName)
    //     setLastName(data.LastName)
    //     setEmailId(data.EmailId)
    //     setMobileNo(data.MobileNo)
    //     setStudentName(data.ChildName)
    //     setAddress(data.Address)
    //     setCity(data.City)
    //     setState(data.State)
    //     setPincode(data.PinCode)
    //     setPId(data.Id)
    //   }

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
                                        <h4 className="card-title fw-bold">Create New</h4>
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
                                {/* <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Device Id:
                                            </label>{" "}
                                            <span className="text-danger fw-bold">*</span>
                                            <input
                                                type="text"
                                                id="geofenceName"
                                                className="form-control mt-3"
                                                placeholder="Enter Device Id"
                                                value={deviceId}
                                                onChange={(e) => setDeviceId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Longitude:
                                            </label>{" "}
                                            
                                            <input
                                                type="text"
                                                className="form-control mt-3"
                                                id="longitude"
                                                rows="2"
                                                placeholder="Enter Longitude"
                                                value={longitude}
                                                onChange={(e) => setLongitude(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                IMEI:
                                            </label>{" "}
                                            <span className="text-danger fw-bold">*</span>
                                            <input
                                                type="text"
                                                id="imei"
                                                name="imei"
                                                className="form-control mt-3"
                                                autoComplete="off"
                                                placeholder="Enter IMEI"
                                                value={imei}
                                                onChange={(e) => setImei(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Sim Number:
                                            </label>
                                            {" "}
                                            <span className="text-danger fw-bold">*</span>
                                            <input
                                                type="text"
                                                id="simNo"
                                                name="simNo"
                                                className="form-control mt-3"
                                                autoComplete="off"
                                                placeholder="Enter Sim No"
                                                value={simNo}
                                                onChange={(e) => setSimNo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="card-footer">
                                <button className="btn" style={headerCellStyle} onClick={AddGpsData}/* onClick={AddParentMaster} */>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="card m-3"
                    style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                >
                    <div className="card-body pt-3">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start justify-content-md-start">
                                <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                <select
                                    style={{ height: "35px" }}
                                    className="form-select w-auto"
                                    aria-label="Default select example"
                                // value={selectedItemsPerPage}
                                // onChange={handleChange}
                                >
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                &nbsp;&nbsp;
                                <h6 className="mt-2">entries</h6>
                            </div>
                            <div className="col-lg-6 col-md-6 d-flex justify-content-center justify-content-lg-end"></div>
                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-end mt-lg-0 mt-md-0 mt-3">
                                {/* <input
                                className="form-control"
                                placeholder="Search here"
                                value={searchData}
                                onChange={handleSearch}
                            /> */}
                            </div>
                        </div>
                        <br />
                        <Table striped hover responsive className="border text-left">
                            <thead>
                                <tr>
                                    <th scope="col" style={headerCellStyle}>
                                        Sr.No
                                    </th>
                                    <th scope="col" style={headerCellStyle}>
                                        Device Id
                                    </th>
                                    <th scope="col" style={headerCellStyle}>
                                        Longitude
                                    </th>
                                    <th scope="col" style={headerCellStyle}>
                                        IMEI
                                    </th>
                                    <th scope="col" style={headerCellStyle}>
                                        Sim Number
                                    </th>
                                    <th scope="col" style={headerCellStyle}>
                                        Status
                                    </th>
                                    <th scope="col" className="text-center" style={headerCellStyle}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>343</td>
                                    <td>2.434</td>
                                    <td>4335</td>
                                    <td>433589</td>
                                    <td>Active</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-">
                                            <Edit
                                                className="text-success mr-2"
                                                type="button"
                                            // onClick={() => getParameter(data.p_id)}
                                            //  style={{

                                            //    ...(data.p_isactive === "Inactive" && {
                                            //      opacity: 0.5, 
                                            //      cursor: "not-allowed", 
                                            //    }),
                                            //  }}
                                            //  onClick={data.p_isactive === "Inactive" ? null : () => getParameter(data.p_id)}
                                            // onClick={() => getStudent(data.Id)}
                                            />

                                            <Delete
                                                className="text-danger"
                                                type="button"
                                            // onClick={() => DeleteStudent(data.Id)}
                                            // style={{
                                            //     marginLeft: "0.5rem",
                                            //     opacity: 0.5,  // Makes the icon appear faded
                                            //     cursor: 'not-allowed'  // Changes cursor to indicate disabled state
                                            // }}
                                            // disabled={true}  // Disables the icon
                                            />
                                        </div>
                                    </td>
                                </tr>

                                {/* {
                                currentItems.map((data, index) => {
                                    return (
                                        <tr key={data.Id}>
                                            <td> {(currentPage - 1) * itemsPerPage + index + 1}</td>

                                            <td>
                                                {data.StudentName}
                                            </td>
                                            <td>{data.Class}</td>
                                            <td>{ }</td>
                                            <td>{data.WatchId}</td>
                                            <td>{data.ParentName}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-">
                                                    <Edit
                                                        className="text-success mr-2"
                                                        type="button"
                                                        // onClick={() => getParameter(data.p_id)}
                                                        //  style={{

                                                        //    ...(data.p_isactive === "Inactive" && {
                                                        //      opacity: 0.5, 
                                                        //      cursor: "not-allowed", 
                                                        //    }),
                                                        //  }}
                                                        //  onClick={data.p_isactive === "Inactive" ? null : () => getParameter(data.p_id)}
                                                        onClick={() => getStudent(data.Id)}
                                                    />

                                                    <Delete
                                                        className="text-danger"
                                                        type="button"
                                                        onClick={() => DeleteStudent(data.Id)}
                                                    // style={{
                                                    //     marginLeft: "0.5rem",
                                                    //     opacity: 0.5,  // Makes the icon appear faded
                                                    //     cursor: 'not-allowed'  // Changes cursor to indicate disabled state
                                                    // }}
                                                    // disabled={true}  // Disables the icon
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            } */}
                            </tbody>
                        </Table>
                        <div className="row mt-4 mt-xl-3">
                            <div className="col-lg-4 col-md-4 col-12 ">
                                {/* <h6 className="text-lg-start text-center">
                                Showing {indexOfFirstItem + 1} to{" "}
                                {Math.min(indexOfLastItem, allStudent.length)} of{" "}
                                {allStudent.length} entries
                            </h6> */}
                            </div>
                            <div className="col-lg-4 col-md-4 col-12"></div>
                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                {/* <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                allData={allStudent}
                                itemsPerPage={itemsPerPage}
                            /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GpsPage;
