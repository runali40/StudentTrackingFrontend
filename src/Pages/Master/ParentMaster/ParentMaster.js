import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Add, Delete, Edit, } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../Components/Utils/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteParentApi, getAllParentApi } from "../../../Components/Api/ParentMasterApi";

const ParentMaster = () => {
  const navigate = useNavigate();
  const [allParent, setAllParent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(true);

  const headerCellStyle = {
    backgroundColor: "#036672",
    color: "#fff",
  };

  useEffect(() => {
    getAllParent();
  }, [currentPage, itemsPerPage, active]);


  const getAllParent = async () => {
    const data = await getAllParentApi(navigate);
    console.log(data)
    setAllParent(data)
  }

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const getParentData = (parentId) => {
    navigate('/parentMasterForm', { state: { parentId } });
  };

  const DeleteParentData = async (parentId) => {
    const data = await deleteParentApi(parentId, navigate);
    console.log(data)
    getAllParent();
  }

  const handleSearch = (e) => {
    const searchDataValue = e.target.value.toLowerCase();
    setSearchData(searchDataValue);

    if (searchDataValue.trim() === "") {
      getAllParent();
    } else {
      const filteredData = allParent.filter(
        (parent) =>
          parent.FisrtName.toLowerCase().includes(searchDataValue) ||
          parent.LastName.toLowerCase().includes(searchDataValue) ||
          parent.ChildName.toLowerCase().includes(searchDataValue)
      );
      setAllParent(filteredData);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allParent.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Parent Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-check form-switch mt-2 pt-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={active}
                        onChange={() => setActive(!active)}
                      />
                    </div>
                    <div className="btn btn-add" title="Add New">
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        // style={{ backgroundColor: "#1B5A90" }}
                        style={headerCellStyle}
                        onClick={() => navigate("/parentMasterForm")}
                      >
                        <Add />
                      </button>
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
                        First Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Last Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Email Id
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Mobile No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Student Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Address
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        City
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        State
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Pincode
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      <th scope="col" style={{ ...headerCellStyle, paddingLeft: "18px" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((data, index) => (
                      <tr key={data.Id}>
                        <td>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td>{data.FisrtName}</td>
                        <td>{data.LastName}</td>
                        <td>{data.EmailId}</td>
                        <td>{data.MobileNo}</td>
                        <td>{data.ChildName}</td>
                        <td>{data.Address}</td>
                        <td>{data.City}</td>
                        <td>{data.State}</td>
                        <td>{data.PinCode}</td>
                        <td>{data.Isactive === "1" ? "Active" : "Inactive"}</td>
                        <td>
                          <div className="d-flex "><Edit
                            className="text-success mr-2"
                            type="button"
                            // onClick={() => GetDutyMaster(data.d_id)}
                            // style={{

                            //   ...(data.d_isactive === "Inactive" && {
                            //     opacity: 0.5, 
                            //     cursor: "not-allowed",
                            //   }),
                            // }}
                            onClick={() => getParentData(data.Id)}
                          // onClick={data.d_isactive === "Inactive" ? null : () => GetDutyMaster(data.d_id)}

                          />
                            <Delete
                              className="text-danger"
                              type="button"
                              // style={{ marginLeft: "0.5rem" }}
                              // onClick={() => handleDelete(data.d_id)}
                              // style={{
                              //   marginLeft: "0.5rem",
                              //   ...(data.d_isactive === "Inactive" && {
                              //     opacity: 0.5,  
                              //     cursor: "not-allowed", 
                              //   }),
                              // }}
                              onClick={() => DeleteParentData(data.Id)}
                            // onClick={data.d_isactive === "Inactive" ? null : () => handleDelete(data.d_id)}
                            /> </div>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-md-4 col-12 ">
                    <h6 className="text-lg-start text-md-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allParent.length)} of{" "}
                      {allParent.length} entries
                    </h6>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12"></div>
                  <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      allData={allParent}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ParentMaster;
