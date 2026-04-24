import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {

  // 🔥 FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "RECRUITER",
    placementStatus: "ACTIVE"
  });

  // 🔥 USERS LIST
  const [users, setUsers] = useState([]);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 CREATE USER
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/admin/create-user",
        formData
      );

      alert("✅ User created");

      // clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "RECRUITER",
        placementStatus: "ACTIVE"
      });

      fetchUsers(); // 🔥 refresh list

    } catch (err) {
      console.error(err);
      alert("❌ Error creating user");
    }
  };

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 LOAD USERS ON PAGE LOAD
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${id}`);
      fetchUsers(); // refresh after delete
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting user");
    }
  };

  return (
    <div style={styles.container}>
      <h1>👑 Admin Dashboard</h1>

      {/* 🔥 CREATE USER FORM */}
      <div style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="RECRUITER">Recruiter</option>
          <option value="CDC">CDC</option>
          <option value="DEPARTMENT">Department</option>
        </select>

        <button onClick={handleSubmit}>Create User</button>
      </div>

      {/* 🔥 USERS LIST */}
      <h2>📋 All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={styles.card}>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>

            <button onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// 🎨 SIMPLE STYLES
const styles = {
  container: {
    textAlign: "center",
    padding: "20px"
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
    margin: "auto"
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "8px"
  }
};

export default AdminDashboard;