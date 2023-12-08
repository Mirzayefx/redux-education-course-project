import React, { useEffect } from "react";
import SideBarFixed from "../components/SideBarFixed";
import CoursesContainer from "../components/CoursesContainer";
import Modal from "../components/Modal";
import Topic from "../components/Topic";
import { getAccountsArr } from "../action/MainAction";
import { useDispatch, useSelector } from "react-redux";
import { courseCreate } from "../reduxFolder/MainReducer";
import ModalCourseUpdate from "../components/ModalCourseUpdate";
import ModalView from "../components/ModalView";
import ModalUnitUpdate from "../components/ModalUnitUpdate";
import ModalUnitCreate from "../components/ModalUnitCreate";
import ModalUnitView from "../components/ModalUnitView";

const Courses = () => {
  const modal = useSelector((state) => state.Data.modal);
  const modalCourseUpdate = useSelector(
    (state) => state.Data.modalCourseUpdate
  );
  const loggedInUser=useSelector(state=>state.Data.loggedInUser);

  const modalViewShow = useSelector(state=>state.Data.modalViewShow)
  const modalUnitUpdateShow = useSelector(state=>state.Data.modalUnitUpdateShow)
  const modalUnitCreateShow = useSelector(state=>state.Data.modalUnitCreateShow)
  const modalUnitViewShow = useSelector(state=>state.Data.modalUnitViewShow)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountsArr());
  }, [dispatch]);

  return (
    <>
      <SideBarFixed />
      <div className="pages_container">
        <div className="container">
          <Topic topic={"Courses"} />
          <CoursesContainer />
          <div className="course_create_btn">
          {
          loggedInUser.is_staff===true?
          <button onClick={() => dispatch(courseCreate())}>
              Course Create
            </button>
        : null
        }
            
          </div>
          {modal && <Modal />}
          {modalCourseUpdate && <ModalCourseUpdate />}
          {modalViewShow && <ModalView/>}
          {modalUnitUpdateShow && <ModalUnitUpdate/>}
          {modalUnitCreateShow && <ModalUnitCreate/>}
          {modalUnitViewShow && <ModalUnitView/>}
        </div>
      </div>
    </>
  );
};

export default Courses;
