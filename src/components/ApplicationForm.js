import React, { useState, useEffect } from "react";
import { applyToJob } from "../services/applicationService";

function ApplicationForm({ job, onClose, onSuccess, viewMode = false, data }) {

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

  // 🔥 Prefill when in view mode
  useEffect(() => {
    if (viewMode && data) {
      setFormData({
        resume: null,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        cgpa: data.cgpa || "",
        skills: data.skills || "",
        experience: data.experience || "",
        coverLetter: data.coverLetter || "",
      });
    }
  }, [viewMode, data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (viewMode) return;

    if (!formData.resume || !formData.name || !formData.email) {
      alert("Fill required fields!");
      return;
    }

    if (isNaN(formData.cgpa)) {
      alert("Enter valid CGPA");
      return;
    }

    const form = new FormData();
    form.append("studentId", 1);
    form.append("jobId", job.id);
    form.append("resume", formData.resume);

    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("cgpa", parseFloat(formData.cgpa));

    form.append("skills", formData.skills);
    form.append("experience", formData.experience);
    form.append("coverLetter", formData.coverLetter);

    try {
      await applyToJob(form);
      alert("✅ Applied successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error applying");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{viewMode ? "Application Details" : `Apply for ${job.title}`}</h2>

        {!viewMode && <input type="file" onChange={handleFileChange} />}

        <input name="name" value={formData.name} onChange={handleChange} readOnly={viewMode} placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} readOnly={viewMode} placeholder="Email" />
        <input name="phone" value={formData.phone} onChange={handleChange} readOnly={viewMode} placeholder="Phone" />
        <input name="cgpa" value={formData.cgpa} onChange={handleChange} readOnly={viewMode} placeholder="CGPA" />

        <input name="skills" value={formData.skills} onChange={handleChange} readOnly={viewMode} placeholder="Skills" />
        <input name="experience" value={formData.experience} onChange={handleChange} readOnly={viewMode} placeholder="Experience" />

        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          readOnly={viewMode}
          placeholder="Cover Letter"
        />

        {/* 🔥 Resume */}
        {viewMode && data?.resumePath && (
          <a
            href={`http://localhost:8080/files/${data.resumePath}`}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        )}

        {!viewMode && <button onClick={handleSubmit}>Submit</button>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
  },
  modal: {
    background: "white",
    padding: "20px",
    margin: "100px auto",
    width: "300px",
    borderRadius: "10px",
  },
};

export default ApplicationForm;