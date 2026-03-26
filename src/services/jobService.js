import axios from "../api/axiosConfig";

export const getJobs = () => {
  return axios.get("/jobposts", {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });
};