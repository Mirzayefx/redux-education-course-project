import axios from "axios";
import React from "react";
import SideBarList from "./SideBarList";
import SideBarUser from "./SideBarUser";

const SideBarFixed = () => {
  
  return (
    <div className="sidebar_container">
      <SideBarUser  />
      <SideBarList/>
    </div>
  );
};

export default SideBarFixed;
