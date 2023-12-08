import React, { useEffect, useState } from 'react'
import { cancelHWListeningCreate, createHWListeningInp, createHWListeningMax } from '../reduxFolder/MainReducer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const HWListeningCreate = () => {
  const dispatch = useDispatch();
  const HWListeningsObj = useSelector((state) => state.Data.HWListeningsObj);
  const createHWListeningValue = useSelector((state) => state.Data.createHWListeningValue);
//   const createHWListeningAudioValue = useSelector((state) => state.Data.createHWListeningAudioValue);
  const createHWListeningMaxValue = useSelector((state) => state.Data.createHWListeningMaxValue);


  const [createHWListeningAudioValue, setCreateHWListeningAudioValue] = useState(null)

  const createHWListeningAudio = (e)=>{
    setCreateHWListeningAudioValue(e.target.files[0])
  }
  console.log(createHWListeningAudioValue);

  const createHWListening = () =>{
    const data = {
        homework: HWListeningsObj.id ,
        name: createHWListeningValue,
        audio: createHWListeningAudioValue,
        max_result: +createHWListeningMaxValue
    }
    console.log(data);

    axios.post('https://itticoursebaku.pythonanywhere.com/api/listening-create/', data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        }
    })
    .then(resp=>{
        console.log(resp);
    })
  }


  return (
    <div onClick={() => dispatch(cancelHWListeningCreate())} className='modal_container'>
        <div onClick={(e) => e.stopPropagation()} className="modal_card">
            <form encType="multipart/form-data">
        <input
          className="course_inp"
          placeholder="Enter a listening name"
          type="text"
          onChange={(e) => dispatch(createHWListeningInp(e.target.value))}
          value={createHWListeningValue}
        />
                <input
          className="course_inp"
          placeholder="AUDIO"
          type="file"
          name='audio'
          accept='audio/*'
          onChange={createHWListeningAudio}
        />
                <input
          className="course_inp"
          placeholder="Max result"
          type="number"
          onChange={(e) => dispatch(createHWListeningMax(e.target.value))}
          value={createHWListeningMaxValue}
        />
        </form>

<div className="course_modal_btns">
          <button onClick={createHWListening} >Create</button>
          <button onClick={()=>dispatch(cancelHWListeningCreate())}>
            Cancel
          </button>
        </div>
        </div>
    </div>
  )
}

export default HWListeningCreate