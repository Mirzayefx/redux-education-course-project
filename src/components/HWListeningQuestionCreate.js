import React from "react";
import { cancelHWListeningQCreate, createHWListeningQCreateInp, createHWListeningQCreateInpNumber } from "../reduxFolder/MainReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const HWListeningQuestionCreate = () => {
  const dispatch = useDispatch();
  const createHWListeningQCreateValue = useSelector((state) => state.Data.createHWListeningQCreateValue);
  const createHWListeningQCreateNumberValue = useSelector((state) => state.Data.createHWListeningQCreateNumberValue);
  const HWListeningQCreateID = useSelector((state) => state.Data.HWListeningQCreateID);

  const createHWListeningQ = () =>{
    const data = {
        listening: HWListeningQCreateID.id,
        question: createHWListeningQCreateValue,
        value: createHWListeningQCreateNumberValue
    }
    console.log(HWListeningQCreateID.id);

    axios.post('https://itticoursebaku.pythonanywhere.com/api/listeningquestion-create/', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        }
    })
    .then((resp) => {
      console.log(resp);
      if (resp.status === 201) {
        Swal.fire({
          title: `Question has been created in ${HWListeningQCreateID.name}`,
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
    <div onClick={()=>dispatch(cancelHWListeningQCreate())} className="modal_container">
      <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <input
          className="course_inp"
          placeholder="Enter a question"
          type="text"
          onChange={(e) => dispatch(createHWListeningQCreateInp(e.target.value))}
          value={createHWListeningQCreateValue}
        />
                <input
          className="course_inp"
          placeholder="Value"
          type="number"
          onChange={(e) => dispatch(createHWListeningQCreateInpNumber(e.target.value))}
          value={createHWListeningQCreateNumberValue}
        />
        <div className="course_modal_btns">
          <button onClick={createHWListeningQ}>Create</button>
          <button onClick={()=>dispatch(cancelHWListeningQCreate())}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default HWListeningQuestionCreate;
