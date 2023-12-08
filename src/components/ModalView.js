import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelBtnCourse, createUnit, updateUnit, viewUnit } from '../reduxFolder/MainReducer';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalView = () => {
    const modalViewSelectedUnit = useSelector(state=>state.Data.modalViewSelectedUnit)
    const loggedInUser=useSelector(state=>state.Data.loggedInUser);

    const dispatch = useDispatch()

    console.log(modalViewSelectedUnit);

    const deleteUnit=(data)=>{
        axios.delete(`https://itticoursebaku.pythonanywhere.com/api/unit-delete/${data.id}/`,{
            headers:{
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        })
    .then((resp) => {
      console.log(resp);
      if (resp.status === 204) {
        Swal.fire({
          title: "Unit has been deleted successfully",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(function () {
          window.location.href = "/courses";
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
    <div className='modal_container'>
        <div className='modal_card modal_view'>
        <button onClick={()=>dispatch(cancelBtnCourse())} className='cancel_view'>X</button>
            <div className="unit_container">
            {
                modalViewSelectedUnit.units.length !== 0 ?
                modalViewSelectedUnit.units.map((data,i)=>{
                    return (
                        <div key={i} className='unit_card'>
                            <h4>Unit's name: <span>{data.name}</span></h4>
                            {/* <h4>Unit's about: <span>{data.about}</span></h4> */}
                            <div className="course_modal_btns">
                            <button onClick={()=>deleteUnit(data)}>Delete</button>
                            <button onClick={()=>dispatch(updateUnit(data))}>Update</button>
                            <button onClick={()=>dispatch(viewUnit(data))}>View</button>
                            </div>
                            </div>
                    )
                })
                :
                <h2>NO UNIT CREATED</h2>
            }
            </div>
            {
              loggedInUser.is_staff !== true && loggedInUser.category === 'T' ?
              <button onClick={()=>dispatch(createUnit(modalViewSelectedUnit))} className='create_view'>CREATE NEW UNIT</button> 
              : null
            }
                
        </div>
    </div>
  )
}

export default ModalView