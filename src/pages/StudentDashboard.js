// import React, { useEffect, useState } from "react";
// import { getJobs } from "../services/jobService";
// import { getApplicationsByStudent } from "../services/applicationService";
// import ApplicationForm from "../components/ApplicationForm";

// function StudentDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const studentId = 1;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     getJobs()
//       .then((res) => setJobs(res.data))
//       .catch((err) => console.error(err));

//     getApplicationsByStudent(studentId)
//       .then((res) => {
//         const data = res.data.content || res.data || [];
//         setApplications(data);
//       })
//       .catch((err) => console.error(err));
//   };

//   // const appliedJobIds = applications.map((app) =>
//   //   Number(app.jobPost?.id)
//   // );

//   // const appliedJobs = jobs.filter((job) =>
//   //   appliedJobIds.includes(Number(job.id))
//   // );
//   const appliedJobs = applications;

// const appliedTitles = applications.map((app) => app.jobTitle);

// const availableJobs = jobs.filter(
//   (job) => !appliedTitles.includes(job.title)
// );

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🎓 Student Dashboard</h1>

//       {/* ✅ Applied Jobs */}
//       {/* <section>
//         <h2>Applied Jobs</h2>
//         {appliedJobs.length > 0 ? (
//           appliedJobs.map((job) => (
//             <div key={job.id} style={styles.card}>
//               <h3>{job.title}</h3>

//               <p><b>Company:</b> {job.companyName}</p>
//               <p><b>Salary:</b> ₹{job.salary}</p>
//               <p><b>Type:</b> {job.jobType}</p>

//               <span style={styles.applied}>Applied ✅</span>
//             </div>
//           ))
//         ) : (
//           <p>No applied jobs</p>
//         )}
//       </section> */}
//       {appliedJobs.length > 0 ? (
//  applications.map((app) => (
//   <div key={app.id} style={styles.card}>
//     <h3>{app.jobTitle}</h3>

//     <p><b>Company:</b> {app.companyName}</p>

//     <p>
//       <b>Status:</b>{" "}
//       <span
//         style={{
//           fontWeight: "bold",
//           color:
//             app.status === "SELECTED"
//               ? "green"
//               : app.status === "REJECTED"
//               ? "red"
//               : app.status === "HR"
//               ? "purple"
//               : app.status === "ROUND2"
//               ? "blue"
//               : "orange",
//         }}
//       >
//         {app.status}
//       </span>
//     </p>
//   </div>
// ))
// ) : (
//   <p>No applied jobs</p>
// )}

//       {/* ✅ Available Jobs */}
//       <section>
//         <h2>Available Jobs</h2>
//         {availableJobs.length > 0 ? (
//           availableJobs.map((job) => (
//             <div key={job.id} style={styles.card}>
//               <h3>{job.title}</h3>

//               <p><b>Company:</b> {job.companyName}</p>
//               <p><b>Salary:</b> ₹{job.salary}</p>
//               <p><b>Type:</b> {job.jobType}</p>
//               <p><b>Location:</b> {job.location}</p>
//               <p><b>Skills:</b> {job.skillsRequired}</p>

//               <button
//                 style={styles.button}
//                 onClick={() => setSelectedJob(job)}
//               >
//                 Apply
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No available jobs</p>
//         )}
//       </section>

//       {/* ✅ Application Form Popup */}
//       {selectedJob && (
//         <ApplicationForm
//           job={selectedJob}
//           onClose={() => setSelectedJob(null)}
//           onSuccess={fetchData}
//         />
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "900px",
//     margin: "auto",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   card: {
//     border: "1px solid #ddd",
//     padding: "15px",
//     margin: "10px 0",
//     borderRadius: "8px",
//     background: "#fff",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//   },
//   button: {
//     background: "#2563eb",
//     color: "white",
//     padding: "8px 12px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   applied: {
//     color: "green",
//     fontWeight: "bold",
//   },
// };

// export default StudentDashboard;


import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getJobs } from "../services/jobService";
import { getApplicationsByStudent } from "../services/applicationService";
import ApplicationForm from "../components/ApplicationForm";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  // 🔥 Logged-in user
  const student = JSON.parse(localStorage.getItem("user"));
  const studentId = student?.id;

  // 🔁 Fetch data
  const fetchData = useCallback(() => {
    getJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));

    if (studentId) {
      getApplicationsByStudent(studentId)
        .then((res) => {
          const data = res.data.content || res.data || [];
          setApplications(data);
        })
        .catch((err) => console.error(err));
    }
  }, [studentId]);

  // 🔁 Load on mount
  useEffect(() => {
    fetchData();

    axios
      .get("http://localhost:8080/cdc/announcements/STUDENT")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error(err));
  }, [fetchData]);

  // ✅ SAFE FIX: normalize titles (prevents mismatch issues)
  const appliedTitles = applications.map((app) =>
    app.jobTitle?.toLowerCase().trim()
  );

  const availableJobs = jobs.filter(
    (job) =>
      !appliedTitles.includes(job.title?.toLowerCase().trim())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎓 Student Dashboard</h1>

      {/* 📢 ANNOUNCEMENTS */}
      <section>
        <h2>📢 Announcements</h2>
        {announcements.length > 0 ? (
          announcements.map((a) => (
            <div key={a.id} style={styles.card}>
              <p>{a.message}</p>
              <small>{new Date(a.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No announcements</p>
        )}
      </section>

      {/* ✅ APPLIED JOBS */}
      <section>
        <h2>Applied Jobs</h2>
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} style={styles.card}>
              <h3>{app.jobTitle}</h3>
              <p><b>Company:</b> {app.companyName}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={getStatusStyle(app.status)}>
                  {app.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>No applied jobs</p>
        )}
      </section>

      {/* ✅ AVAILABLE JOBS */}
      <section>
        <h2>Available Jobs</h2>
        {availableJobs.length > 0 ? (
          availableJobs.map((job) => (
            <div key={job.id} style={styles.card}>
              <h3>{job.title}</h3>

              <p><b>Company:</b> {job.companyName}</p>
              <p><b>Salary:</b> ₹{job.salary}</p>
              <p><b>Type:</b> {job.jobType}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Skills:</b> {job.skillsRequired}</p>

              <button
                style={styles.button}
                onClick={() => setSelectedJob(job)}
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <p>No available jobs</p>
        )}
      </section>

      {/* 📄 APPLICATION FORM */}
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

// 🎨 STATUS COLORS
const getStatusStyle = (status) => {
  switch (status) {
    case "SELECTED":
      return { color: "green", fontWeight: "bold" };
    case "REJECTED":
      return { color: "red", fontWeight: "bold" };
    case "HR":
      return { color: "purple", fontWeight: "bold" };
    case "ROUND2":
      return { color: "blue", fontWeight: "bold" };
    default:
      return { color: "orange", fontWeight: "bold" };
  }
};

// 🎨 STYLES
const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  button: {
    background: "#2563eb",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default StudentDashboard;