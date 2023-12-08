import React from 'react'
import Topic from '../components/Topic'
import SideBarFixed from '../components/SideBarFixed'
import HomeWorkContainer from '../components/HomeWorkContainer'
import ModalHomeWorkUpdate from '../components/ModalHomeWorkUpdate'
import { useDispatch, useSelector } from 'react-redux'
import ModalHomeWorkCreate from '../components/ModalHomeWorkCreate'
import { createHomeWork } from '../reduxFolder/MainReducer'
import HWListenings from '../components/HWListenings'
import HWListeningQuestionCreate from '../components/HWListeningQuestionCreate'
import HWListeningCreate from '../components/HWListeningCreate'
import HWListeningUpdate from '../components/HWListeningUpdate'
import HWListeningQuestions from '../components/HWListeningQuestions'
import HWLQAnswerCreate from '../components/HWLQAnswerCreate'
import HWLQAnswers from '../components/HWLQAnswers'
import HWLQuestionUpdate from '../components/HWLQuestionUpdate'
import HWLQAnswerUpdate from '../components/HWLQAnswerUpdate'
import HWReadingCreate from '../components/HWReadingCreate'
import HWRAnswerCreate from '../components/HWRAnswerCreate'


const HomeWork = () => {
  
  const modalHomeWorkUpdateShow = useSelector(state=>state.Data.modalHomeWorkUpdateShow)
  const modalHomeWorkCreateShow = useSelector(state=>state.Data.modalHomeWorkCreateShow)
  const HWListeningsShow = useSelector(state=>state.Data.HWListeningsShow)
  const HWListeningQuestionsShow = useSelector(state=>state.Data.HWListeningQuestionsShow)
  const HWListeningQCreateShow = useSelector(state=>state.Data.HWListeningQCreateShow)
  const HWListeningCreateShow = useSelector(state=>state.Data.HWListeningCreateShow)
  const HWListeningUpdateShow = useSelector(state=>state.Data.HWListeningUpdateShow)
  const HWLQuestionsAnswerCreateShow = useSelector(state=>state.Data.HWLQuestionsAnswerCreateShow)
  const HWLQuestionsAnswerViewShow = useSelector(state=>state.Data.HWLQuestionsAnswerViewShow)
  const HWLQuestionsUpdateShow = useSelector(state=>state.Data.HWLQuestionsUpdateShow)
  const HWLQAnswerUpdateShow = useSelector(state=>state.Data.HWLQAnswerUpdateShow)
  const HWReadingCreateShow = useSelector(state=>state.Data.HWReadingCreateShow)
  const HWReadingACreateShow = useSelector(state=>state.Data.HWReadingACreateShow)
  const dispatch = useDispatch()
  return (
    <>
    <SideBarFixed />
    <div className="pages_container">
      <div className="container">
        <Topic topic={"Home Work"} />
        <HomeWorkContainer/>
        <div className="course_create_btn homework_create_btn">
            <button onClick={()=>dispatch(createHomeWork())}>Create HomeWork</button>
        </div>
          {modalHomeWorkUpdateShow && <ModalHomeWorkUpdate/>}
          {modalHomeWorkCreateShow && <ModalHomeWorkCreate/>}
          {HWListeningsShow && <HWListenings/>}
          {HWListeningQuestionsShow && <HWListeningQuestions/>}
          {HWListeningQCreateShow && <HWListeningQuestionCreate/>}
          {HWListeningCreateShow && <HWListeningCreate/>}
          {HWListeningUpdateShow && <HWListeningUpdate/>}
          {HWLQuestionsAnswerCreateShow && <HWLQAnswerCreate/>}
          {HWLQuestionsAnswerViewShow && <HWLQAnswers/>}
          {HWLQuestionsUpdateShow && <HWLQuestionUpdate/>}
          {HWLQAnswerUpdateShow && <HWLQAnswerUpdate/>}
          {HWReadingCreateShow && <HWReadingCreate/>}
          {HWReadingACreateShow && <HWRAnswerCreate/>}

          
        
      </div>
    </div>
  </>
  )
}

export default HomeWork