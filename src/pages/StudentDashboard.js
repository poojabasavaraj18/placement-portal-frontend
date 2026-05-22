

import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";

import "./ModernDashboard.css";

import {
  getJobs
} from "../services/jobService";

import {
  getApplicationsByStudent
} from "../services/applicationService";

import ApplicationForm
  from "../components/ApplicationForm";

import {
  FaBell,
  FaUserCircle,
  FaBriefcase,
  FaClipboardList,
  FaSignOutAlt,
  
  FaBuilding,
  FaMoneyBillWave
} from "react-icons/fa";

function StudentDashboard() {

  const [jobs, setJobs] =
    useState([]);

  const [applications,
    setApplications] =
    useState([]);

  const [announcements,
    setAnnouncements] =
    useState([]);

  const [selectedJob,
    setSelectedJob] =
    useState(null);

  const [activeSection,
    setActiveSection] =
    useState("dashboard");

  const student =
    JSON.parse(
      localStorage.getItem("user")
    );

  const studentId =
    student?.id;

  // FETCH DATA
  const fetchData =
    useCallback(() => {

    getJobs()
      .then((res) =>
        setJobs(res.data)
      )
      .catch((err) =>
        console.error(err)
      );

    if (studentId) {

      getApplicationsByStudent(
        studentId
      )
        .then((res) => {

          const data =
            res.data.content
            || res.data
            || [];

          setApplications(data);

        })
        .catch((err) =>
          console.error(err)
        );

    }

  }, [studentId]);

  // LOAD
  useEffect(() => {

    fetchData();

    axios
      .get(
        "http://localhost:8080/cdc/announcements/STUDENT"
      )
      .then((res) =>
        setAnnouncements(res.data)
      )
      .catch((err) =>
        console.error(err)
      );

  }, [fetchData]);

  // APPLIED JOBS
  const appliedTitles =
    applications.map((app) =>
      app.jobTitle
        ?.toLowerCase()
        .trim()
    );

  // AVAILABLE JOBS
  const availableJobs =
    jobs.filter(
      (job) =>
        !appliedTitles.includes(
          job.title
            ?.toLowerCase()
            .trim()
        )
    );

  // LOGOUT
  const handleLogout =
    () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div>

          <h2 className="logo">
            Student Portal
          </h2>

          <div className="menu">

            {/* DASHBOARD */}
            <div
              className={`menu-item ${
                activeSection ===
                "dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "dashboard"
                )
              }
            >

              <FaBriefcase />

              <span>
                Dashboard
              </span>

            </div>

            {/* AVAILABLE JOBS */}
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

              <FaBriefcase />

              <span>
                Apply Jobs
              </span>

            </div>

            {/* APPLIED JOBS */}
            <div
              className={`menu-item ${
                activeSection ===
                "applied"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  "applied"
                )
              }
            >

              <FaClipboardList />

              <span>
                Applied Jobs
              </span>

            </div>

            {/* ANNOUNCEMENTS */}
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

              <FaBell />

              <span>
                Announcements
              </span>

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
          style={{
            cursor: "pointer"
          }}
        >

          <FaUserCircle
            size={48}
          />

          <div>

            <p style={{
              fontWeight: "700"
            }}>
              {student?.name}
            </p>

            <small>
              Student
            </small>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content fixed-dashboard">

        {/* TOPBAR */}
        <div className="topbar">

          <div className="notification-btn">
            <FaBell />
          </div>

        </div>

        {/* DASHBOARD */}
        {activeSection ===
          "dashboard" && (

          <>

            {/* HERO */}
            <div className="hero-banner">

              <h1>
                Student Dashboard
              </h1>

              <p>
                Explore placement
                opportunities and
                track your applications.
              </p>

            </div>

            <div className="scrollable-content">

              {/* QUICK STATS */}
              <div className="stats-grid">

                <div className="stat-card blue">

                  <FaBriefcase
                    size={28}
                  />

                  <h2>
                    {availableJobs.length}
                  </h2>

                  <p>
                    Available Jobs
                  </p>

                </div>

                <div className="stat-card dark">

                  <FaClipboardList
                    size={28}
                  />

                  <h2>
                    {applications.length}
                  </h2>

                  <p>
                    Applied Jobs
                  </p>

                </div>

                <div className="stat-card green">

                  <FaBell
                    size={28}
                  />

                  <h2>
                    {
                      announcements.length
                    }
                  </h2>

                  <p>
                    Announcements
                  </p>

                </div>

              </div>

            </div>

          </>

        )}

        {/* APPLY JOBS */}
        {activeSection ===
          "jobs" && (

          <div className="section-card">

            <div className="jobs-header">

              <h2 className="section-title">
                Available Jobs
              </h2>

            </div>

            <table className="jobs-table">

              <thead>

                <tr>

                  <th>
                    Company
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Salary
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {availableJobs.map(
                  (job) => (

                  <tr key={job.id}>

                    <td>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>

                        <FaBuilding />

                        {
                          job.companyName
                        }

                      </div>

                    </td>

                    <td>
                      {job.title}
                    </td>

                    <td>

                      <FaMoneyBillWave />

                      {" "}
                      ₹{job.salary}

                    </td>

                    <td>
                      {job.jobType}
                    </td>

                    <td>

                      <button
                        className="view-btn"
                        onClick={() =>
                          setSelectedJob(
                            job
                          )
                        }
                      >

                        Apply

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* APPLIED JOBS */}
        {activeSection ===
          "applied" && (

          <div className="section-card">

            <h2 className="section-title">
              Applied Jobs
            </h2>

            <table className="jobs-table">

              <thead>

                <tr>

                  <th>
                    Company
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {applications.map(
                  (app) => (

                  <tr key={app.id}>

                    <td>
                      {
                        app.companyName
                      }
                    </td>

                    <td>
                      {
                        app.jobTitle
                      }
                    </td>

                    <td>

                      <span
                        style={{
                          fontWeight:
                            "600",
                          color:
                            app.status ===
                            "SELECTED"
                              ? "green"
                              : app.status ===
                                "REJECTED"
                              ? "red"
                              : "#2563eb"
                        }}
                      >

                        {app.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* ANNOUNCEMENTS */}
        {activeSection ===
          "announcements" && (

          <div className="section-card">

            <div className="announcement-header">

              <h2 className="section-title">
                Announcements
              </h2>

            </div>

            {announcements.map(
              (a) => (

              <div
                key={a.id}
                className="announcement-card"
              >

                <div>

                  <p style={{
                    fontWeight: "600"
                  }}>
                    {a.message}
                  </p>

                  <small style={{
                    color: "#64748b"
                  }}>
                    {
                      new Date(
                        a.createdAt
                      ).toLocaleString()
                    }
                  </small>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* PROFILE */}
        {activeSection ===
          "profile" && (

          <div className="section-card">

            <h2 className="section-title">
              Student Profile
            </h2>

            <div className="profile-details">

              <p>

                <b>Name:</b>

                {" "}
                {student?.name}

              </p>

              <p>

                <b>Email:</b>

                {" "}
                {student?.email}

              </p>

              <p>

                <b>Role:</b>

                {" "}
                {student?.role}

              </p>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              {" "}
              Logout

            </button>

          </div>

        )}

      </div>

      {/* APPLICATION FORM */}
      {selectedJob && (

        <ApplicationForm
          job={selectedJob}
          onClose={() =>
            setSelectedJob(null)
          }
          onSuccess={fetchData}
        />

      )}

    </div>

  );

}

export default StudentDashboard;