// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/jobposts";

// const AUTH = {
//   username: "admin",
//   password: "admin123",
// };

// function RecruiterDashboard() {
//   const [jobs, setJobs] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     companyName: "",
//     companyDescription: "",
//     location: "",
//     salary: "",
//     jobType: "",
//     bond: "",
//     skillsRequired: "",
//     minCgpa: "",
//     experienceRequired: "",
//     jobDescription: "",
//     responsibilities: "",
//     eligibilityCriteria: "",
//     deadline: "",
//     openings: "",
//   });

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = () => {
//     axios
//       .get(API, { auth: AUTH })
//       .then((res) => setJobs(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = () => {
//     const data = {
//       ...formData,
//       salary: Number(formData.salary),
//       minCgpa: Number(formData.minCgpa),
//       openings: Number(formData.openings),
//     };

//     axios
//       .post(API, data, { auth: AUTH })
//       .then(() => {
//         alert("✅ Job Posted!");

//         setFormData({
//           title: "",
//           companyName: "",
//           companyDescription: "",
//           location: "",
//           salary: "",
//           jobType: "",
//           bond: "",
//           skillsRequired: "",
//           minCgpa: "",
//           experienceRequired: "",
//           jobDescription: "",
//           responsibilities: "",
//           eligibilityCriteria: "",
//           deadline: "",
//           openings: "",
//         });

//         fetchJobs();
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("❌ Error posting job");
//       });
//   };

//   return (
//     <div style={styles.container}>
//       <h1>💼 Recruiter Dashboard</h1>

//       {/* 🔥 ADD JOB FORM */}
//       <div style={styles.form}>
//         <h2>Add Job</h2>

//         <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
//         <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
//         <input name="companyDescription" placeholder="Company Description" value={formData.companyDescription} onChange={handleChange} />
//         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />

//         <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
//         <input name="jobType" placeholder="Job Type" value={formData.jobType} onChange={handleChange} />
//         <input name="bond" placeholder="Bond Details" value={formData.bond} onChange={handleChange} />

//         <input name="skillsRequired" placeholder="Skills Required" value={formData.skillsRequired} onChange={handleChange} />
//         <input name="minCgpa" placeholder="Minimum CGPA" value={formData.minCgpa} onChange={handleChange} />
//         <input name="experienceRequired" placeholder="Experience Required" value={formData.experienceRequired} onChange={handleChange} />

//         <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} />
//         <textarea name="responsibilities" placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} />
//         <textarea name="eligibilityCriteria" placeholder="Eligibility Criteria" value={formData.eligibilityCriteria} onChange={handleChange} />

//         <input name="deadline" placeholder="Deadline (YYYY-MM-DD)" value={formData.deadline} onChange={handleChange} />
//         <input name="openings" placeholder="Openings" value={formData.openings} onChange={handleChange} />

//         <button onClick={handleSubmit}>Post Job</button>
//       </div>

//       {/* 🔥 VIEW JOBS */}
//       <div>
//         <h2>Posted Jobs</h2>

//         {jobs.map((job) => (
//           <div key={job.id} style={styles.card}>
//             <h3>{job.title}</h3>

//             <p><b>Company:</b> {job.companyName}</p>
//             <p><b>Location:</b> {job.location}</p>
//             <p><b>Salary:</b> ₹{job.salary}</p>
//             <p><b>Type:</b> {job.jobType}</p>
//             <p><b>Skills:</b> {job.skillsRequired}</p>
//             <p><b>CGPA:</b> {job.minCgpa}</p>
//             <p><b>Deadline:</b> {job.deadline}</p>
//             <p><b>Openings:</b> {job.openings}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "900px",
//     margin: "auto",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     marginBottom: "30px",
//   },
//   card: {
//     border: "1px solid #ddd",
//     padding: "15px",
//     margin: "10px 0",
//     borderRadius: "8px",
//     background: "#fff",
//   },
// };

// export default RecruiterDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApplicationsByJob } from "../services/applicationService";

const API = "http://localhost:8080/jobposts";

const AUTH = {
  username: "admin",
  password: "admin123",
};

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const [formData, setFormData] = useState({
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
  }, []);

  const fetchJobs = () => {
    axios
      .get(API, { auth: AUTH })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      salary: formData.salary ? Number(formData.salary) : 0,
      minCgpa: formData.minCgpa ? Number(formData.minCgpa) : 0,
      openings: formData.openings ? Number(formData.openings) : 0,
    };

    axios
      .post(API, data, { auth: AUTH })
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

  // 🔥 VIEW APPLICANTS
  const viewApplicants = (jobId) => {
    setSelectedJob(jobId);

    getApplicationsByJob(jobId)
      .then((res) => {
        console.log("Applicants:", res.data);
        setApplicants(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={styles.container}>
      <h1>💼 Recruiter Dashboard</h1>

      {/* 🔥 ADD JOB FORM */}
      <div style={styles.form}>
        <h2>Add Job</h2>

        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
        <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
        <input name="companyDescription" placeholder="Company Description" value={formData.companyDescription} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />

        <input name="salary" placeholder="Salary (numbers only)" value={formData.salary} onChange={handleChange} />
        <input name="jobType" placeholder="Job Type" value={formData.jobType} onChange={handleChange} />
        <input name="bond" placeholder="Bond Details" value={formData.bond} onChange={handleChange} />

        <input name="skillsRequired" placeholder="Skills Required" value={formData.skillsRequired} onChange={handleChange} />
        <input name="minCgpa" placeholder="Minimum CGPA" value={formData.minCgpa} onChange={handleChange} />
        <input name="experienceRequired" placeholder="Experience Required" value={formData.experienceRequired} onChange={handleChange} />

        <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} />
        <textarea name="responsibilities" placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} />
        <textarea name="eligibilityCriteria" placeholder="Eligibility Criteria" value={formData.eligibilityCriteria} onChange={handleChange} />

        <input name="deadline" placeholder="Deadline (YYYY-MM-DD)" value={formData.deadline} onChange={handleChange} />
        <input name="openings" placeholder="Openings" value={formData.openings} onChange={handleChange} />

        <button onClick={handleSubmit}>Post Job</button>
      </div>

      {/* 🔥 JOB LIST */}
      <div>
        <h2>Posted Jobs</h2>

        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h3>{job.title}</h3>

            <p><b>Company:</b> {job.companyName}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Salary:</b> ₹{job.salary}</p>
            <p><b>Type:</b> {job.jobType}</p>
            <p><b>Skills:</b> {job.skillsRequired}</p>

            <button onClick={() => viewApplicants(job.id)}>
              View Applicants
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 APPLICANTS SECTION */}
      {selectedJob && (
        <div style={{ marginTop: "30px" }}>
          <h2>Applicants</h2>

          {applicants.length > 0 ? (
            applicants.map((app) => (
              <div key={app.id} style={styles.card}>
                <h3>👨‍🎓 {app.name}</h3>

                <p><b>Email:</b> {app.email}</p>
                <p><b>Phone:</b> {app.phone}</p>
                <p><b>CGPA:</b> {app.cgpa}</p>

                <p><b>Skills:</b> {app.skills}</p>
                <p><b>Experience:</b> {app.experience}</p>

                <p><b>Cover Letter:</b></p>
                <p>{app.coverLetter}</p>

                <a
                  // href={`http://localhost:8080/${app.resumePath}`}
                  href={`http://localhost:8080/files/${app.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 View Resume
                </a>

                <p><b>Status:</b> {app.status}</p>
              </div>
            ))
          ) : (
            <p>No applicants yet</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    background: "#fff",
  },
};

export default RecruiterDashboard;