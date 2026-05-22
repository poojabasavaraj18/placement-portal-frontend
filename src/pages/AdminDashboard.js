

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "RECRUITER",
    placementStatus: "ACTIVE"
  });

  const [users, setUsers] = useState([]);

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

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "RECRUITER",
        placementStatus: "ACTIVE"
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
      alert("❌ Error creating user");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting user");
    }
  };

  return (
    <div style={styles.layout}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin</h2>

        <div
          style={activeTab === "dashboard" ? styles.navItemActive : styles.navItem}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </div>

        <div
          style={activeTab === "users" ? styles.navItemActive : styles.navItem}
          onClick={() => setActiveTab("users")}
        >
          Users
        </div>

        <div
          style={activeTab === "settings" ? styles.navItemActive : styles.navItem}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
        </div>
        <div style={styles.header}>

  <button
    style={styles.backBtn}
    onClick={() => navigate("/login")}
  >
    ← Back
  </button>

  <h1 style={styles.title}>Admin Dashboard</h1>

</div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div style={styles.grid}>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Create User</h2>

              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} />
              <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={styles.input} />
              <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />

              <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                <option value="RECRUITER">Recruiter</option>
                <option value="CDC">CDC</option>
                <option value="DEPARTMENT">Department</option>
              </select>

              <button onClick={handleSubmit} style={styles.primaryBtn}>
                Create User
              </button>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Recent Users</h2>

              {users.length === 0 ? (
                <p style={styles.empty}>No users found</p>
              ) : (
                <div style={styles.userList}>
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} style={styles.userCard}>
                      <div>
                        <p style={styles.name}>{user.name}</p>
                        <p style={styles.meta}>{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>All Users</h2>

            {users.length === 0 ? (
              <p style={styles.empty}>No users found</p>
            ) : (
              <div style={styles.userList}>
                {users.map((user) => (
                  <div key={user.id} style={styles.userCard}>
                    <div>
                      <p style={styles.name}>{user.name}</p>
                      <p style={styles.meta}>{user.email}</p>
                      <p style={styles.role}>{user.role}</p>
                    </div>

                    <button
                      onClick={() => deleteUser(user.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Settings</h2>
            <p style={styles.empty}>Settings UI coming soon...</p>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f7fb"
  },

  sidebar: {
    width: "220px",
    backgroundColor: "#0d47a1",
    color: "#fff",
    padding: "20px"
  },

  logo: {
    marginBottom: "30px"
  },

  navItem: {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    cursor: "pointer",
    opacity: 0.8
  },

  navItemActive: {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    backgroundColor: "#1565c0",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    padding: "30px"
  },

  header: {
    marginBottom: "20px"
  },

  backBtn: {
  border: "none",
  backgroundColor: "#1565c0",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "15px",
  fontWeight: "600"
},

  title: {
    color: "#0d47a1"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)"
  },

  cardTitle: {
    marginBottom: "15px",
    color: "#1565c0"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1565c0",
    color: "#fff",
    cursor: "pointer"
  },

  userList: {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxHeight: "220px",     // 👈 controls height
  overflowY: "auto",      // 👈 enables scroll
  paddingRight: "5px"
},

  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderRadius: "10px",
    background: "#f9fbff",
    border: "1px solid #e3e8f0"
  },

  name: { fontWeight: "600", margin: 0 },
  meta: { fontSize: "13px", color: "#6b7280", margin: 0 },
  role: { fontSize: "12px", color: "#1565c0", margin: 0 },

  deleteBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer"
  },

  empty: {
    color: "#6b7280"
  }
};

export default AdminDashboard;