// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ApplicationForm from "../components/ApplicationForm";

// function CDCDashboard() {

//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [dashboard, setDashboard] = useState(null);

//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // 🔥 NEW FILTER STATE
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   // 🔥 Load jobs + dashboard data
//   useEffect(() => {
//     axios.get("http://localhost:8080/cdc/jobs")
//       .then(res => setJobs(res.data))
//       .catch(err => console.error(err));

//     axios.get("http://localhost:8080/cdc/dashboard")
//       .then(res => setDashboard(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // 🔥 View applicants
//   const handleViewApplicants = (jobId) => {
//     setSelectedJob(jobId);
//     setStatusFilter("ALL"); // reset filter

//     axios.get(`http://localhost:8080/cdc/jobs/${jobId}/applications`)
//       .then(res => setApplications(res.data))
//       .catch(err => console.error(err));
//   };

//   // 🔥 View full application
//   const handleViewProfile = (appId) => {
//     axios.get(`http://localhost:8080/cdc/application/${appId}`)
//       .then(res => {
//         setProfile(res.data);
//         setShowForm(true);
//       })
//       .catch(err => console.error(err));
//   };

//   // ================= JOBS VIEW =================
//   if (!selectedJob) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <h2>CDC Dashboard</h2>

//         {/* 🔥 SUMMARY CARDS */}
//         {dashboard && (
//           <div style={{
//             display: "flex",
//             gap: "20px",
//             marginBottom: "20px",
//             flexWrap: "wrap"
//           }}>
//             <div style={styles.cardBox}>
//               <h3>Total Students</h3>
//               <p>{dashboard.totalStudents}</p>
//             </div>

//             <div style={styles.cardBox}>
//               <h3>Total Jobs</h3>
//               <p>{dashboard.totalJobs}</p>
//             </div>

//             <div style={styles.cardBox}>
//               <h3>Placed Students</h3>
//               <p>{dashboard.placedStudents}</p>
//             </div>

//             <div style={styles.cardBox}>
//               <h3>Placement %</h3>
//               <p>{dashboard.placementPercentage.toFixed(2)}%</p>
//             </div>
//           </div>
//         )}

//         {/* 🔥 JOBS SECTION */}
//         <h3 style={{ marginTop: "20px" }}>Available Jobs</h3>

//         {jobs.map(job => (
//           <div key={job.jobId} style={styles.card}>
//             <div style={styles.jobHeader}>
//               <h3>{job.companyName}</h3>
//               <p><b>Role:</b> {job.jobTitle}</p>
//               <p><b>Package:</b> ₹{job.salary}</p>
//             </div>

//             <button onClick={() => handleViewApplicants(job.jobId)}>
//               Applied Students ({job.appliedCount})
//             </button>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // ================= APPLICANTS VIEW =================
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Applicants</h2>

//       <button onClick={() => setSelectedJob(null)}>⬅ Back</button>
      

//       {/* 🔥 FILTER DROPDOWN */}
//       <div style={{ margin: "15px 0" }}>
//         <label><b>Filter by Status: </b></label>
        
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="ALL">All</option>
//           <option value="APPLIED">Applied</option>
//           <option value="ROUND1">Round 1</option>
//           <option value="ROUND2">Round 2</option>
//           <option value="SELECTED">Selected</option>
//           <option value="REJECTED">Rejected</option>
//         </select>
//       </div>

//       {/* 🔥 FILTERED APPLICATIONS */}
//       {applications
//         .filter(app =>
//           statusFilter === "ALL" || app.status === statusFilter
//         )
//         .map(app => (
//           <div key={app.applicationId} style={styles.card}>
//             <p><b>{app.studentName}</b></p>
//             <p>Status: {app.status}</p>
              
//                 {/* 🔥 ADD THESE 2 LINES */}
//       <p><b>Company:</b> {app.companyName}</p>
//       <p><b>Package:</b> ₹{app.salary}</p> 

//             <button onClick={() => handleViewProfile(app.applicationId)}>
//               View Application
//             </button>
//           </div>
//         ))}

//       {/* 🔥 POPUP FORM */}
//       {showForm && profile && (
//         <ApplicationForm
//           job={profile.jobPost}
//           data={profile}
//           viewMode={true}
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// }

// const styles = {
//   card: {
//     border: "1px solid gray",
//     padding: "15px",
//     margin: "10px",
//     borderRadius: "8px"
//   },

//   cardBox: {
//     border: "1px solid gray",
//     padding: "15px",
//     borderRadius: "10px",
//     width: "180px",
//     textAlign: "center",
//     backgroundColor: "#f5f5f5",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//   },

//   jobHeader: {
//     marginBottom: "10px"
//   }
// };

// export default CDCDashboard;

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

  // 🔥 FILTER
  const [statusFilter, setStatusFilter] = useState("ALL");

  // 🔥 ANNOUNCEMENTS STATE
  const [announcements, setAnnouncements] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [target, setTarget] = useState("STUDENT");

  // 🔥 LOAD DATA
  useEffect(() => {
    axios.get("http://localhost:8080/cdc/jobs")
      .then(res => setJobs(res.data));

    axios.get("http://localhost:8080/cdc/dashboard")
      .then(res => setDashboard(res.data));

    axios.get("http://localhost:8080/cdc/announcements")
      .then(res => setAnnouncements(res.data));

  }, []);

  // 🔥 POST ANNOUNCEMENT
  const postAnnouncement = () => {
    if (!newMsg.trim()) return;

    axios.post("http://localhost:8080/cdc/announcements", {
      message: newMsg,
      target: target,
      createdBy: "CDC"
    }).then(() => {
      setNewMsg("");

      return axios.get("http://localhost:8080/cdc/announcements");
    }).then(res => setAnnouncements(res.data));
  };

  // 🔥 VIEW APPLICANTS
  const handleViewApplicants = (jobId) => {
    setSelectedJob(jobId);
    setStatusFilter("ALL");

    axios.get(`http://localhost:8080/cdc/jobs/${jobId}/applications`)
      .then(res => setApplications(res.data));
  };

  // 🔥 VIEW FULL APPLICATION
  const handleViewProfile = (appId) => {
    axios.get(`http://localhost:8080/cdc/application/${appId}`)
      .then(res => {
        setProfile(res.data);
        setShowForm(true);
      });
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

        {/* 🔥 ANNOUNCEMENTS SECTION */}
        <h3>📢 Announcements</h3>

        <div style={{ marginBottom: "15px" }}>
          <input
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Enter announcement"
            style={{ padding: "8px", marginRight: "10px" }}
          />

          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="STUDENT">Students</option>
            <option value="RECRUITER">Recruiters</option>
          </select>

          <button onClick={postAnnouncement}>Post</button>
        </div>

        {announcements.map(a => (
          <div key={a.id} style={styles.card}>
            <p>{a.message}</p>
            <small>{new Date(a.createdAt).toLocaleString()}</small>
            <p><b>Target:</b> {a.target}</p>
          </div>
        ))}

        {/* 🔥 JOBS */}
        <h3 style={{ marginTop: "20px" }}>Available Jobs</h3>

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

      {/* 🔥 FILTER */}
      <div style={{ margin: "15px 0" }}>
        <label><b>Filter by Status: </b></label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="APPLIED">Applied</option>
          <option value="ROUND1">Round 1</option>
          <option value="ROUND2">Round 2</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* 🔥 APPLICATIONS */}
      {applications
        .filter(app =>
          statusFilter === "ALL" || app.status === statusFilter
        )
        .map(app => (
          <div key={app.applicationId} style={styles.card}>
            <p><b>{app.studentName}</b></p>
            <p>Status: {app.status}</p>
            <p><b>Company:</b> {app.companyName}</p>
            <p><b>Package:</b> ₹{app.salary}</p>

            <button onClick={() => handleViewProfile(app.applicationId)}>
              View Application
            </button>
          </div>
        ))}

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