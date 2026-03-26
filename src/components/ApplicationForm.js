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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async () => {
  if (!formData.resume || !formData.name || !formData.email) {
    alert("Fill required fields!");
    return;
  }

  if (isNaN(formData.cgpa)) {
    alert("Enter valid CGPA");
    return;
  }

  const data = new FormData();
  data.append("studentId", 1);
  data.append("jobId", job.id);
  data.append("resume", formData.resume);

  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("cgpa", parseFloat(formData.cgpa)); // ✅ FIX

  data.append("skills", formData.skills);
  data.append("experience", formData.experience);
  data.append("coverLetter", formData.coverLetter);

  try {
    await applyToJob(data);
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
        <h2>Apply for {job.title}</h2>

        <input type="file" onChange={handleFileChange} />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" onChange={handleChange} />

        <input name="skills" placeholder="Skills" onChange={handleChange} />
        <input name="experience" placeholder="Experience" onChange={handleChange} />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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