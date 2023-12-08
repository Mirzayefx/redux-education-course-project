import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelHWLQAnswerCreate, createHWLQAnswerInp } from "../reduxFolder/MainReducer";
import axios from "axios";
import Swal from "sweetalert2";

const HWLQAnswerCreate = () => {
  const dispatch = useDispatch();
  const createHWLQAnswerInpValue = useSelector((state) => state.Data.createHWLQAnswerInpValue);
  const listeningquestionsObj = useSelector((state) => state.Data.listeningquestionsObj);

  const [CheckStatus, setCheckStatus] = useState(false);

  const createHWLQAnswer = () =>{
    const data = {
      question: listeningquestionsObj.id,
      answer: createHWLQAnswerInpValue,
      is_true: CheckStatus
    }
    console.log(data);

    axios.post("https://itticoursebaku.pythonanywhere.com/api/listeningquestionanswer-create/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      }
    })
    .then((resp) => {
      console.log(resp);
      if (resp.status === 201) {
        Swal.fire({
          title: `Answer has been created successfully`,
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
    <div  onClick={()=>dispatch(cancelHWLQAnswerCreate())} className="modal_container">
      <div onClick={(e) => e.stopPropagation()}  className="modal_card">
      <input
          className="course_inp"
          placeholder="Enter an answer"
          type="text"
          onChange={(e) => dispatch(createHWLQAnswerInp(e.target.value))}
          value={createHWLQAnswerInpValue}
        />

        <div className="checkbox_row">
          <input type="checkbox" id="vehicle1" onChange={(e)=>(setCheckStatus(e.target.checked))} />
           <label htmlFor="vehicle1">{CheckStatus ? "is true" : "not true (leave it blank)"}</label>
           </div>

        <div className="course_modal_btns">
          <button onClick={createHWLQAnswer}>Create</button>
          <button onClick={()=>dispatch(cancelHWLQAnswerCreate())}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default HWLQAnswerCreate;
