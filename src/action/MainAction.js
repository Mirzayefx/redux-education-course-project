import axios from "axios";
import { baseUrl } from "../MAIN_API";
import {
  getAccountsArrData,
  getAdminCoursesData,
  getAdminGroupsData,
  // getHWListeningsData,
  getHomeWorkCardsData,
  getMyHomeWorkCardsData,
  getStudentCoursesData,
  getStudentGroupsData,
  getUserData,
} from "../reduxFolder/MainReducer";
import Swal from "sweetalert2";

export const getUser = (email) => async (dispatch) => {
  return await axios
    .get(baseUrl + "account/" + email, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      // console.log(resp.data);
      dispatch(getUserData(resp.data));
    });
};

export const getAdminCourses = () => async (dispatch) => {
  return await axios
    .get(baseUrl + "courses/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      dispatch(getAdminCoursesData(resp.data));
    });
};
export const getStudentCourses = () => async (dispatch) => {
  return await axios
    .get(baseUrl + "mycourses/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      dispatch(getStudentCoursesData(resp.data));
    });
};

// ---

export const getAdminGroups = () => async (dispatch) => {
  return await axios
    .get(baseUrl + "groups/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      dispatch(getAdminGroupsData(resp.data));
    });
};
export const getStudentGroups = () => async (dispatch) => {
  return await axios
    .get(baseUrl + "mygroups/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      dispatch(getStudentGroupsData(resp.data));
    });
};

// ---

export const getDeleteCoursesId = (deleteId) => async (dispatch) => {
  return await axios
    .delete(baseUrl + "course-delete/" + deleteId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      console.log(resp);
      dispatch(getStudentCoursesData(resp.data));
      if (resp.status === 204) {
        Swal.fire({
          title: "Course has been deleted successfully",
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
};

export const getAccountsArr = () => async (dispatch) => {
  return await axios
    .get(baseUrl + "accounts/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((resp) => {
      dispatch(getAccountsArrData(resp.data));
    });
};


// export const deleteUnit = (unitId) => async (dispatch) => {
//   return await axios
//     .delete(baseUrl + "unit-delete/" + unitId, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
//       },
//     })
//     .then((resp) => {
//       console.log(resp);

//       dispatch(getUnitsData(resp.data));
//       if (resp.status === 204) {
//         Swal.fire({
//           title: "Unit has been deleted successfully",
//           icon: "success",
//           confirmButtonText: "Continue",
//         }).then(function () {
//           window.location.href = "/courses";
//         });
//       }
//     })
//     .catch((err) => {
//       Swal.fire({
//         title: "Error!",
//         text: "Unfortunately, something went wrong, please try again",
//         icon: "error",
//         confirmButtonText: "Continue",
//       });
//     });
// };


// HOME WORK JS 

export const getHomeWorkCards = () => async dispatch => {
  return await axios.get(baseUrl + "homeworks/",{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    }
  })
  .then(resp=>{
    dispatch(getHomeWorkCardsData(resp.data))
  })
}

export const getMyHomeWorkCards = () => async dispatch => {
  return await axios.get(baseUrl + "myhomeworks/",{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    }
  })
  .then(resp=>{
    dispatch(getMyHomeWorkCardsData(resp.data))
  })
}

export const deleteHomeWorkCards = (id) => async dispatch=>{
  return await axios.delete(baseUrl + "homework-update-delete/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    }
  })
  .then((resp) => {
    console.log(resp);
    dispatch(getHomeWorkCardsData(resp.data));
    if (resp.status === 204) {
      Swal.fire({
        title: "Homework has been deleted successfully",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(function () {
        window.location.href = "/homework";
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

// export const createHWListeningPost = () => async dispatch=>{
//   return await axios.post(baseUrl + 'listening-create/',{
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
//     }
//   })
//   .then(resp=>{
//     console.log(resp);
//   })
// }

