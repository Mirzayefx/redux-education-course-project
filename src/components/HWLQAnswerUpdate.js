import React from 'react'
import { cancelHWLQAnswerUpdate, checkedStatus, updateHWLQAnswerInp } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const HWLQAnswerUpdate = () => {
  const dispatch = useDispatch();
//   const listeningquestionsObj = useSelector((state) => state.Data.listeningquestionsObj);
  const listeningquestionanswersObj = useSelector((state) => state.Data.listeningquestionanswersObj);

  const updateHWLQAnswerInpValue = useSelector((state) => state.Data.updateHWLQAnswerInpValue);
  const CheckedStatus = useSelector((state) => state.Data.CheckedStatus);



  console.log(listeningquestionanswersObj);

  const updateHWLQAnswer = (listeningquestionanswersObj) =>{
    const data = {
        id: listeningquestionanswersObj.id,
        answer: updateHWLQAnswerInpValue,
        is_true: CheckedStatus,
        question: listeningquestionanswersObj.question
    }
    console.log(data);

    axios.put(`https://itticoursebaku.pythonanywhere.com/api/listeningquestionanswer-update-delete/${listeningquestionanswersObj.id}/`, data, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        }
    })
    .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          Swal.fire({
            title: "Listening Question answer has been changed successfully",
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
    <div  onClick={()=>dispatch(cancelHWLQAnswerUpdate())} className="modal_container">
    <div onClick={(e) => e.stopPropagation()}  className="modal_card">
    <input
        className="course_inp"
        placeholder="Change an answer"
        type="text"
        onChange={(e) => dispatch(updateHWLQAnswerInp(e.target.value))}
        value={updateHWLQAnswerInpValue}
      />

      <div className="checkbox_row">
        <input type="checkbox" checked={CheckedStatus ? "checked" : false} id="vehicle1" onChange={(e)=>(dispatch(checkedStatus(e.target.checked)))} />
         <label htmlFor="vehicle1">{CheckedStatus ? "is true"  : "not true (leave it blank)"}</label>
         </div>

      <div className="course_modal_btns">
        <button onClick={()=>updateHWLQAnswer(listeningquestionanswersObj)} >Update</button>
        <button onClick={()=>dispatch(cancelHWLQAnswerUpdate())}>Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default HWLQAnswerUpdate