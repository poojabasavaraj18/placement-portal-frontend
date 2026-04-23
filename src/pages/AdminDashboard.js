import React, { useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "RECRUITER",
    placementStatus: "ACTIVE"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/admin/create-user",
        formData
      );

      alert("✅ User created");

    } catch (err) {
      console.error(err);
      alert("❌ Error");
    }
  };

  return (
    <div>
      <h1>👑 Admin Dashboard</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />

      <select name="role" onChange={handleChange}>
        <option value="RECRUITER">Recruiter</option>
        <option value="CDC">CDC</option>
        <option value="DEPARTMENT">Department</option>
      </select>

      <button onClick={handleSubmit}>Create User</button>
    </div>
  );
}

export default AdminDashboard;