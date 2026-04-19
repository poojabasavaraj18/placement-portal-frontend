import React, { useEffect, useState } from "react";
import axios from "axios";

function CDCDashboard() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  // 🔥 Load all jobs
  useEffect(() => {
    axios.get("http://localhost:8080/cdc/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 When "Applied Students" clicked
  const handleViewApplicants = (jobId) => {
    setSelectedJob(jobId);
    setSelectedApp(null);
    setProfile(null);

    axios.get(`http://localhost:8080/cdc/jobs/${jobId}/applications`)
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  };

  // 🔥 When student clicked
  const handleViewProfile = (appId) => {
    setSelectedApp(appId);

    axios.get(`http://localhost:8080/cdc/application/${appId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  };

  // ===========================
  // 🔥 VIEW 1 → JOBS
  // ===========================
  if (!selectedJob) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>CDC Dashboard</h2>

        {jobs.map(job => (
          <div key={job.jobId}
               style={{
                 border: "1px solid gray",
                 padding: "15px",
                 margin: "10px",
                 borderRadius: "8px"
               }}>
               
            <h3>{job.jobTitle}</h3>

            <button onClick={() => handleViewApplicants(job.jobId)}>
              Applied Students ({job.appliedCount})
            </button>

          </div>
        ))}
      </div>
    );
  }

  // ===========================
  // 🔥 VIEW 2 → STUDENTS
  // ===========================
  if (selectedJob && !selectedApp) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Applicants</h2>

        <button onClick={() => setSelectedJob(null)}>⬅ Back</button>

        {applications.map(app => (
          <div key={app.applicationId}
               onClick={() => handleViewProfile(app.applicationId)}
               style={{
                 border: "1px solid gray",
                 padding: "10px",
                 margin: "10px",
                 cursor: "pointer"
               }}>

            <p><b>{app.studentName}</b></p>
            <p>Status: {app.status}</p>

          </div>
        ))}
      </div>
    );
  }

  // ===========================
  // 🔥 VIEW 3 → PROFILE
  // ===========================
  if (selectedApp && profile) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Student Profile</h2>

        <button onClick={() => setSelectedApp(null)}>⬅ Back</button>

        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Phone:</b> {profile.phone}</p>
        <p><b>CGPA:</b> {profile.cgpa}</p>
        <p><b>Skills:</b> {profile.skills}</p>
        <p><b>Status:</b> {profile.status}</p>

        <a
          href={`http://localhost:8080/files/${profile.resumePath}`}
          target="_blank"
          rel="noreferrer"
        >
          View Resume
        </a>
      </div>
    );
  }

}

export default CDCDashboard;