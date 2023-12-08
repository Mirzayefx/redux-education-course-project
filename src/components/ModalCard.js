import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cancelBtnCourse } from "../reduxFolder/MainReducer";

const ModalCard = () => {
  const accountsArr = useSelector(state=>state.Data.accountsArr)
  const [selectedUser, setSelectedUser] = useState([]);
  const [courseCreateInpValue, setCourseCreateInpValue] = useState("");
  const dispatch = useDispatch()

  function selected(e) {
    setSelectedUser(e);
  }

  function courseCreateInp(e) {
    setCourseCreateInpValue(e.target.value);
  }

  function saveBtn() {
    const data = {
      name: courseCreateInpValue,
      accounts: selectedUser,
    };
    console.log(data);
    axios
      .post(
        "https://itticoursebaku.pythonanywhere.com/api/course-create/",
        data,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          Swal.fire({
            title: "Course has been created successfully",
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
    <div className="modal_card">
      <input
      className="course_inp"
      placeholder="Enter your course name..."
        value={courseCreateInpValue}
        onChange={courseCreateInp}
        type="text"
      />
      <Multiselect
      placeholder="Add your participants..."
        isObject={false}
        onSelect={selected}
        options={accountsArr.map((data) => {
          return data.email;
        })}
        selectedValues={""}
        showCheckbox
      />
      <div className="course_modal_btns">
      <button onClick={saveBtn}>Create</button>
      <button onClick={()=>dispatch(cancelBtnCourse())}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalCard;
