import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationForm from "../components/ApplicationForm";

function CDCDashboard() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔥 Load jobs + dashboard data
  useEffect(() => {
    axios.get("http://localhost:8080/cdc/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/cdc/dashboard")
      .then(res => setDashboard(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 View applicants
  const handleViewApplicants = (jobId) => {
    setSelectedJob(jobId);

    axios.get(`http://localhost:8080/cdc/jobs/${jobId}/applications`)
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  };

  // 🔥 View full application
  const handleViewProfile = (appId) => {
    axios.get(`http://localhost:8080/cdc/application/${appId}`)
      .then(res => {
        setProfile(res.data);
        setShowForm(true);
      })
      .catch(err => console.error(err));
  };

  // ================= JOBS VIEW =================
  if (!selectedJob) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>CDC Dashboard</h2>

        {/* 🔥 SUMMARY CARDS */}
        {dashboard && (
          <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}>

            <div style={styles.cardBox}>
              <h3>Total Students</h3>
              <p>{dashboard.totalStudents}</p>
            </div>

            <div style={styles.cardBox}>
              <h3>Total Jobs</h3>
              <p>{dashboard.totalJobs}</p>
            </div>

            <div style={styles.cardBox}>
              <h3>Placed Students</h3>
              <p>{dashboard.placedStudents}</p>
            </div>

            <div style={styles.cardBox}>
              <h3>Placement %</h3>
              <p>{dashboard.placementPercentage.toFixed(2)}%</p>
            </div>

          </div>
        )}

        {/* 🔥 AVAILABLE JOBS HEADING */}
        <h3 style={{ marginTop: "20px" }}>Available Jobs</h3>

        {/* 🔥 JOB LIST */}
        {jobs.map(job => (
          <div key={job.jobId} style={styles.card}>

            <div style={styles.jobHeader}>
              <h3>{job.companyName}</h3>
              <p><b>Role:</b> {job.jobTitle}</p>
              <p><b>Package:</b> ₹{job.salary}</p>
            </div>

            <button onClick={() => handleViewApplicants(job.jobId)}>
              Applied Students ({job.appliedCount})
            </button>

          </div>
        ))}
      </div>
    );
  }

  // ================= APPLICANTS VIEW =================
  return (
    <div style={{ padding: "20px" }}>
      <h2>Applicants</h2>

      <button onClick={() => setSelectedJob(null)}>⬅ Back</button>

      {applications.map(app => (
        <div key={app.applicationId} style={styles.card}>
          <p><b>{app.studentName}</b></p>
          <p>Status: {app.status}</p>

          <button onClick={() => handleViewProfile(app.applicationId)}>
            View Application
          </button>
        </div>
      ))}

      {/* 🔥 POPUP FORM */}
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

const styles = {
  card: {
    border: "1px solid gray",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px"
  },

  cardBox: {
    border: "1px solid gray",
    padding: "15px",
    borderRadius: "10px",
    width: "180px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  jobHeader: {
    marginBottom: "10px"
  }
};

export default CDCDashboard;