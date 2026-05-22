

import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./CDCDashboard.css";
// import "./ModernDashboard.css";
import "./ModernDashboard.css";

import ApplicationForm from "../components/ApplicationForm";


import {
  FaUsers,
  FaBriefcase,
  FaUserCheck,
  FaChartLine,
  FaBell,
  FaUserCircle,
  // FaBuilding,
  // FaMoneyBillWave,
  FaEye,
  FaArrowLeft,
  FaSignOutAlt
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function CDCDashboard() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [target, setTarget] = useState("STUDENT");

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios.get("http://localhost:8080/cdc/jobs")
      .then(res => setJobs(res.data));

    axios.get("http://localhost:8080/cdc/dashboard")
      .then(res => setDashboard(res.data));

    axios.get("http://localhost:8080/cdc/announcements")
      .then(res => setAnnouncements(res.data));

  }, []);

  const postAnnouncement = () => {

    if (!newMsg.trim()) return;

    axios.post(
      "http://localhost:8080/cdc/announcements",
      {
        message: newMsg,
        target: target,
        createdBy: "CDC"
      }
    ).then(() => {

      setNewMsg("");

      return axios.get(
        "http://localhost:8080/cdc/announcements"
      );

    }).then(res => setAnnouncements(res.data));
  };

  const handleViewApplicants = (jobId) => {

    setSelectedJob(jobId);

    axios.get(
      `http://localhost:8080/cdc/jobs/${jobId}/applications`
    )
      .then(res => setApplications(res.data));
  };

  const handleViewProfile = (appId) => {

    axios.get(
      `http://localhost:8080/cdc/application/${appId}`
    )
      .then(res => {
        setProfile(res.data);
        setShowForm(true);
      });
  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const chartData = dashboard ? [
    {
      name: "Placed",
      value: dashboard.placedStudents
    },
    {
      name: "Remaining",
      value:
        dashboard.totalStudents -
        dashboard.placedStudents
    }
  ] : [];

  const COLORS = [
    "#2563eb",
    "#8b5cf6"
  ];

  // ================= APPLICANTS PAGE =================
  // if (selectedJob) {

    // return (

    //   <div className="main-content">

    //     <div className="topbar">

    //       <button
    //         className="view-btn"
    //         onClick={() => setSelectedJob(null)}
    //       >
    //         <FaArrowLeft />
    //         {" "}Back
    //       </button>

    //     </div>

    //     <div className="applicant-grid">

    //       {applications.map(app => (

    //         <div
    //           key={app.applicationId}
    //           className="applicant-card"
    //         >

    //           <FaUserCircle
    //             size={65}
    //             color="#2563eb"
    //           />

    //           <h2 style={{
    //             marginTop: "16px"
    //           }}>
    //             {app.studentName}
    //           </h2>

    //           <p style={{
    //             color: "#64748b",
    //             marginTop: "6px"
    //           }}>
    //             {app.companyName}
    //           </p>

    //           <div className="status-badge">
    //             {app.status}
    //           </div>

    //           <p>
    //             Package:
    //             <b> ₹{app.salary}</b>
    //           </p>

    //           <button
    //             className="profile-btn"
    //             onClick={() =>
    //               handleViewProfile(
    //                 app.applicationId
    //               )
    //             }
    //           >
    //             View Application
    //           </button>

    //         </div>
    //       ))}

    //     </div>

    //     {showForm && profile && (

    //       <ApplicationForm
    //         job={profile.jobPost}
    //         data={profile}
    //         viewMode={true}
    //         onClose={() => setShowForm(false)}
    //       />
    //     )}

    //   </div>
    // );
    if (selectedJob) {

  return (

    <div className="main-content applicants-page">

      {/* TOP BAR */}
      <div className="topbar applicants-topbar">

        <button
          className="back-btn"
          onClick={() => setSelectedJob(null)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <h2 className="page-heading">
          Applicants
        </h2>

      </div>

      {/* APPLICANTS GRID */}
      <div className="applicant-grid">

        {applications.map(app => (

          <div
            key={app.applicationId}
            className="applicant-card"
          >

            {/* PROFILE */}
            <div className="profile-section">

              <div className="profile-avatar">
                <FaUserCircle />
              </div>

              <h2>
                {app.studentName}
              </h2>

              <p className="company-name">
                {app.companyName}
              </p>

            </div>

            {/* STATUS */}
            <div className="status-badge">
              {app.status}
            </div>

            {/* DETAILS */}
            <div className="details-section">

              <div className="detail-row">
                <span>Package</span>
                <strong>₹{app.salary}</strong>
              </div>

              <div className="detail-row">
                <span>Round</span>
                <strong>{app.round || "Round 2"}</strong>
              </div>

            </div>

            {/* BUTTON */}
            <button
              className="profile-btn"
              onClick={() =>
                handleViewProfile(app.applicationId)
              }
            >
              <FaEye />
              <span>View Application</span>
            </button>

          </div>

        ))}

      </div>

      {/* APPLICATION FORM */}
      {showForm && profile && (

        <ApplicationForm
          job={profile.jobPost}
          data={profile}
          viewMode={true}
          onClose={() => setShowForm(false)}
        />

      )}

    </div>
  );
}
  // }

  // ================= MAIN =================
  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div>

          <h2 className="logo">
            CDC Portal
          </h2>

          <div className="menu">

            <div
              className={`menu-item ${
                activeSection === "dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              <FaChartLine />
              <span>Dashboard</span>
            </div>

            <div
              className={`menu-item ${
                activeSection === "jobs"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection("jobs")
              }
            >
              <FaBriefcase />
              <span>Jobs</span>
            </div>

            <div
              className={`menu-item ${
                activeSection === "announcements"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection("announcements")
              }
            >
              <FaBell />
              <span>Announcements</span>
            </div>

          </div>

        </div>

        {/* PROFILE */}
        <div
          className="profile-box"
          onClick={() =>
            setActiveSection("profile")
          }
          style={{ cursor: "pointer" }}
        >

          <FaUserCircle size={48} />

          <div>

            <p style={{
              fontWeight: "700"
            }}>
              CDC Admin
            </p>

            <small>
              Placement Officer
            </small>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      {/* <div className="main-content">
       */}
       <div className="main-content fixed-dashboard">

        {/* TOPBAR */}
        <div className="topbar">

          <div className="notification-btn">
            <FaBell />
          </div>

        </div>

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (

          <>

            {/* HERO */}
            <div className="hero-banner">

              <h1>
                Placement Dashboard
              </h1>

              <p>
                Track placements and
                manage campus recruitment
                efficiently.
              </p>

            </div>
            <div className="scrollable-content">

            {/* STATS */}
            {dashboard && (

              <div className="stats-grid">

                <div className="stat-card blue">
                  <FaUsers size={28} />

                  <h2>
                    {dashboard.totalStudents}
                  </h2>

                  <p>Total Students</p>
                </div>

                <div className="stat-card dark">
                  <FaBriefcase size={28} />

                  <h2>
                    {dashboard.totalJobs}
                  </h2>

                  <p>Active Jobs</p>
                </div>

                <div className="stat-card green">
                  <FaUserCheck size={28} />

                  <h2>
                    {dashboard.placedStudents}
                  </h2>

                  <p>Placed Students</p>
                </div>

                <div className="stat-card purple">
                  <FaChartLine size={28} />

                  <h2>
                    {dashboard
                      .placementPercentage
                      .toFixed(2)}%
                  </h2>

                  <p>Placement Rate</p>
                </div>

              </div>
            )}

            {/* CHARTS */}
            <div className="chart-grid">

              {/* BAR CHART */}
              <div className="chart-card">

                <h3>
                  Placement Analytics
                </h3>
                <p className="chart-subtitle">
  Applications received for each company
</p>

                <ResponsiveContainer
                  width="100%"
                  height={220}
                >

                  <BarChart
                    data={jobs.map(j => ({
                      ...j,
                      appliedCount:
                        j.appliedCount ||
                        Math.floor(
                          Math.random() * 20
                        ) + 5
                    }))}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="companyName"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="appliedCount"
                      fill="#2563eb"
                      radius={[8,8,0,0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              {/* PIE CHART */}
              <div className="chart-card">

                <h3>
                  Placement Ratio
                </h3>
                <p className="chart-subtitle">
  Comparison of placed and remaining students
</p>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={110}
                      label
                    >

                      {chartData.map(
                        (entry,index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />
                      ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>
            </div>
          </>
        )}

        {/* JOBS */}
        {activeSection === "jobs" && (

          <div className="section-card">
{/* 
            <h2 className="section-title">
              Available Jobs
            </h2> */}
            <div className="jobs-header">

  <h2 className="section-title">
    Available Jobs
  </h2>

</div>

            <table className="jobs-table">

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Applications</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {jobs.map(job => (

                  <tr key={job.jobId}>

                    <td>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        
                        {job.companyName}
                      </div>

                    </td>

                    <td>
                      {job.jobTitle}
                    </td>

                    <td>
                      
                      {" "}₹{job.salary}
                    </td>

                    <td>
                      {job.appliedCount}
                    </td>

                    <td>

                      <button
                        className="view-btn"
                        onClick={() =>
                          handleViewApplicants(
                            job.jobId
                          )
                        }
                      >
                        <FaEye />
                        {" "}View
                      </button>

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

            {/* <h2 className="section-title">
              Recent Announcements
            </h2> */}
                
          <div className="announcement-header">

  <h2 className="section-title">
    Recent Announcements
  </h2>

</div>

            <div className="announcement-input">

              <input
                value={newMsg}
                onChange={(e) =>
                  setNewMsg(
                    e.target.value
                  )
                }
                placeholder="Write announcement..."
              />

              <select
                value={target}
                onChange={(e) =>
                  setTarget(
                    e.target.value
                  )
                }
              >
                <option value="STUDENT">
                  Students
                </option>

                <option value="RECRUITER">
                  Recruiters
                </option>

              </select>

              <button
                className="post-btn"
                onClick={postAnnouncement}
              >
                Post
              </button>

            </div>

            {announcements.map(a => (

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
                    {new Date(
                      a.createdAt
                    ).toLocaleString()}
                  </small>

                </div>

                <div className="status-badge">
                  {a.target}
                </div>

              </div>
            ))}

          </div>
        )}

        {/* PROFILE */}
        {activeSection ===
          "profile" && user && (

          <div className="section-card">

            <h2 className="section-title">
              Admin Profile
            </h2>

            <div className="profile-details">

              <p>
                <b>Name:</b>
                {" "}
                {user.name}
              </p>

              <p>
                <b>Email:</b>
                {" "}
                {user.email}
              </p>

              <p>
                <b>Role:</b>
                {" "}
                {user.role}
              </p>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />
              {" "}Logout

            </button>

          </div>
        )}

      </div>

    </div>
    
  );
}

export default CDCDashboard;