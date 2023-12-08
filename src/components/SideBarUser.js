import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../action/MainAction";
// import axios from "axios";

const SideBarUser = () => {
  const loggedInUser = useSelector(state=>state.Data.loggedInUser)
  const deleteToken = () =>{
    localStorage.removeItem("ACCESS_TOKEN")
    window.location.href = '/login'
}

const dispatch=useDispatch()

    let loggedEmail = localStorage.getItem("loginEmail");

    useEffect(()=>{
      dispatch(getUser(loggedEmail))
      // localStorage.setItem("loggedInUser", JSON.stringify(resp.data))
    },[])

  return (
    <div className="sidebar_user">
        <Logo/>
      <span>{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</span>
      <button className="logout_btn" onClick={deleteToken}>Log out</button>
    </div>
  );
};

export default SideBarUser;
