import React, { useEffect, useState } from "react";
import {
  cancelBtnHomeWorkCreate,
  createHomeWorkInp,
  createHomeWorkSelect,

} from "../reduxFolder/MainReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getStudentCourses, getStudentGroups } from "../action/MainAction";
import Swal from "sweetalert2";

const ModalHomeWorkCreate = () => {
  const dispatch = useDispatch();
  const createHomeWorkValue = useSelector(
    (state) => state.Data.createHomeWorkValue
  );
  const coursesStudentArr = useSelector(
    (state) => state.Data.coursesStudentArr
  );
  const groupsStudentArr = useSelector(
    (state) => state.Data.groupsStudentArr
  );
  // console.log(coursesStudentArr[0].name);
  const createHomeWorkOptionValue=useSelector((state) => state.Data.createHomeWorkOptionValue)
  const createHWSelectedValue=useSelector((state) => state.Data.createHWSelectedValue)

  useEffect(() => {
    dispatch(getStudentCourses());
    dispatch(getStudentGroups())
  }, [dispatch]);


  const postHomeWorkCreate = () => {
    const data = {
      group: createHWSelectedValue!==''? createHWSelectedValue: coursesStudentArr[0].name,
      name: createHomeWorkValue,
    };

    console.log(data);
    axios
      .post(
        "https://itticoursebaku.pythonanywhere.com/api/homework-create/",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          Swal.fire({
            title: "Homework has been created successfully",
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
  };
  return (
    <div
      onClick={() => dispatch(cancelBtnHomeWorkCreate())}
      className="modal_container"
    >
      <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <select defaultValue={createHWSelectedValue} onChange={(e)=>dispatch(createHomeWorkSelect(e.target.value))}>
          {groupsStudentArr.map((data,i) => {
            return <option key={i} value={data.name}>{data.name}</option>
          })}
        </select>
        <input
          className="course_inp"
          placeholder="Create your homework name.."
          type="text"
          onChange={(e) => dispatch(createHomeWorkInp(e.target.value))}
          value={createHomeWorkValue}
        />
        <div className="course_modal_btns">
          <button onClick={() => postHomeWorkCreate()}>Create</button>
          <button onClick={() => dispatch(cancelBtnHomeWorkCreate())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHomeWorkCreate;
