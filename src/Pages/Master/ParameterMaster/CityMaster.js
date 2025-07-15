import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, Delete, Edit, ArrowBack } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "../../../Components/Utils/Pagination";
import {
  toast
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddCityApi, DeleteCityApi, getAllCityApi, GetCityApi } from "../../../Components/Api/CityMasterApi";

const CityMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sId, stateName } = location.state || {};
  const [allCity, setAllCity] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [cityCode, setCityCode] = useState("")
  const [cityName, setCityName] = useState("")
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [cId, setCId] = useState("")

  const headerCellStyle = {
    backgroundColor: "#036672",
    color: "#fff",
  };

  useEffect(() => {
    getAllCity();
  }, [currentPage, itemsPerPage, toggleActive]);

  const getAllCity = async () => {
    const data = await getAllCityApi(sId, navigate);
    console.log(data)
    setAllCity(data)
  }

  const AddCityMaster = async () => {
    const data = await AddCityApi(cityCode, cityName, sId, stateName, cId, navigate);
    console.log(data)
    handleClose();
    getAllCity();
    resetForm()
  }

  const getCity = async (cityId) => {
    const data = await GetCityApi(cityId, navigate);
    console.log(data)
    handleShow();
    setCityName(data.c_cityvalue)
    setCityCode(data.c_code)
    setCId(data.c_id)
  }

  const DeleteCity = async (cityId) => {
    const data = await DeleteCityApi(cityId, navigate);
    console.log(data)
    getAllCity();
  }

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleClose = () => { setShowModal(false); resetForm() };
  const handleShow = () => setShowModal(true);

  const handleSearch = (e) => {
    const searchDataValue = e.target.value.toLowerCase();
    setSearchData(searchDataValue);

    if (searchDataValue.trim() === "") {
      // If search input is empty, fetch all data
      getAllCity();
    } else {
      // Filter data based on search input value
      const filteredData = allCity.filter(
        (city) =>
          city.c_code.toLowerCase().includes(searchDataValue) ||
          city.c_cityvalue.toLowerCase().includes(searchDataValue) ||
          city.c_statename.toLowerCase().includes(searchDataValue)

      );
      setAllCity(filteredData);
      setCurrentPage(1);
    }
  };

  const resetForm = () => {
    setCityCode("");
    setCityName("");
    setCId("")
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCity.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
                    <h4 className="card-title fw-bold">
                      City Master
                    </h4>
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
                          resetForm();
                          handleShow();
                        }}
                        // style={{ backgroundColor: "#1B5A90" }}
                        style={headerCellStyle}
                      >
                        <Add />
                      </Button>
                      <Button
                        // onClick={handleShow}
                        className="mx-2"
                        onClick={() => {
                          navigate(-1);
                        }}
                        // style={{ backgroundColor: "#1B5A90" }}
                        style={headerCellStyle}
                      >
                        <ArrowBack />
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
                  <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-end">
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
                        City Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        City Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        State Name
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
                    {allCity &&
                      currentItems
                        .sort((a, b) => a.c_code.localeCompare(b.c_code))  // Sorting by pv_parametervalue
                        .map((data, index) => {
                          return (
                            <tr key={data.c_id}>
                              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>{data.c_code}</td>
                              <td>{data.c_cityvalue}</td>
                              <td>{data.c_statename}</td>
                              <td>{data.c_isactive}</td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                  <Edit
                                    className="text-success mr-2"
                                    type="button"
                                    onClick={() => {
                                      getCity(data.c_id);

                                    }}
                                  // style={{

                                  //   ...(data.pv_isactive === "Inactive" && {
                                  //     opacity: 0.5,  // Makes the icon appear faded
                                  //     cursor: "not-allowed", // Changes cursor to indicate disabled state
                                  //   }),
                                  // }}
                                  // onClick={data.pv_isactive === "Inactive" ? null : () => GetParameterValue(data.pv_id)}
                                  />
                                  {/* <Delete
                                    className="text-danger"
                                    type="button"
                                    style={{ marginLeft: "0.5rem" }}
                                    onClick={() => DeleteParameterValue(data.pv_id)}
                                  /> */}
                                  <Delete
                                    className="text-danger"
                                    type="button"
                                    onClick={() => DeleteCity(data.c_id)}
                                  // style={{
                                  //   marginLeft: "0.5rem",
                                  //   opacity: 0.5,  // Makes the icon appear faded
                                  //   cursor: 'not-allowed'  // Changes cursor to indicate disabled state
                                  // }}
                                  // disabled={true}  // Disables the icon
                                  />
                                </div>

                              </td>
                            </tr>
                          );
                        })
                    }

                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-md-4 col-12">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allCity.length)} of{" "}
                      {allCity.length} entries
                    </h6>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12"></div>
                  <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      allData={allCity}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="md" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="fw-bold">Add City Master</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="code">
                  <Form.Label className="fw-bold"> State Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter State Name"
                    value={stateName}
                    // onChange={(e) => setParameterName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="code">
                  <Form.Label className="fw-bold">City Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Code"
                    value={cityCode}
                    // onChange={(e) => setCode(e.target.value)}
                    maxLength={4} // Restrict input length to 10 characters
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setCityCode(value);
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-bold">City Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Name"
                    value={cityName}
                    // onChange={(e) => setParameterValueName(e.target.value)}
                    maxLength={50} // Restrict input to 50 characters
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only alphabetic characters (letters and spaces)
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        setCityName(value);
                      }
                    }
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="isActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // style={{ backgroundColor: "#1B5A90" }}
            style={headerCellStyle}
            onClick={() => {
              AddCityMaster();
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CityMaster;
