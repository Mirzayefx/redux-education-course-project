import React from "react";
import {
  cancelHWReadingCreate,
  createHWReadingInp,
  createHWReadingMax,
  createHWReadingText,
} from "../reduxFolder/MainReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const HWReadingCreate = () => {
  const dispatch = useDispatch();
  const createHWReadingInpValue = useSelector(
    (state) => state.Data.createHWReadingInpValue
  );
  const createHWReadingTextValue = useSelector(
    (state) => state.Data.createHWReadingTextValue
  );
  const createHWReadingMaxValue = useSelector(
    (state) => state.Data.createHWReadingMaxValue
  );
  const HWListeningsObj = useSelector((state) => state.Data.HWListeningsObj);

  const createHWReading = (HWListeningsObj) => {
    const data = {
      homework: HWListeningsObj.id,
      name: createHWReadingInpValue,
      text: createHWReadingTextValue,
      max_result: createHWReadingMaxValue,
    };

    axios
      .post(
        "https://itticoursebaku.pythonanywhere.com/api/reading-create/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          Swal.fire({
            title: `Reading has been created successfully`,
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
      onClick={() => dispatch(cancelHWReadingCreate())}
      className="modal_container"
    >
      <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <input
          className="course_inp"
          placeholder="Reading name"
          type="text"
          onChange={(e) => dispatch(createHWReadingInp(e.target.value))}
          value={createHWReadingInpValue}
        />
        <textarea
          style={{ marginBottom: "10px" }}
          onChange={(e) => dispatch(createHWReadingText(e.target.value))}
          value={createHWReadingTextValue}
          placeholder="Reading Text"
          cols="30"
          rows="10"
        ></textarea>
        <input
          className="course_inp"
          placeholder="Max result"
          type="number"
          onChange={(e) => dispatch(createHWReadingMax(e.target.value))}
          value={createHWReadingMaxValue}
        />

        <div className="course_modal_btns">
          <button onClick={() => createHWReading(HWListeningsObj)}>
            Create
          </button>
          <button onClick={() => dispatch(cancelHWReadingCreate())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HWReadingCreate;
