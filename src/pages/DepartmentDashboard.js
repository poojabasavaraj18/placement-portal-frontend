import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentDashboard({ user }) {

  const deptId = user?.department?.id;

  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [stats, setStats] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const [search, setSearch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [status, setStatus] = useState("");

  // 🚀 FETCH ALL DATA
  useEffect(() => {
    if (!deptId) return;

    // students
    axios.get(`http://localhost:8080/departments/${deptId}/students`)
      .then(res => {
        setStudents(res.data);
        setFiltered(res.data);
      });

    // analytics
    axios.get(`http://localhost:8080/departments/${deptId}/full-stats`)
      .then(res => setStats(res.data));

    // announcements
    axios.get(`http://localhost:8080/departments/${deptId}/announcements`)
      .then(res => setAnnouncements(res.data));

  }, [deptId]);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let data = students;

    if (search) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cgpa) {
      data = data.filter(s => s.cgpa >= parseFloat(cgpa));
    }

    if (status) {
      data = data.filter(s => s.placementStatus === status);
    }

    setFiltered(data);

  }, [search, cgpa, status, students]);

  // 📢 CREATE ANNOUNCEMENT
  const postAnnouncement = async () => {
    if (!newMsg) return;

    await axios.post(
      `http://localhost:8080/departments/${deptId}/announcement`,
      { message: newMsg }
    );

    setNewMsg("");

    // refresh
    const res = await axios.get(`http://localhost:8080/departments/${deptId}/announcements`);
    setAnnouncements(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏫 Department Dashboard</h1>

      {/* 📊 ANALYTICS */}
      <div style={styles.cards}>
        <div style={styles.card}>Total Students: {stats.totalStudents}</div>
        <div style={styles.card}>Applied: {stats.applied}</div>
        <div style={styles.card}>Selected: {stats.selected}</div>
        <div style={styles.card}>Rejected: {stats.rejected}</div>
      </div>

      {/* 🔍 FILTERS */}
      <div style={styles.filters}>
        <input placeholder="Search name" onChange={e => setSearch(e.target.value)} />
        <input placeholder="Min CGPA" onChange={e => setCgpa(e.target.value)} />

        <select onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PLACED">Placed</option>
        </select>
      </div>

      {/* 📋 STUDENT TABLE */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>USN</th>
            <th>CGPA</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.usn}</td>
              <td>{s.cgpa}</td>
              <td>{s.year}</td>
              <td>{s.placementStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📢 ANNOUNCEMENTS */}
      <h2 style={{ marginTop: "30px" }}>📢 Announcements</h2>

      <input
        placeholder="Write announcement..."
        value={newMsg}
        onChange={e => setNewMsg(e.target.value)}
      />
      <button onClick={postAnnouncement}>Post</button>

      <ul>
        {announcements.map(a => (
          <li key={a.id}>{a.message}</li>
        ))}
      </ul>

    </div>
  );
}

const styles = {
  cards: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  card: {
    padding: "15px",
    background: "#eee",
    borderRadius: "10px",
    minWidth: "120px",
    textAlign: "center"
  },
  filters: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px"
  }
};

export default DepartmentDashboard;