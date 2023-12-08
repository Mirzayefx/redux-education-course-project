import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HWStartListeningQCreate,
  HWStartListeningUpdate,
  HWStartListeningView,
  HWStartReadingACreate,
  cancelHWListenings,
} from "../reduxFolder/MainReducer";
import axios from "axios";
import Swal from "sweetalert2";

const HWListenings = () => {
  const dispatch = useDispatch();
  const modalHomeWorkCardsObj = useSelector(
    (state) => state.Data.modalHomeWorkCardsObj
  );

  // const HWListeningsArr = useSelector((state) => state.Data.HWListeningsArr);

  const HWStartListeningDelete = (id) => {
    axios
      .delete(
        `https://itticoursebaku.pythonanywhere.com/api/listening-update-delete/${id}`,
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
            title: "Listening name has been deleted successfully",
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
    <div
      onClick={() => dispatch(cancelHWListenings())}
      className="modal_container"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal_card modal_hw_start"
      >
        <div className="hw_start_cancel">
          <h2>{modalHomeWorkCardsObj.name}</h2>
          <button
            onClick={() => dispatch(cancelHWListenings())}
            className="cancel_view cancel_hw_start"
          >
            X
          </button>
        </div>
        <div className="hw_start_list_container">
          <h3 className="hw_start_LandR_topic">Listening</h3>
          {modalHomeWorkCardsObj.listenings.length !== 0 ? (
            modalHomeWorkCardsObj.listenings.map((data, i) => {
              return (
                <div key={i} className="hw_start_lists">
                  <p>
                    {i + 1}. {data.name}
                  </p>
                  <div className="hw_start_lists_btns">
                    <button
                      onClick={() => dispatch(HWStartListeningQCreate(data))}
                    >
                      Question create
                    </button>
                    <button
                      onClick={() => dispatch(HWStartListeningView(data))}
                    >
                      View
                    </button>
                    <button
                      onClick={() => dispatch(HWStartListeningUpdate(data))}
                    >
                      Update
                    </button>
                    <button onClick={() => HWStartListeningDelete(data.id)}>
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

          <h3 className="hw_start_LandR_topic">Reading</h3>
          {modalHomeWorkCardsObj.readings.length !== 0 ? (
            modalHomeWorkCardsObj.readings.map((data, i) => {
              return (
                <div key={i} className="hw_start_lists">
                  <p>
                    {i + 1}. {data.name}
                  </p>
                  <div className="hw_start_lists_btns">
                    <button onClick={()=>dispatch(HWStartReadingACreate(data))}>Answer create</button>
                    <button>View</button>
                    <button>Update</button>
                    <button>Delete</button>
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

export default HWListenings;
