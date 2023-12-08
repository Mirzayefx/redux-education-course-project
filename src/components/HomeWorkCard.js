import React from 'react'
import { deleteHomeWorkCards } from '../action/MainAction';
import { useDispatch } from 'react-redux';
import { listeningCreate, readingCreate, startHomeWork, updateHomeWork } from '../reduxFolder/MainReducer';

const HomeWorkCard = ({data}) => {

    const dispatch = useDispatch()

  return (
    <div className='homework_card'>
        <span className='homework_name'>{data.name}</span>
        <div className="homework_content">
            <p>Course: <span>{data.course}</span></p>
            <div className="homework_btns">
              <div className="homework_btn_flex_l1">
            <button onClick={()=>dispatch(deleteHomeWorkCards(data.id))} className="button-29">Delete</button>
            <button onClick={()=>dispatch(updateHomeWork(data))} className="button-29">Update</button>
            <button onClick={()=>dispatch(startHomeWork(data))}  className="button-29">Start</button>
            </div>
            <div className="homework_btn_flex_l1">
            <button onClick={()=>dispatch(listeningCreate(data))}  className="button-29">Listening create</button>
            <button onClick={()=>dispatch(readingCreate(data))}  className="button-29">Reading create</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HomeWorkCard