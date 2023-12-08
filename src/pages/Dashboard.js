import React, { useEffect, useState } from 'react'
import SideBarFixed from '../components/SideBarFixed'
import Topic from '../components/Topic'
import { getUser } from '../action/MainAction'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  
    if(!localStorage.getItem('ACCESS_TOKEN')){
        window.location.href = '/login'
    }
  return (
    <>
    <SideBarFixed  />
    <div className='pages_container'>
      <div className="container">
      <Topic topic={"Dashboard"}/>
      <div className="dashboard_container">
        
        <div className="dashboard_card">
        <Link to="/dashboard">
          <i className='fas fa-home'></i>
         <h2>Dashboard</h2></Link>
        </div>
        <div className="dashboard_card">
        <Link to="/courses">
          <i className='fas fa-graduation-cap'></i>
         <h2>Courses</h2>
         </Link>
        </div>
        <div className="dashboard_card">
        <Link to="/dashboard">
          <i className='fas fa-file-signature'></i>
         <h2>Exams</h2></Link>
        </div>
        <div className="dashboard_card">
        <Link to="/homework">
          <i className='fas fa-laptop-house'></i>
         <h2>Home Work</h2></Link>
        </div>
        <div className="dashboard_card">
        <Link to="/dashboard">
          <i className="fas fa-pen"></i>
         <h2>Essays</h2></Link>
        </div>
        <div className="dashboard_card">
        <Link to="/dashboard">
          <i className="fas fa-certificate"></i>
       <h2>Certificate</h2></Link>
        </div>
      </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard