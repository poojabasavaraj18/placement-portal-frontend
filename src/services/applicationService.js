import axios from "axios";

const API = "http://localhost:8080/applications";

const AUTH = {
  username: "admin",
  password: "admin123",
};
export const getApplicationsByJob = (jobId) => {
  return axios.get(`${API}/job/${jobId}`, {
    auth: AUTH,
  });
};

export const applyToJob = (data) => {
  return axios.post(`${API}/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    auth: AUTH,
  });
};

export const getApplicationsByStudent = (studentId) => {
  return axios.get(`${API}/student/${studentId}`, {
    auth: AUTH,
  });
};