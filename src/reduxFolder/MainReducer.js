import { initialState } from "./initialState";
import { createSlice } from "@reduxjs/toolkit";

export const MainSlice = createSlice({
  name: "MAIN_SLICE",
  initialState: initialState,
  reducers: {
    getUserData: (state, action) => {
      state.loggedInUser = action.payload;
    },
    getAdminCoursesData: (state, action) => {
      state.coursesAdminArr = action.payload;
      // state.allCoursesIdObj = action.payload.id
    },
    getStudentCoursesData: (state, action) => {
      state.coursesStudentArr = action.payload;
      // state.allCoursesIdObj = action.payload.id
    },
    getAdminGroupsData: (state, action) => {
      state.groupsAdminArr = action.payload;
    },
    getStudentGroupsData: (state, action) => {
      state.groupsStudentArr = action.payload;
    },
    getAccountsArrData: (state, action) => {
      state.accountsArr = action.payload;
    },
    courseCreate: (state, action) => {
      state.modal = true;
    },
    updateCourse: (state, action) => {
      console.log(action.payload);  
      state.updateCourseArr=action.payload.accounts
      state.updateCourseObj=action.payload
      state.updateCourseCreateInpValue = action.payload.name;
      state.updateSelectedUser = action.payload.accounts;
      state.modalCourseUpdate = true;
    },
    updateCourseInp: (state, action) => {
      state.updateCourseCreateInpValue = action.payload;
    },

    cancelBtnCourse: (state, action) => {
        state.modal = false;
      state.modalCourseUpdate = false;
      state.modalViewShow = false;
    },
    viewCourse: (state, action) => {
      state.modalViewShow = true
      state.modalViewSelectedUnit = action.payload
    },
    unitsData: (state, action) => {
      state.modalUnitsArr = action.payload.units
    },
    updateUnit: (state, action) => {
      state.modalUnitUpdateShow=true
      state.modalUnitsObj=action.payload
      state.unitUpdateNameValue = action.payload.name
      state.unitUpdateAboutValue = action.payload.about
    },
    cancelBtnUnitUpdate: (state, action) => {
      state.modalViewShow = true
      state.modalUnitUpdateShow=false
    },
    unitUpdateNameInp: (state, action) => {
      state.unitUpdateNameValue = action.payload
       },
    unitUpdateAboutInp: (state, action) => {
      state.unitUpdateAboutValue =action.payload
    },
    createUnit: (state, action) => {
      state.modalUnitCreateShow = true
    },
    cancelBtnUnitCreate: (state, action)=>{
      state.modalViewShow = true
      state.modalUnitCreateShow = false
    },
    createUnitNameInp: (state, action) => {
      state.createUnitNameValue = action.payload
    },
    createUnitAboutInp: (state,action) => {
      state.createUnitAboutValue = action.payload
    },
    viewUnit: (state, action) => {
      state.modalUnitViewShow = true;
      state.modalViewShow = false
      state.modalUnitsObj=action.payload
    },
    backToModalView: (state, action) => {
      state.modalViewShow = true
      state.modalUnitViewShow = false;
    },
    getHomeWorkCardsData: (state, action) => {
      state.getHomeWorkCardsArr = action.payload
    },
    getMyHomeWorkCardsData: (state, action) => {
      state.getMyHomeWorkCardsArr= action.payload
    },
    updateHomeWork: (state, action) => {
      console.log(action.payload);
      state.modalHomeWorkUpdateShow = true;
      state.modalHomeWorkCardsObj = action.payload
      state.updateHomeWorkSelectedValue = action.payload.course
      state.updateHomeWorkValue = action.payload.name
    },
    updateHomeWorkInp: (state, action) => {
      state.updateHomeWorkValue = action.payload
    },
    cancelBtnHomeWorkUpdate: (state, action) => {
      state.modalHomeWorkUpdateShow = false
    },
    createHomeWork: (state, action) => {
      state.modalHomeWorkCreateShow = true
    },
    cancelBtnHomeWorkCreate: (state, action) => {
      state.modalHomeWorkCreateShow = false
    },
    createHomeWorkInp: (state, action) => {
      state.createHomeWorkValue = action.payload
    },
    createHomeWorkSelect: (state,action) => {
      // state.createHWSelectedValue=state.coursesStudentArr[0].name
      state.createHWSelectedValue=action.payload
      console.log(action.payload);
    },
    updateHomeWorkSelect: (state, action) => {
      state.updateHomeWorkChangeValue=action.payload
    },
    startHomeWork: (state, action) => {
      console.log(action.payload);
      state.HWListeningsShow = true
      state.modalHomeWorkCardsObj = action.payload
    },
    // getHWListeningsData: (state, action) => {
    //   state.HWListeningsArr = action.payload
    // },
    cancelHWListenings: (state, action) => {
      state.HWListeningsShow = false
    },
    HWStartListeningView: (state, action) => {
      state.HWListeningQuestionsShow = true
      state.HWListeningsShow = false
      state.HWListeningsObj = action.payload
    },
    cancelHWListeningQuestions: (state, action) => {
      state.HWListeningQuestionsShow = false
      state.HWListeningsShow = true
    },
    HWStartListeningQCreate: (state, action) => {
      state.HWListeningQCreateShow = true
      state.HWListeningQCreateID = action.payload
    },
    cancelHWListeningQCreate: (state, action) => {
      state.HWListeningQCreateShow = false
    },
    createHWListeningQCreateInp: (state, action) => {
      state.createHWListeningQCreateValue = action.payload
    },
    createHWListeningQCreateInpNumber: (state, action) => {
      state.createHWListeningQCreateNumberValue = action.payload
    },
    listeningCreate: (state, action) => {
      state.HWListeningCreateShow = true
      state.HWListeningsObj = action.payload
    },
    cancelHWListeningCreate: (state, action) =>{
      state.HWListeningCreateShow = false
    },
    createHWListeningInp: (state, action) => {
      state.createHWListeningValue = action.payload
    },
    // createHWListeningAudio: (state, action) => {
    //   state.createHWListeningAudioValue = action.payload
    // },
    createHWListeningMax: (state, action) => {
      state.createHWListeningMaxValue = action.payload
    },
    // ---- HW LISTENING UPDATE 
    HWStartListeningUpdate: (state, action) => {
      state.HWListeningUpdateShow = true
      state.HWListeningsObj = action.payload
      console.log(action.payload);
      state.updateHWListeningValue = action.payload.name
      state.updateHWListeningAudioValue = action.payload.audio
      state.updateHWListeningMaxValue = action.payload.max_result
    },
    updateHWListeningInp: (state, action) => {
      state.updateHWListeningValue = action.payload
    },
    updateHWListeningMax: (state,action) =>{
      state.updateHWListeningMaxValue = action.payload
    },
    cancelHWListeningUpdate: (state, action) => {
      state.HWListeningUpdateShow = false
    },
    updateHWListeningAudio: (state, action) => {
      state.updateHWListeningAudioValue = action.payload
    },
    // ---- HW LISTENING QUESTIONS  CREATE 

    HWLQuestionsAnswerCreate: (state, action) => {
      state.HWLQuestionsAnswerCreateShow = true
      console.log(action.payload);
      state.listeningquestionsObj = action.payload
    },
    cancelHWLQAnswerCreate: (state, action) => {
      state.HWLQuestionsAnswerCreateShow = false
    },
    createHWLQAnswerInp: (state, action) => {
      state.createHWLQAnswerInpValue = action.payload
    },
    // ---- HW LISTENING QUESTIONS  VIEW 
    HWLQuestionsAnswerView: (state, action) => {
      state.HWLQuestionsAnswerViewShow = true
      state.HWListeningQuestionsShow = false
      state.listeningquestionsObj = action.payload
    },
    cancelHWLQAnswers: (state,action) =>{
      state.HWLQuestionsAnswerViewShow = false
      state.HWListeningQuestionsShow = true

    },
    // ---- HW LISTENING QUESTIONS UPDATE  

    HWLQuestionsAnswerUpdate: (state,action) =>{
      console.log(action.payload);
      state.HWLQuestionsUpdateShow = true
      state.listeningquestionsObj = action.payload
      state.updateHWLQuestionValue = action.payload.question
      state.updateHWLQuestionNumberValue = action.payload.value
    },
    cancelHWLQuestionUpdate: (state,action) =>{
      state.HWLQuestionsUpdateShow = false
    },
    updateHWLQuestionInp: (state,action) =>{
      state.updateHWLQuestionValue = action.payload
    },
    updateHWLQuestionInpNumber: (state,action) =>{
      state.updateHWLQuestionNumberValue = action.payload
    },
    // ---- HW LISTENING QUESTION ANSWERS UPDATE  

    HWLQAnswerUpdate: (state,action) =>{
      state.HWLQAnswerUpdateShow = true
      state.listeningquestionanswersObj = action.payload
      state.updateHWLQAnswerInpValue = action.payload.answer
      state.CheckedStatus = action.payload.is_true
    },
    cancelHWLQAnswerUpdate: (state,action) =>{
      state.HWLQAnswerUpdateShow = false
    },
    updateHWLQAnswerInp: (state,action) =>{
      state.updateHWLQAnswerInpValue = action.payload
    },
    checkedStatus: (state,action) =>{
      state.CheckedStatus = action.payload
    },
    readingCreate: (state,action) =>{
      state.HWReadingCreateShow = true
      state.HWListeningsObj = action.payload
    },
    cancelHWReadingCreate: (state,action) =>{
      state.HWReadingCreateShow = false
    },
    createHWReadingInp: (state,action) =>{
      state.createHWReadingInpValue = action.payload
    },
    createHWReadingText: (state,action) =>{
      state.createHWReadingTextValue = action.payload
    },
    createHWReadingMax: (state,action) =>{
      state.createHWReadingMaxValue = action.payload
    },

    // HW READING ANSWER CREATE 
    HWStartReadingACreate: (state,action) =>{
      state.HWReadingObj = action.payload
      console.log(action.payload);
      state.HWReadingACreateShow = true
    },
    cancelHWReadingACreate: (state,action) =>{
      state.HWReadingACreateShow = false
    },
    createHWReadingACreateInp: (state,action) =>{
      state.createHWReadingACreateInpValue = action.payload
    },
    createHWReadingACreateInpNumber: (state,action)=>{
      state.createHWReadingACreateNumberValue = action.payload
    }
  },
});

export const Data = MainSlice.reducer;
export const {
  getUserData,
  getAdminCoursesData,
  getStudentCoursesData,
  getAccountsArrData,
  courseCreate,
  updateCourse,
  updateCourseInp,
  updateSelected,
  cancelBtnCourse,
  viewCourse,
  unitsData,
  updateUnit,
  cancelBtnUnitUpdate,
  unitUpdateNameInp,
  unitUpdateAboutInp,
  createUnit,
  cancelBtnUnitCreate,
  createUnitNameInp,
  createUnitAboutInp,
  viewUnit,
  backToModalView,
  getHomeWorkCardsData,
  getMyHomeWorkCardsData,
  updateHomeWork,
  cancelBtnHomeWorkUpdate,
  updateHomeWorkInp,
  createHomeWork,
  cancelBtnHomeWorkCreate,
  createHomeWorkInp,
  createHomeWorkSelect,
  updateHomeWorkSelect,
  startHomeWork,
  cancelHWListenings,
  HWStartListeningView,
  cancelHWListeningQuestions,
  HWStartListeningQCreate,
  cancelHWListeningQCreate,
  createHWListeningQCreateInp,
  createHWListeningQCreateInpNumber,
  listeningCreate,
  cancelHWListeningCreate,
  createHWListeningInp,
  // createHWListeningAudio,
  createHWListeningMax,
  HWStartListeningUpdate,
  updateHWListeningInp,
  updateHWListeningMax,
  cancelHWListeningUpdate,
  updateHWListeningAudio,
  HWLQuestionsAnswerCreate,
  HWLQuestionsAnswerView,
  cancelHWLQAnswerCreate,
  createHWLQAnswerInp,
  cancelHWLQAnswers,
  HWLQuestionsAnswerUpdate,
  cancelHWLQuestionUpdate,
  updateHWLQuestionInp,
  updateHWLQuestionInpNumber,
  HWLQAnswerUpdate,
  cancelHWLQAnswerUpdate,
  updateHWLQAnswerInp,
  checkedStatus,
  readingCreate,
  cancelHWReadingCreate,
  createHWReadingInp,
  createHWReadingText,
  createHWReadingMax,
  HWStartReadingACreate,
  cancelHWReadingACreate,
  createHWReadingACreateInpNumber,
  createHWReadingACreateInp,
  getAdminGroupsData,
  getStudentGroupsData
} = MainSlice.actions;
