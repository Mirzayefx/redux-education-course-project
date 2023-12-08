import React, { useState } from 'react'
import { cancelHWListeningUpdate, updateHWListeningAudio, updateHWListeningInp, updateHWListeningMax } from '../reduxFolder/MainReducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const HWListeningUpdate = () => {

  const dispatch = useDispatch();

  const updateHWListeningValue = useSelector((state) => state.Data.updateHWListeningValue);
  const updateHWListeningAudioValue = useSelector((state) => state.Data.updateHWListeningAudioValue);
  const updateHWListeningMaxValue = useSelector((state) => state.Data.updateHWListeningMaxValue);
  const HWListeningsObj = useSelector((state) => state.Data.HWListeningsObj);
  const modalHomeWorkCardsObj = useSelector((state) => state.Data.modalHomeWorkCardsObj);


  const [updateHWListeningAudioValueS, setUpdateHWListeningAudioValueS] = useState(null)

  const updateHWListeningAudio = (e)=>{
    setUpdateHWListeningAudioValueS(e.target.files[0])
  }
  console.log(updateHWListeningAudioValue);
  // console.log(HWListeningsObj.id);



  const updateHWListening =(HWListeningsObj)=>{
    const data = {
      id: HWListeningsObj.id,
      name: updateHWListeningValue,
      audio: updateHWListeningAudioValueS,
      max_result: updateHWListeningMaxValue,
      homework: modalHomeWorkCardsObj.id
    }

    console.log(data);
    axios.put(`https://itticoursebaku.pythonanywhere.com/api/listening-update-delete/${HWListeningsObj.id}/`, data, {
      headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      }
  })
  .then((resp) => {
    console.log(resp);
    if (resp.status === 200) {
      Swal.fire({
        title: "Listening has been changed successfully",
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
    <div  onClick={()=>dispatch(cancelHWListeningUpdate())} className='modal_container'>
        <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <form encType="multipart/form-data">
        <input
          className="course_inp"
          placeholder="Change a listening name"
          type="text"
          onChange={(e)=>dispatch(updateHWListeningInp(e.target.value))}
          value={updateHWListeningValue}
        />
                <input
          className="course_inp"
          placeholder="AUDIO"
          type="file"
          name='audio'
          accept='audio/*'
          onChange={updateHWListeningAudio}
          // value={''}
          // defaultValue={updateHWListeningAudioValue}
        />
                <input
          className="course_inp"
          placeholder="Change Max result"
          type="number"
          onChange={(e)=>dispatch(updateHWListeningMax(e.target.value))}
          value={updateHWListeningMaxValue}
        />
        </form>
        <div className="course_modal_btns">
          <button onClick={()=>updateHWListening(HWListeningsObj)}>Update</button>
          <button onClick={()=>dispatch(cancelHWListeningUpdate())}>
            Cancel
          </button>
        </div>
        </div>
    </div>
  )
}

export default HWListeningUpdate