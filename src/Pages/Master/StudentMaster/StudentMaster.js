import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, Delete, Edit, Height } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { addParameter, deleteParameter, getallStudentMasterData, getParameterMasterData } from "../../../Components/Api/ParameterMasterApi";
import { Cursor } from "react-bootstrap-icons";
import { Pagination } from "../../../Components/Utils/Pagination";
import {
    toast
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddStudentApi, getAllStudentApi, getStudentApi, deleteStudentApi } from "../../../Components/Api/StudentApi";

const StudentMaster = () => {
    const navigate = useNavigate();
    const [allStudent, setAllStudent] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);

    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [section, setSection] = useState("");
    const [parentName, setParentName] = useState("");
    const [watchId, setWatchId] = useState("");
    const [location, setLocation] = useState("");
    const [active, setActive] = useState(true);
    const [toggleActive, setToggleActive] = useState(true);
    const [sId, setSId] = useState("")

    const headerCellStyle = {
        backgroundColor: "#036672",
        color: "#fff",
    };
    const handleShow = () => {
        setShowModal(true);
        resetForm()
    };

    const handleClose = () => setShowModal(false);

    useEffect(() => {
        getAllStudent();
    }, [currentPage, itemsPerPage, toggleActive, active]);


    const getAllStudent = async () => {
        const data = await getAllStudentApi(navigate);
        console.log(data)
        setAllStudent(data)
    }

    const getStudent = async (studentId) => {
        const data = await getStudentApi(studentId, navigate);
        console.log(data)
        handleShow();
        setStudentName(data.StudentName)
        setParentName(data.ParentName)
        setStudentClass(data.Class)
        setWatchId(data.WatchId)
        setSId(data.Id)
    }

    const AddStudentMaster = async () => {
        const data = await AddStudentApi(studentName, studentClass, section, parentName, watchId, sId, navigate);
        console.log(data)
        handleClose();
        getAllStudent();
    }

    const DeleteStudent = async (studentId) => {
        const data = await deleteStudentApi(studentId, navigate);
        console.log(data)
        getAllStudent();
    }

    const handleChange = (e) => {
        setSelectedItemsPerPage(parseInt(e.target.value));
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const resetForm = () => {
        setStudentName("");
        setParentName("");
        setStudentClass("");
        setSection("");
        setWatchId("");
        setSId("");
    };

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            // If search input is empty, fetch all data
            getAllStudent();
        } else {
            // Filter data based on search input value
            const filteredData = allStudent.filter(
                (student) =>
                    student?.StudentName?.toLowerCase().includes(searchDataValue) ||
                    student?.WatchId?.toLowerCase().includes(searchDataValue)
            );
            setAllStudent(filteredData);
            setCurrentPage(1);
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allStudent.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="container-fluid">
                <div
                    className="card m-3"
                    style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                >
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h4 className="card-title fw-bold">Student Master</h4>
                                    </div>
                                    <div className="col-auto d-flex flex-wrap">
                                        <div className="form-check form-switch mt-2 pt-1">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckDefault"
                                                checked={toggleActive}
                                                onChange={() => setToggleActive(!toggleActive)}
                                            />
                                        </div>
                                        <div className="btn btn-add" title="Add New">
                                            <Button
                                                // onClick={handleShow}
                                                onClick={() => {

                                                    setSId("");
                                                    handleShow();

                                                }}
                                                style={{ backgroundColor: "#1B5A90" }}
                                            >
                                                <Add />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-3">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start justify-content-md-start">
                                        <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                        <select
                                            style={{ height: "35px" }}
                                            className="form-select w-auto"
                                            aria-label="Default select example"
                                            value={selectedItemsPerPage}
                                            onChange={handleChange}
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
                                        <input
                                            className="form-control"
                                            placeholder="Search here"
                                            value={searchData}
                                            onChange={handleSearch}
                                        />
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
                                                Student Name
                                            </th>
                                            <th scope="col" style={headerCellStyle}>
                                                Class
                                            </th>
                                            <th scope="col" style={headerCellStyle}>
                                                Section
                                            </th>
                                            <th scope="col" style={headerCellStyle}>
                                                Watch Id
                                            </th>
                                            <th scope="col" style={headerCellStyle}>
                                                Parent Info
                                            </th>
                                            <th scope="col" className="text-center" style={headerCellStyle}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
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
                                        }
                                    </tbody>
                                </Table>
                                <div className="row mt-4 mt-xl-3">
                                    <div className="col-lg-4 col-md-4 col-12 ">
                                        <h6 className="text-lg-start text-center">
                                            Showing {indexOfFirstItem + 1} to{" "}
                                            {Math.min(indexOfLastItem, allStudent.length)} of{" "}
                                            {allStudent.length} entries
                                        </h6>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12"></div>
                                    <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                        <Pagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            allData={allStudent}
                                            itemsPerPage={itemsPerPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="fw-bold">Add Student</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterCode">
                                    <Form.Label className="fw-bold">Student Name:</Form.Label>{" "}
                                    <span className="text-danger fw-bold">*</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Student Name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                    // Restrict input length to 10 characters
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     if (/^\d*$/.test(value)) {
                                    //         setParameterCode(value);
                                    //     }
                                    // }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterName">
                                    <Form.Label className="fw-bold">Student Class:</Form.Label>{" "}
                                    <span className="text-danger fw-bold">*</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Student Class"
                                        value={studentClass}
                                        onChange={(e) => setStudentClass(e.target.value)}
                                    // Restrict input to 50 characters
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     // Allow only alphabetic characters (letters and spaces)
                                    //     if (/^[a-zA-Z\s]*$/.test(value)) {
                                    //         setStudentClass(value);
                                    //     }
                                    // }
                                    // }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                    <Form>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterCode">
                                    <Form.Label className="fw-bold">Section:</Form.Label>{" "}
                                    <span className="text-danger fw-bold">*</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Section"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                    // Restrict input length to 10 characters
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     if (/^\d*$/.test(value)) {
                                    //         setParameterCode(value);
                                    //     }
                                    // }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterName">
                                    <Form.Label className="fw-bold">Watch Id:</Form.Label>{" "}
                                    <span className="text-danger fw-bold">*</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Watch Id"
                                        value={watchId}
                                        onChange={(e) => setWatchId(e.target.value)}
                                        maxLength={50} // Restrict input to 50 characters
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     // Allow only alphabetic characters (letters and spaces)
                                    //     if (/^[a-zA-Z\s]*$/.test(value)) {
                                    //         setParameterName(value);
                                    //     }
                                    // }
                                    // }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                    <Form>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterCode">
                                    <Form.Label className="fw-bold">Parent Name:</Form.Label>{" "}
                                    <span className="text-danger fw-bold">*</span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Parent Name"
                                        value={parentName}
                                        onChange={(e) => setParentName(e.target.value)}
                                    // Restrict input length to 10 characters
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     if (/^\d*$/.test(value)) {
                                    //         setParameterCode(value);
                                    //     }
                                    // }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={() => {
                            AddStudentMaster();
                        }}
                    >
                        Save
                    </Button>
                    <Button variant="secondary" onClick={resetForm} >
                        Clear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default StudentMaster;