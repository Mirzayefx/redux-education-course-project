import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HWLQAnswerUpdate, cancelHWLQAnswers } from "../reduxFolder/MainReducer";
import axios from "axios";
import Swal from "sweetalert2";

const HWLQAnswers = () => {
  const dispatch = useDispatch();
  const listeningquestionsObj = useSelector(
    (state) => state.Data.listeningquestionsObj
  );


  const HWLQAnswerDelete = (id) => {
    axios.delete(`https://itticoursebaku.pythonanywhere.com/api/listeningquestionanswer-update-delete/${id}/`,{
        headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        }
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 204) {
          Swal.fire({
            title: "Listening question answer has been deleted successfully",
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

  //   console.log(listeningquestionsObj);
  return (
    <div  onClick={() => dispatch(cancelHWLQAnswers())} className="modal_container">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal_card modal_hw_start modal_hw_listeningquestions"
      >
        <div className="hw_start_cancel hw_start_cancel_questions">
          <h2>{listeningquestionsObj.question}</h2>
          <button
              onClick={() => dispatch(cancelHWLQAnswers())}
            className="cancel_view cancel_hw_start"
          >
            X
          </button>
        </div>

        <h3 className="hw_start_LandR_topic hw_start_onlyL">
          Listening Question Answers
        </h3>
        <div className="hw_start_list_container">
          {listeningquestionsObj.listeningquestionanswers.length !== 0 ? (
            listeningquestionsObj.listeningquestionanswers.map((data, i) => {
              return (
                <div
                  key={i}
                  className="hw_start_lists hw_start_lists_questions"
                >
                  <p>
                    {i + 1}. {data.answer}
                  </p>
                  <div className="hw_start_lists_btns">
                    <button
                    onClick={() => dispatch(HWLQAnswerUpdate(data))}
                    >
                      Update
                    </button>
                    <button
                    onClick={() => HWLQAnswerDelete(data.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div
            style={{ justifyContent: "center" }}
            className="hw_start_lists"
          >
            <h2 style={{ color: "red" }}>ERROR 404 NOT FOUND</h2>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HWLQAnswers;
