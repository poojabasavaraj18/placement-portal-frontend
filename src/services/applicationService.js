import axios from "../api/axiosConfig";

// ✅ APPLY WITH FILE UPLOAD (FormData)
export const applyToJob = (formData) => {
  return axios.post("/applications/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    auth: {
      username: "admin",
      password: "admin123",
    },
  });
};

// ✅ GET APPLICATIONS BY STUDENT
export const getApplicationsByStudent = (studentId) => {
  return axios.get(`/applications/student/${studentId}`, {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });
};