import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeleteCoursesId } from '../action/MainAction'
import { updateCourse, viewCourse } from '../reduxFolder/MainReducer'

const CoursesCard = ({data}) => {
  const dispatch = useDispatch()
  const loggedInUser=useSelector(state=>state.Data.loggedInUser);
  // console.log(loggedInUser);
  return (
    <div className='courses_card'>
        <p>{data.name}</p>
        {
          loggedInUser.is_staff===true ? 
          <button onClick={()=>dispatch(getDeleteCoursesId(data.id))} className='delete_course'>Delete</button>
        : null
        }

        {
          loggedInUser.is_staff===true?
          <button onClick={()=>dispatch(updateCourse(data))} className='update_course'>Update</button>
        : null
        }
        
        
        <button onClick={()=>dispatch(viewCourse(data))} className='view_course'>View</button>
    </div>
  )
}

export default CoursesCard