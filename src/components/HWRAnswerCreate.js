import React from "react";
import {
  cancelHWReadingACreate,
  createHWReadingACreateInp,
  createHWReadingACreateInpNumber,
} from "../reduxFolder/MainReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const HWRAnswerCreate = () => {
  const dispatch = useDispatch();
  const createHWReadingACreateInpValue = useSelector(
    (state) => state.Data.createHWReadingACreateInpValue
  );
  const createHWReadingACreateNumberValue = useSelector(
    (state) => state.Data.createHWReadingACreateNumberValue
  );
  const HWReadingObj = useSelector((state) => state.Data.HWReadingObj);


  const createHWReadingAnswer = (HWReadingObj) => {
    const data = {
      reading: HWReadingObj.id,
      answer: createHWReadingACreateInpValue,
      value: createHWReadingACreateNumberValue,
    };
    axios
      .post(
        "https://itticoursebaku.pythonanywhere.com/api/readinganswer-create/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.status === 201) {
          Swal.fire({
            title: `Reading answer has been created successfully`,
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
      onClick={() => dispatch(cancelHWReadingACreate())}
      className="modal_container"
    >
      <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <input
          className="course_inp"
          placeholder="Reading Answer"
          type="text"
          onChange={(e) => dispatch(createHWReadingACreateInp(e.target.value))}
          value={createHWReadingACreateInpValue}
        />
        <input
          className="course_inp"
          placeholder="Value"
          type="number"
          onChange={(e) =>
            dispatch(createHWReadingACreateInpNumber(e.target.value))
          }
          value={createHWReadingACreateNumberValue}
        />
        <div className="course_modal_btns">
          <button onClick={() => createHWReadingAnswer(HWReadingObj)}>
            Create
          </button>
          <button onClick={() => dispatch(cancelHWReadingACreate())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HWRAnswerCreate;
