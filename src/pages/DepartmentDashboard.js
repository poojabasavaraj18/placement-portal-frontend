
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./DepartmentDashboard.css";
import "./ModernDashboard.css";

import {
  FaUsers,
  FaUserCheck,
  FaChartLine,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaBriefcase,
  FaBuilding,
  FaEye
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

function DepartmentDashboard() {

  const [students, setStudents] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios
      .get("http://localhost:8080/department/dashboard")
      .then(res => setDashboard(res.data))
      .catch(err => console.error(err));

    axios
      .get("http://localhost:8080/department/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const analyticsData = [
    {
      name: "Applied",
      value: dashboard?.applied || 0
    },
    {
      name: "Selected",
      value: dashboard?.selected || 0
    },
    {
      name: "Rejected",
      value: dashboard?.rejected || 0
    }
  ];

  const COLORS = [
    "#2563eb",
    "#8b5cf6",
    "#ef4444"
  ];

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div>

          <h2 className="logo">
            Department Portal
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
                activeSection === "students"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection("students")
              }
            >
              <FaUsers />
              <span>Students</span>
            </div>

            <div
              className={`menu-item ${
                activeSection === "analytics"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection("analytics")
              }
            >
              <FaChartLine />
              <span>Analytics</span>
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
              Department Admin
            </p>

            <small>
              Department Coordinator
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
        {activeSection === "dashboard" && (

          <>

            {/* HERO */}
            <div className="hero-banner">

              <h1>
                Department Dashboard
              </h1>

              <p>
                Track department placement
                activities efficiently.
              </p>

            </div>

            <div className="scrollable-content">

              {/* STATS */}
              <div className="stats-grid">

                <div className="stat-card blue">
                  <FaUsers size={28} />

                  <h2>
                    {dashboard?.totalStudents}
                  </h2>

                  <p>Total Students</p>
                </div>

                <div className="stat-card dark">
                  <FaBriefcase size={28} />

                  <h2>
                    {dashboard?.applied}
                  </h2>

                  <p>Applied</p>
                </div>

                <div className="stat-card green">
                  <FaUserCheck size={28} />

                  <h2>
                    {dashboard?.selected}
                  </h2>

                  <p>Selected</p>
                </div>

                <div className="stat-card purple">
                  <FaChartLine size={28} />

                  <h2>
                    {dashboard?.rejected}
                  </h2>

                  <p>Rejected</p>
                </div>

              </div>

              {/* CHARTS */}
              <div className="chart-grid">

                {/* BAR CHART */}
                <div className="chart-card">

                  <h3>
                    Student Analytics
                  </h3>

                  <ResponsiveContainer
                    width="100%"
                    height={220}
                  >

                    <BarChart data={students}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="cgpa"
                        fill="#2563eb"
                        radius={[8,8,0,0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

                {/* PIE CHART */}
                <div className="chart-card">

                  <h3>
                    Placement Status
                  </h3>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={analyticsData}
                        dataKey="value"
                        outerRadius={110}
                        label
                      >

                        {analyticsData.map(
                          (entry,index) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index % COLORS.length
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

        {/* STUDENTS */}
        {activeSection === "students" && (

          <div className="section-card">

            <div className="jobs-header">

              <h2 className="section-title">
                Student Details
              </h2>

            </div>

            <table className="jobs-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>USN</th>
                  <th>Phone</th>
                  <th>CGPA</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {students.map(student => (

                  <tr key={student.id}>

                    <td>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        <FaBuilding />
                        {student.name}
                      </div>

                    </td>

                    <td>{student.usn}</td>

                    <td>{student.phone}</td>

                    <td>{student.cgpa}</td>

                    <td>{student.year}</td>

                    <td>

                      <button className="view-btn">
                        <FaEye />
                        {" "}
                        {student.status}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeSection === "announcements" && (

          <div className="section-card">

            <div className="announcement-header">

              <h2 className="section-title">
                Announcements
              </h2>

            </div>

            <div className="announcement-card">

              <p>
                No announcements available.
              </p>

            </div>

          </div>
        )}

        {/* PROFILE */}
        {activeSection === "profile" && user && (

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
                <b>Password:</b>
                {" "}
                ******
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

export default DepartmentDashboard;