import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HWLQuestionsAnswerView, cancelHWListeningQuestions, HWLQuestionsAnswerCreate, HWLQuestionsAnswerUpdate } from "../reduxFolder/MainReducer";
import axios from "axios";
import Swal from "sweetalert2";

const HWListeningQuestions = () => {
  const dispatch = useDispatch();
  const HWListeningsObj = useSelector((state) => state.Data.HWListeningsObj);


  console.log();


  const HWLQuestionsAnswerDelete = (id) => {
    axios
      .delete(
        `https://itticoursebaku.pythonanywhere.com/api/listeningquestion-update-delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 204) {
          Swal.fire({
            title: "Listening question has been deleted successfully",
            icon: "success",
            confirmButtonText: "Continue",
          }).then(function () {
            window.location.href = "/homework";
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
    <div onClick={()=>dispatch(cancelHWListeningQuestions())} className="modal_container">
      <div  onClick={(e) => e.stopPropagation()}  className="modal_card modal_hw_start modal_hw_listeningquestions">

      <div className="hw_listeningquestions_audio">
        <div className="hw_start_cancel hw_start_cancel_questions">
        <h2>{HWListeningsObj.name}</h2>
          <button
            onClick={() => dispatch(cancelHWListeningQuestions())}
            className="cancel_view cancel_hw_start"
          >
            X
          </button>
        </div>
        <audio controls>
          <source src={HWListeningsObj.audio} type="audio/mpeg" />
        </audio>
        </div>


        <h3 className="hw_start_LandR_topic hw_start_onlyL">Listening Questions</h3>
        <div className="hw_start_list_container">
        {
          HWListeningsObj.listeningquestions.map((data,i)=>{
            return (
              
              <div key={i} className="hw_start_lists hw_start_lists_questions">
              <p>
                {i + 1}. {data.question}
              </p>
              <div className="hw_start_lists_btns">
                <button
                  onClick={() => dispatch(HWLQuestionsAnswerCreate(data))}
                >
                  Answer create
                </button>
                <button
                  onClick={() => dispatch(HWLQuestionsAnswerView(data))}
                >
                  View
                </button>
                <button
                  onClick={() => dispatch(HWLQuestionsAnswerUpdate(data))}
                >
                  Update
                </button>
                <button 
                onClick={() => HWLQuestionsAnswerDelete(data.id)}
                >
                  Delete
                </button>
              </div>
            </div>

              // <div key={i} className="hw_lq_container">
              //   <div className="hw_lq">
              // <p>{i+1}. {data.question}</p>
              // </div>
              // {
              //   data.listeningquestionanswers.map((data,i)=>{
              //     return (
              //     <div key={i} className="hw_lq_answers">
              //     <input type="checkbox" />
              //     <span>{data.answer}</span>
              //     </div>
              //     )
               
              //   })
              // }
              // </div>
            )
          })
        }
        </div>


        {/* <div className="hw_lq_btn">
        <button onClick={()=>dispatch(cancelHWListeningQuestions())} className="button-60" role="button">Save & Close</button>
        </div> */}
      </div>
    </div>
  );
};

export default HWListeningQuestions;
