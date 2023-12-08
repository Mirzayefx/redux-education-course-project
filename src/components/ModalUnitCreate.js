import React from 'react'
import { cancelBtnUnitCreate, createUnitAboutInp, createUnitNameInp } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalUnitCreate = () => {
    const dispatch = useDispatch()
    const createUnitNameValue = useSelector(state=>state.Data.createUnitNameValue)
    const createUnitAboutValue = useSelector(state=>state.Data.createUnitAboutValue)
    const modalViewSelectedUnit = useSelector(state=>state.Data.modalViewSelectedUnit)

    const postCreateUnit=(modalViewSelectedUnit)=>{
      const data = {
        name: createUnitNameValue,
        about: createUnitAboutValue,
        course: modalViewSelectedUnit.id
      }
      console.log(data);

      axios.post(`https://itticoursebaku.pythonanywhere.com/api/unit-create/`,data,{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          Swal.fire({
            title: "Unit has been created successfully",
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
    <div className="modal_container">
    <div className="modal_card">
      <input
        className="course_inp"
        placeholder="Enter your unit name..."
        type="text"
        onChange={(e) => dispatch(createUnitNameInp(e.target.value))}
        value={createUnitNameValue}
      />
        <textarea placeholder='Write about something regarding this unit'
        onChange={(e)=> dispatch(createUnitAboutInp(e.target.value))}
        value={createUnitAboutValue}
         cols="30" rows="10"></textarea>
      <div className="course_modal_btns">
        <button onClick={()=>postCreateUnit(modalViewSelectedUnit)}>Create</button>
        <button onClick={()=>dispatch(cancelBtnUnitCreate())}>Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default ModalUnitCreate