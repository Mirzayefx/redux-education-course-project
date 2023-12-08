import React from 'react'
import { cancelBtnUnitUpdate, unitUpdateAboutInp, unitUpdateNameInp } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalUnitUpdate = () => {
    const dispatch = useDispatch()
    const modalUnitsObj = useSelector(state=>state.Data.modalUnitsObj)
    const unitUpdateNameValue = useSelector(state=>state.Data.unitUpdateNameValue)
    const unitUpdateAboutValue = useSelector(state=>state.Data.unitUpdateAboutValue)
    const modalViewSelectedUnit = useSelector(state=>state.Data.modalViewSelectedUnit)
    console.log(modalUnitsObj);

    const putUnitUpdate=(modalUnitsObj)=>{
      const data = {
        name: unitUpdateNameValue,
        about: unitUpdateAboutValue,
        course: modalViewSelectedUnit.id
      }
      axios.put(`https://itticoursebaku.pythonanywhere.com/api/unit-update/${modalUnitsObj.id}/`,data,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then(resp=>{
        console.log(resp);
        if (resp.status === 200) {
          Swal.fire({
            title: "Unit has been changed successfully",
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
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Unfortunately, something went wrong, please try again",
          icon: "error",
          confirmButtonText: "Continue",
        });
      });
    }
  return (
    <div>
           <div className="modal_container">
      <div className="modal_card">
        <input
          className="course_inp"
          placeholder="Change your unit name.."
          type="text"
          onChange={(e) => dispatch(unitUpdateNameInp(e.target.value))}
          value={unitUpdateNameValue}
        />
        <textarea placeholder='Change your unit about..'
        onChange={(e)=> dispatch(unitUpdateAboutInp(e.target.value))}
        value={unitUpdateAboutValue}
         cols="30" rows="10"></textarea>
        <div className="course_modal_btns">
          <button onClick={()=>putUnitUpdate(modalUnitsObj)}>Change</button>
          <button onClick={()=>dispatch(cancelBtnUnitUpdate())}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ModalUnitUpdate