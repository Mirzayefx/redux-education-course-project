import React from "react";
import { Link } from "react-router-dom";

const SideBarList = ({barLink}) => {
  return (
    <div className="sidebar_list_container">
    <Link to="/dashboard">
    <div className="sidebar_list">
      <i className="fas fa-home"></i>
      <span>Dashboard</span>
    </div>
    </Link>
    <Link to="/courses">
    <div className="sidebar_list">
    <i className="fas fa-graduation-cap"></i>
      <span>Courses</span>
    </div>
    </Link>
    <Link to="/exams">
    <div className="sidebar_list">
    <i className="fas fa-file-signature"></i>
      <span>Exams</span>
    </div>
    </Link>
    <Link to="/homework">
    <div className="sidebar_list">
    <i className="fas fa-laptop-house"></i>
      <span>Home Work</span>
    </div>
    </Link>
    <Link to="/essays">
    <div className="sidebar_list">
    <i className="fas fa-pen"></i>
      <span>Essays</span>
    </div>
    </Link>
    <Link to="/certificate">
    <div className="sidebar_list">
    <i className="fas fa-certificate"></i>
      <span>Certificate</span>
    </div>
    </Link>
    </div>
  );
};

export default SideBarList;
