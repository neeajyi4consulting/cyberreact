import http from "./httpServices";
import API_PATH from "./config";
import { getJWT } from "../utils/storage";

export async function getAndSetJwt() {
  http.setJwt(getJWT());
}
const apiToken =
  "Basic Y3liZXJmcmF0OjAyNjg2NjMyNmE5ZDFkMmIyMzIyNmU0ZTg5MjkxOTJn";
export async function loginUser(data) {
  return http.post(API_PATH.apiUserLogin, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getUserDetails(userID) {
  return http.get(API_PATH.apiGetUserDetails + userID, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function editUserDetails(data) {
  return http.post(API_PATH.apiEditUserDetails, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function changePassword(data) {
  return http.post(API_PATH.apiChangePassword, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// Category API Starts Here
export async function addCategory(data) {
  return http.post(API_PATH.apiAddCategory, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function getCategory() {
  return http.get(API_PATH.apiGetCategory, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function editCategory(data) {
  return http.post(API_PATH.apiEditCategory, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function deleteCategory(id) {
  return http.delete(API_PATH.apiDeleteCategory + id, {
    headers: {
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

//Course API Starts here
export async function addCourse(data) {
  return http.post(API_PATH.apiAddCourse, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getCourse() {
  return http.get(API_PATH.apiGetCourse, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function getCourseDetails(courseId) {
  return http.get(API_PATH.apiCourseDetails + courseId, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function editCourse(data) {
  return http.post(API_PATH.apiEditCourse, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function deleteCourse(id) {
  return http.delete(API_PATH.apiDeleteCourse + id, {
    headers: {
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// Chapter API starts here
export async function getChapter(id) {
  return http.get(API_PATH.apiGetChapter + id, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function addChapter(data) {
  return http.post(API_PATH.apitAddChapter, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editChapter(data) {
  return http.post(API_PATH.apiEditChatper, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function deleteChapter(id) {
  return http.delete(API_PATH.apiDeleteChapter + id, {
    headers: {
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// user api starts here

export async function getUsersList() {
  return http.get(API_PATH.apiGetUsersList, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function addUser(data) {
  return http.post(API_PATH.apiAddUsers, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editUser(data) {
  return http.post(API_PATH.apiEditUsers, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function deleteUser(id) {
  return http.delete(API_PATH.apiDeleteUsers + id, {
    headers: {
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// allot course api starts here

export async function allotCourse(data) {
  return http.post(API_PATH.apiAllotCourse, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// package api starts here

export async function showPackage() {
  return http.get(API_PATH.apiShowPackage, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function showClientPackage(userId) {
  return http.get(API_PATH.apiShowClientPackage + userId, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function addPackage(data) {
  return http.post(API_PATH.apiAddPackage, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function showPackageCourses(data) {
  return http.post(API_PATH.apiGetPackageCourses, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editPackage(data) {
  return http.post(API_PATH.apiEditPackage, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function allotPackage(data) {
  return http.post(API_PATH.apiAllotPackage, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function deletePackage(data) {
  return http.post(API_PATH.apiDeletePackage, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

// quiz api starts here

export async function addQuiz(data) {
  return http.post(API_PATH.apiAddQuiz, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editQuiz(data) {
  return http.post(API_PATH.apiEditQuiz, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getQuiz(id) {
  return http.get(API_PATH.apiGetQuiz + id, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function removeQuiz(data) {
  return http.post(API_PATH.apiRemoveQuiz, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

//// banner api starts here

export async function addBanner(data) {
  return http.post(API_PATH.apiAddBanner, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editBanner(data) {
  return http.post(API_PATH.apiEditBanner, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: apiToken,
    },
  });
}
export async function deleteBanner(data) {
  return http.post(API_PATH.apiDeleteBanner, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getBanner() {
  return http.get(API_PATH.apiGetBanner, {
    headers: {
      Authorization: apiToken,
    },
  });
}

// services api starts here

export async function addService(data) {
  return http.post(API_PATH.apiAddServices, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}
export async function deleteService(data) {
  return http.post(API_PATH.apiDeleteServices, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getService() {
  return http.get(API_PATH.apiGetServices, {
    headers: {
      Authorization: apiToken,
    },
  });
}

// event api starts here

export async function addEvent(data) {
  return http.post(API_PATH.apiAddEvent, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function editEvent(data) {
  return http.post(API_PATH.apiEditEvent, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: apiToken,
    },
  });
}

export async function deleteEvent(data) {
  return http.post(API_PATH.apiDeleteEvent, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      Authorization: apiToken,
    },
  });
}

export async function getEvent() {
  return http.get(API_PATH.apiGetEvent, {
    headers: {
      Authorization: apiToken,
    },
  });
}

export async function getQuery() {
  return http.get(API_PATH.apiGetQuery, {
    headers: {
      Authorization: apiToken,
    },
  });
}
