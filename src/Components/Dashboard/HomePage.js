import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [roleId, setRoleId] = useState("");
  
  useEffect(() => {
    const storedRoleId = localStorage.getItem("RoleId");
    if (storedRoleId) {
      setRoleId(storedRoleId);
    
    }
    console.log("roleId", roleId);
   
  }, [roleId]);

  return (
    <div className="content container-fluid">
      <div className="row">
      </div>
        <>
          <div className="content container-fluid">
            <div className="user-section">
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12 mt-5">
                    <h3 className="page-title text-dark">Dashboard</h3>
                    {/* <ul className="breadcrumb">
                      <li className="breadcrumb-item active">User</li>
                  </ul> */}
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                {/* Project Widget */}
                <Widget 
                 
                  value="21,882"
                  label="Total Candidate"
                />
                {/* Clients Widget */}
                <Widget
                  
                  value="15000"
                  label="Select for Ground"
                />
                {/* Tasks Widget */}
                <Widget 
                  
                  value="5,000"
                  label="Select for Written"
                />
                {/* Employees Widget */}
                <Widget value="500" label="Final Selected" />
            
              </div>
              <div className="row mt-5 justify-content-center">
                <div className="col-lg-4">
                <NavLink to="/documentVerification"><button className="btn btn-primary p-3">Verify Candidate Documents</button></NavLink>
                </div>
                <div className="col-lg-4">
                <NavLink to="/documentVerification"><button className="btn btn-primary p-3">Assign Chest Number</button></NavLink>
                </div>
                <div className="col-lg-4">
                <NavLink to="/documentVerification"><button className="btn btn-primary p-3">Create Admission Card</button></NavLink>
                </div>
            
              </div>
           
            </div>
          </div>
        </>
     
    </div>
  );
};

function Widget({ icon, value, label }) {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="card dash-widget">
        <div className="card-body rounded-4 shadow">
          <span className="dash-widget-icon">
            <i className={icon}></i>
          </span>
          <div className="dash-widget-info text-center">
            <h3 className="text-center fw-bold">{value}</h3>
            <span className="text-center">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePage;