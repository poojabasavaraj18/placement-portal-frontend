import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { getApplicationsByStudent } from "../services/applicationService";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const studentId = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));

    getApplicationsByStudent(studentId)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setApplications(res.data);
        } else if (Array.isArray(res.data.content)) {
          setApplications(res.data.content);
        } else {
          setApplications([]);
        }
      })
      .catch((err) => console.error(err));
  };

  const appliedJobIds = (applications || []).map(
    (app) => Number(app.jobPost?.id)
  );

  const appliedJobs = jobs.filter((job) =>
    appliedJobIds.includes(Number(job.id))
  );

  const availableJobs = jobs.filter(
    (job) => !appliedJobIds.includes(Number(job.id))
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Dashboard</h1>

      <section>
        <h2 style={styles.sectionTitle}>Applied Jobs</h2>
        <div style={styles.grid}>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <div key={job.id} style={styles.card}>
                <h3>{job.title}</h3>
                <p><b>Company:</b> {job.company?.name}</p>
                <p><b>Salary:</b> ₹{job.salary}</p>

                <span style={styles.appliedBadge}>Applied</span>
              </div>
            ))
          ) : (
            <p>No applied jobs</p>
          )}
        </div>
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Available Jobs</h2>
        <div style={styles.grid}>
          {availableJobs.length > 0 ? (
            availableJobs.map((job) => (
              <div key={job.id} style={styles.card}>
                <h3>{job.title}</h3>
                <p><b>Company:</b> {job.company?.name}</p>
                <p><b>Salary:</b> ₹{job.salary}</p>

                <button style={styles.applyBtn}>Apply</button>
              </div>
            ))
          ) : (
            <p>No available jobs</p>
          )}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1f2937",
  },
  sectionTitle: {
    marginBottom: "10px",
    color: "#374151",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  appliedBadge: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    borderRadius: "6px",
    fontSize: "12px",
  },
  applyBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default StudentDashboard;