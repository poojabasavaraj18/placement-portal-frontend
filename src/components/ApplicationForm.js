import React, { useState } from "react";
import { applyToJob } from "../services/applicationService";

function ApplicationForm({ job, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    resume: null,
    name: "",
    email: "",
    phone: "",
    cgpa: "",
    skills: "",
    experience: "",
    coverLetter: "",
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF or Word documents are allowed!");
        return;
      }

      setFormData({
        ...formData,
        resume: file,
      });

      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.resume ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.cgpa ||
      !formData.coverLetter
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const data = new FormData();
    data.append("studentId", 1);
    data.append("jobId", job.id);
    data.append("resume", formData.resume);

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cgpa", formData.cgpa);
    data.append("skills", formData.skills);
    data.append("experience", formData.experience);
    data.append("coverLetter", formData.coverLetter);

    applyToJob(data)
      .then(() => {
        alert("Application submitted successfully!");
        onSuccess(job.id);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting application");
      });
  };

  return (
    <div style={styles.container}>
      <h2>Apply for {job.title}</h2>
      <p><b>Company:</b> {job.company?.name}</p>

      {/* 📄 Resume Upload */}
      <label><b>Upload Resume (PDF/DOC) *</b></label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={styles.input}
      />

      {fileName && <p style={{ fontSize: "12px" }}>Selected: {fileName}</p>}

      {/* 👤 Basic Details */}
      <input name="name" placeholder="Full Name *" onChange={handleChange} style={styles.input} />
      <input name="email" placeholder="Email *" onChange={handleChange} style={styles.input} />
      <input name="phone" placeholder="Phone *" onChange={handleChange} style={styles.input} />
      <input name="cgpa" placeholder="CGPA *" onChange={handleChange} style={styles.input} />

      {/* 💼 Extra Info */}
      <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} style={styles.input} />
      <input name="experience" placeholder="Experience (optional)" onChange={handleChange} style={styles.input} />

      {/* 💬 Cover Letter */}
      <textarea
        name="coverLetter"
        placeholder="Why do you want this job? *"
        onChange={handleChange}
        style={styles.textarea}
      />

      {/* 🔘 Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit} style={styles.submit}>
          Submit Application
        </button>

        <button onClick={onClose} style={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: "2px solid #ccc",
    padding: "20px",
    marginTop: "10px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "8px 0",
    padding: "8px",
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "80px",
    margin: "8px 0",
    padding: "8px",
  },
  submit: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 15px",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
  },
  cancel: {
    backgroundColor: "gray",
    color: "white",
    padding: "8px 15px",
    border: "none",
    cursor: "pointer",
  },
};

export default ApplicationForm;