import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { getApplicationsByStudent } from "../services/applicationService";
// import ApplicationForm from "./ApplicationForm";
import ApplicationForm from "../components/ApplicationForm";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

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
        const data = res.data.content || res.data || [];
        setApplications(data);
      })
      .catch((err) => console.error(err));
  };

  const appliedJobIds = applications.map((app) =>
    Number(app.jobPost?.id)
  );

  const appliedJobs = jobs.filter((job) =>
    appliedJobIds.includes(Number(job.id))
  );

  const availableJobs = jobs.filter(
    (job) => !appliedJobIds.includes(Number(job.id))
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎓 Student Dashboard</h1>

      {/* ✅ Applied Jobs */}
      <section>
        <h2>Applied Jobs</h2>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div key={job.id} style={styles.card}>
              <h3>{job.title}</h3>
              <p>{job.company?.name}</p>
              <span style={styles.applied}>Applied ✅</span>
            </div>
          ))
        ) : (
          <p>No applied jobs</p>
        )}
      </section>

      {/* ✅ Available Jobs */}
      <section>
        <h2>Available Jobs</h2>
        {availableJobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.company?.name}</p>

            <button
              style={styles.button}
              onClick={() => setSelectedJob(job)}
            >
              Apply
            </button>
          </div>
        ))}
      </section>

      {/* ✅ FORM POPUP */}
      {selectedJob && (
        <ApplicationForm
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", maxWidth: "900px", margin: "auto" },
  heading: { textAlign: "center" },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
  button: {
    background: "#2563eb",
    color: "white",
    padding: "8px",
    border: "none",
    cursor: "pointer",
  },
  applied: {
    color: "green",
    fontWeight: "bold",
  },
};

export default StudentDashboard;