import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backToModalView } from '../reduxFolder/MainReducer'

const ModalUnitView = () => {
    const modalUnitsObj = useSelector(state=>state.Data.modalUnitsObj)
    const dispatch = useDispatch()
    console.log(modalUnitsObj);
  return (
    <div className='modal_container'>
        <div className="modal_card modal_unit_view">
            <h1 className='animate-charcter'>{modalUnitsObj.name}</h1>
            <p className='modal_about'>{modalUnitsObj.about.length !== 0 ? modalUnitsObj.about : <p className='modal_about'>No Description given :(</p>}</p>
            <div className="course_modal_btns">
            <button onClick={()=>dispatch(backToModalView())}>Back</button>
            </div>
        </div>
    </div>
  )
}

export default ModalUnitView