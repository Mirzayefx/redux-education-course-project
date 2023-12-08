import React from 'react'
import { cancelHWLQuestionUpdate, updateHWLQuestionInp, updateHWLQuestionInpNumber } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const HWLQuestionUpdate = () => {
  const dispatch = useDispatch();
  const listeningquestionsObj = useSelector((state) => state.Data.listeningquestionsObj);
  const updateHWLQuestionValue = useSelector((state) => state.Data.updateHWLQuestionValue);
  const updateHWLQuestionNumberValue = useSelector((state) => state.Data.updateHWLQuestionNumberValue);

  const updateHWLQuestion = (listeningquestionsObj) =>{
    const data = {
      id: listeningquestionsObj.id,
      question: updateHWLQuestionValue,
      value: updateHWLQuestionNumberValue,
      listening: listeningquestionsObj.listening
    }

    console.log(data);
    axios.put(`https://itticoursebaku.pythonanywhere.com/api/listeningquestion-update-delete/${listeningquestionsObj.id}/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      }
    })
    .then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        Swal.fire({
          title: "Listening Question has been changed successfully",
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
    <div  onClick={()=>dispatch(cancelHWLQuestionUpdate())} className='modal_container'>
    <div onClick={(e) => e.stopPropagation()} className="modal_card">
    <input
      className="course_inp"
      placeholder="Change a question"
      type="text"
      onChange={(e)=>dispatch(updateHWLQuestionInp(e.target.value))}
      value={updateHWLQuestionValue}
    />
            <input
      className="course_inp"
      placeholder="Change Value"
      type="number"
      onChange={(e)=>dispatch(updateHWLQuestionInpNumber(e.target.value))}
      value={updateHWLQuestionNumberValue}
    />

    <div className="course_modal_btns">
      <button onClick={()=>updateHWLQuestion(listeningquestionsObj)}>Update</button>
      <button onClick={()=>dispatch(cancelHWLQuestionUpdate())}>
        Cancel
      </button>
    </div>

    </div>
</div>
  )
}

export default HWLQuestionUpdate