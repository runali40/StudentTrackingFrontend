import React, { useState, useEffect } from "react";
import {
  Speedometer2,
  ListUl,
  ThreeDotsVertical,
  GearFill,
  PersonFill,
  BellFill,
  ClipboardCheck,
  CheckCircleFill,
  QuestionCircleFill,
  BoxArrowRight,
} from "react-bootstrap-icons";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";
import "../../Css/Sidebar.css"
import TheContent from "../Layouts/Content";
// import HomePage from "./HomePage";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(true);
  const [content] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarCollapse = () => {
    setSidebar(!sidebar);
  };

  const MoreButton = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="wrapper">
        <div className="body-overlay"></div>
        {sidebar && (
          <nav className="sidebar" id="sidebar">
            <div className="sidebar-header">
              <h3 className="text-light">POLICE RECRUITMENT</h3>
            </div>
            <ul className="list-unstyled components">
              <li className="active">
                <div className="quickAccess">
                  <NavLink to="/" className="quickAccess">
                    <Speedometer2 style={{ fontSize: "22px" }} />
                    <span className="ms-3">Quick Access</span>
                  </NavLink>
                </div>
              </li>
              <br />
              <li className="dropdown">
                <NavLink
                  to="/dashboard"
                  data-bs-target="#homeSubmenu1"
                  role="button"
                  aria-controls="homeSubmenu1"
                >
                  <HomeIcon style={{ fontSize: "22px" }} />
                  <span className="ms-3">Dashboard</span>
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/candidate"
                  role="button"
                  aria-controls="#pageSubmenu2"
                >
                  <PersonIcon style={{ fontSize: "22px" }} />
                  <span className="ms-3">Candidate</span>
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  data-bs-target="#events"
                  role="button"
                  aria-controls="#events"
                >
                  <ClipboardCheck style={{ fontSize: "22px" }} />
                  <span className="ms-3">Events</span>
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/"
                  role="button"
                  aria-controls="#analytics"
                >
                  <CheckCircleFill style={{ fontSize: "22px" }} />
                  <span className="ms-3">Analytics</span>
                </NavLink>
              </li>
              <br />

              <div className="sidebar-bottom mt-5 pt-5">
                <li className="dropdown">
                  <NavLink
                    to="/"
                    role="button"
                    aria-controls="#notifications"
                  >
                    <BellFill style={{ fontSize: "22px" }} />
                    <span className="ms-3">Notifications</span>
                  </NavLink>
                </li>
                <li className="dropdown">
                  <NavLink
                    to="/"
                    role="button"
                    aria-controls="#settings"
                  >
                    <GearFill style={{ fontSize: "22px" }} />
                    <span className="ms-3">Settings</span>
                  </NavLink>
                </li>
                <li className="dropdown">
                  <NavLink to="/" role="button" aria-controls="#faq">
                    <QuestionCircleFill style={{ fontSize: "22px" }} />
                    <span className="ms-3">FAQ</span>
                  </NavLink>
                </li>
                <li className="dropdown">
                  <NavLink to="/" role="button" aria-controls="#faq">
                    <BoxArrowRight style={{ fontSize: "22px" }} />
                    <span className="ms-3">Log out</span>
                  </NavLink>
                </li>
              </div>
            </ul>
          </nav>
        )}

        <div id="content" style={{ width: sidebar ? content : "100%" }}>
          {content && (
            <div className="top-navbar">
              <nav
                className="navbar navbar-expand-lg sticky-top"
                style={{ backgroundColor: "rgb(10, 4, 60" }}
              >
                <button
                  type="button"
                  id="sidebar-collapse"
                  className="d-xl-block d-lg-block d-md-none d-none mx-2"
                >
                  <ListUl
                    style={{
                      fontSize: "24px",
                      marginBottom: "5px",
                      transform: "rotate(180deg)",
                      color: "white",
                    }}
                    onClick={sidebarCollapse}
                  />
                </button>
                <NavLink className="navbar-brand text-white" to="/">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                </NavLink>
                <button
                  id="exnavbar"
                  className="collapse d-inline-block d-lg-none d-sm-block d-block ms-auto more-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebar"
                  aria-controls="sidebar"
                  aria-expanded="true"
                >
                  <ThreeDotsVertical
                    style={{ fontSize: "22px", color: "white" }}
                    onClick={MoreButton}
                  />
                </button>

                <div
                  className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav ms-auto">
                    <li className="nav-item dropdown active">
                      <NavLink
                        className="nav-link"
                        to="/"
                        data-toggle="dropdown"
                      >
                        <BellFill
                          style={{ fontSize: "20px", color: "white" }}
                        />
                        <span className="notification text-white">4</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <div className="nav-link" onClick={toggleMenu}>
                        <PersonFill
                          style={{ fontSize: "24px", color: "white" }}
                        />
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        <GearFill
                          style={{ fontSize: "24px", color: "white" }}
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
          <TheContent/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;