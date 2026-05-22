

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { getApplicationsByJob } from "../services/applicationService";
// import "./RecruiterDashboard.css";
import "./ModernDashboard.css";

const API = "http://localhost:8080/jobposts";

const AUTH = {
  username: "admin",
  password: "admin123",
};

function RecruiterDashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);

  const [announcements,
    setAnnouncements] = useState([]);

  const [activeSection,
    setActiveSection] =
    useState("addjob");

  const [formData, setFormData] =
    useState({
      title: "",
      companyName: "",
      companyDescription: "",
      location: "",
      salary: "",
      jobType: "",
      bond: "",
      skillsRequired: "",
      minCgpa: "",
      experienceRequired: "",
      jobDescription: "",
      responsibilities: "",
      eligibilityCriteria: "",
      deadline: "",
      openings: "",
    });

  useEffect(() => {

    fetchJobs();

    axios
      .get(
        "http://localhost:8080/cdc/announcements/RECRUITER"
      )
      .then((res) =>
        setAnnouncements(res.data)
      )
      .catch((err) =>
        console.error(err)
      );

  }, []);

  const fetchJobs = () => {

    axios
      .get(API, { auth: AUTH })
      .then((res) =>
        setJobs(res.data)
      )
      .catch((err) =>
        console.error(err)
      );

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = () => {

    if (
      !formData.title ||
      !formData.companyName ||
      !formData.location ||
      !formData.salary ||
      !formData.jobType
    ) {
      alert("Fill required fields!");
      return;
    }

    const data = {
      ...formData,
      salary:
        formData.salary
          ? Number(formData.salary)
          : 0,
      minCgpa:
        formData.minCgpa
          ? Number(formData.minCgpa)
          : 0,
      openings:
        formData.openings
          ? Number(formData.openings)
          : 0,
    };

    axios
      .post(API, data, {
        auth: AUTH,
      })
      .then(() => {

        alert("✅ Job Posted!");

        setFormData({
          title: "",
          companyName: "",
          companyDescription: "",
          location: "",
          salary: "",
          jobType: "",
          bond: "",
          skillsRequired: "",
          minCgpa: "",
          experienceRequired: "",
          jobDescription: "",
          responsibilities: "",
          eligibilityCriteria: "",
          deadline: "",
          openings: "",
        });

        fetchJobs();

      })
      .catch((err) => {

        console.error(err);

        alert("❌ Error posting job");

      });

  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div>

          <h2 className="logo">
            Recruiter Portal
          </h2>

          <div className="menu">

            <div
              className={`menu-item ${
                activeSection ===
                "addjob"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "addjob"
                )
              }
            >
              Add Job
            </div>

            <div
              className={`menu-item ${
                activeSection ===
                "jobs"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "jobs"
                )
              }
            >
              Posted Jobs
            </div>

            <div
              className={`menu-item ${
                activeSection ===
                "announcements"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "announcements"
                )
              }
            >
              Announcements
            </div>

            <div
              className={`menu-item ${
                activeSection ===
                "profile"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "profile"
                )
              }
            >
              Profile
            </div>

          </div>

        </div>

        {/* PROFILE */}

        <div
          className="profile-box"
          onClick={() =>
            setActiveSection(
              "profile"
            )
          }
        >

          <div className="profile-avatar">
            {user?.name
              ?.charAt(0)}
          </div>

          <div>

            <p>
              {user?.name ||
                "Recruiter"}
            </p>

            <small>
              {user?.email}
            </small>

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="main-content">

        <div className="hero-banner">

          <h1>
            Recruiter Dashboard
          </h1>

          <p>
            Manage jobs,
            applicants and
            announcements efficiently.
          </p>

        </div>

        {/* ADD JOB */}

        {activeSection ===
          "addjob" && (

          <div className="section-card">

            <h2 className="section-title">
              Add Job
            </h2>

            <div className="form-grid">

              {Object.keys(
                formData
              ).map((key) => (

                key.includes(
                  "Description"
                ) ||
                key.includes(
                  "responsibilities"
                ) ||
                key.includes(
                  "eligibility"
                )

                ? (

                  <textarea
                    key={key}
                    name={key}
                    placeholder={key}
                    value={
                      formData[key]
                    }
                    onChange={
                      handleChange
                    }
                    className="input-field textarea-field"
                  />

                ) : (

                  <input
                    key={key}
                    name={key}
                    placeholder={key}
                    value={
                      formData[key]
                    }
                    onChange={
                      handleChange
                    }
                    className="input-field"
                  />

                )

              ))}

            </div>

            <button
              onClick={handleSubmit}
              className="primary-btn"
            >
              Post Job
            </button>

          </div>

        )}

        {/* POSTED JOBS */}

        {activeSection ===
          "jobs" && (

          <div className="section-card">

            <h2 className="section-title">
              Posted Jobs
            </h2>

            <div className="job-grid">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="job-card"
                >

                  <h3>
                    {job.title}
                  </h3>

                  <p>
                    {job.companyName}
                  </p>

                  <p>
                    {job.location}
                  </p>

                  <p>
                    ₹{job.salary}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/applicants/${job.id}`
                      )
                    }
                    className="secondary-btn"
                  >
                    View Applicants
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* ANNOUNCEMENTS */}

        {activeSection ===
          "announcements" && (

          <div className="section-card">

            <h2 className="section-title">
              Announcements
            </h2>

            <div className="announcement-list">

              {announcements.length >
              0 ? (

                announcements.map(
                  (a) => (

                    <div
                      key={a.id}
                      className="announcement-card"
                    >

                      <p>
                        {a.message}
                      </p>

                      <small>
                        {new Date(
                          a.createdAt
                        ).toLocaleString()}
                      </small>

                    </div>

                  )
                )

              ) : (

                <p>
                  No announcements
                </p>

              )}

            </div>

          </div>

        )}

        {/* PROFILE */}

        {activeSection ===
          "profile" && (

          <div className="section-card">

            <h2 className="section-title">
              Recruiter Profile
            </h2>

            <div className="profile-details">

              <p>
                <b>Name:</b>
                {" "}
                {user?.name}
              </p>

              <p>
                <b>Email:</b>
                {" "}
                {user?.email}
              </p>

              <p>
                <b>Role:</b>
                {" "}
                {user?.role}
              </p>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default RecruiterDashboard;