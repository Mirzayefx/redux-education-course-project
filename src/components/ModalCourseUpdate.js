import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBtnCourse,
  updateCourseInp,
  updateSelected,
} from "../reduxFolder/MainReducer";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import Swal from "sweetalert2";
// import { putCourseUpdate } from "../action/MainAction";



const ModalCourseUpdate = () => {
const [updateSelectedCourse,setUpdateSelectedCourse]=useState([])

  const dispatch = useDispatch();
  const updateCourseArr=useSelector(state=>state.Data.updateCourseArr)
  const updateCourseObj=useSelector(state=>state.Data.updateCourseObj)
  const updateCourseCreateInpValue = useSelector(
    (state) => state.Data.updateCourseCreateInpValue
  );
  const accountsArr = useSelector((state) => state.Data.accountsArr);
  // const updateSelectedCourse = useSelector(
  //   (state) => state.Data.updateSelectedCourse
  // );
  
    function updateSelected(e){
      setUpdateSelectedCourse(e)
    }
  function putCourseUpdate(updateCourseObj) {
    console.log(updateCourseObj);
    const data={
      name: updateCourseCreateInpValue,
      accounts: updateSelectedCourse
    }
    console.log(data);
    axios
      .put(
        `https://itticoursebaku.pythonanywhere.com/api/course-update/${updateCourseObj.id}/`,data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          Swal.fire({
            title: "Course has been changed successfully",
            icon: "success",
            type: "success",
          }).then((okay) => {
            if (okay) {
              window.location.href = "/courses";
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
    <div className="modal_container">
      <div className="modal_card">
        <input
          className="course_inp"
          placeholder="Change your course name..."
          type="text"
          onChange={(e) => dispatch(updateCourseInp(e.target.value))}
          value={updateCourseCreateInpValue}
        />
        <Multiselect
          placeholder="Change your participants..."
          isObject={false}
          onSelect={(e) => updateSelected(e)}
          options={accountsArr.map((data) => {
            return data.email;
          })}
          selectedValues={updateCourseArr.map((data)=>{
            return data.email;
          })}
          showCheckbox
          
        />
        <div className="course_modal_btns">
          <button onClick={()=>putCourseUpdate(updateCourseObj)}>Change</button>
          <button onClick={()=>dispatch(cancelBtnCourse())}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCourseUpdate;
