import React, { useEffect } from 'react'
import CoursesCard from './CoursesCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCourses, getStudentCourses } from '../action/MainAction'

const CoursesContainer = () => {
    const loggedInUser=useSelector(state=>state.Data.loggedInUser)
    const coursesAdminArr = useSelector(state=>state.Data.coursesAdminArr)
    const coursesStudentArr = useSelector(state=>state.Data.coursesStudentArr)
    console.log(coursesAdminArr);
    console.log(coursesStudentArr);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAdminCourses())
        dispatch(getStudentCourses())
    },[dispatch])
  return (
    <div className='courses_container'>
        {
            loggedInUser.is_staff === true ? 
            coursesAdminArr.map((data,i)=>{
                return <CoursesCard key={i} data={data}/>
            }) :
            coursesStudentArr.map((data,i)=>{
                return <CoursesCard key={i} data={data} />
            }) || <h2 style={{position: "absolute",color: "red"}}>NO COURSES HERE, CONTACT WITH ADMIN</h2>
        }
    </div>
  )
}

export default CoursesContainer