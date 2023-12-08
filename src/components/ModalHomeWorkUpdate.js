import React, { useEffect } from 'react'
import { cancelBtnHomeWorkUpdate, updateHomeWorkInp, updateHomeWorkSelect } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAdminCourses, getStudentCourses } from '../action/MainAction'
import Swal from 'sweetalert2'

const ModalHomeWorkUpdate = () => {
    const dispatch = useDispatch()
    const updateHomeWorkValue = useSelector(state=>state.Data.updateHomeWorkValue)
    const modalHomeWorkCardsObj = useSelector(state=>state.Data.modalHomeWorkCardsObj)
    // const modalViewSelectedUnit = useSelector(state=>state.Data.modalViewSelectedUnit)
    const coursesAdminArr = useSelector(state=>state.Data.coursesAdminArr)
    const coursesStudentArr = useSelector(
      (state) => state.Data.coursesStudentArr
    );
  const updateHomeWorkChangeValue=useSelector((state) => state.Data.updateHomeWorkChangeValue)
  const updateHomeWorkSelectedValue=useSelector((state) => state.Data.updateHomeWorkSelectedValue)


    console.log(coursesAdminArr);
    useEffect(()=>{
        dispatch(getAdminCourses())
        dispatch(getStudentCourses())
    },[dispatch])
    const putHomeWorkUpdate=(modalHomeWorkCardsObj)=>{
      console.log(updateHomeWorkSelectedValue);

      
        const data = {
            name: updateHomeWorkValue,
            course: updateHomeWorkChangeValue=== '' ? updateHomeWorkSelectedValue : updateHomeWorkChangeValue
            //
        }
        console.log(data);

        axios.put(`https://itticoursebaku.pythonanywhere.com/api/homework-update-delete/${modalHomeWorkCardsObj.id}/`,data,{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            }
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            Swal.fire({
              title: "Homework has been changed successfully",
              icon: "success",
              type: "success",
            }).then((okay) => {
              if (okay) {
                window.location.href = "/homework";
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "Unfortunately, something went wrong, please try again",
            icon: "error",
            confirmButtonText: "Continue",
          });
        });
    }

  return (
    <div onClick={()=>dispatch(cancelBtnHomeWorkUpdate())}  className='modal_container'>
        <div  onClick={e => e.stopPropagation()}  className='modal_card'>
        <select defaultValue={updateHomeWorkSelectedValue} onChange={(e)=>dispatch(updateHomeWorkSelect(e.target.value))}>
          {coursesStudentArr.map((data,i) => {
            return <option defaultValue={updateHomeWorkChangeValue} key={i} value={data.name}>{data.name}</option>
          })}

        </select>
        <input
          className="course_inp"
          placeholder="Change homework name.."
          type="text"
          onChange={(e) => dispatch(updateHomeWorkInp(e.target.value))}
          value={updateHomeWorkValue}
        />

        <div className="course_modal_btns">
          <button onClick={()=>putHomeWorkUpdate(modalHomeWorkCardsObj)}>Change</button>
          <button onClick={()=>dispatch(cancelBtnHomeWorkUpdate())}>Cancel</button>
        </div>

        </div>
    </div>
  )
}

export default ModalHomeWorkUpdate