import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    onLogin({ username, password, role });
  };

  return (
    <div style={styles.container}>
      <h2>Placement Portal Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {/* 🔥 ROLE SELECTION */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
        <option value="department">Department</option>
        <option value="cdc">CDC</option>
      </select>

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "220px",
  },
  button: {
    padding: "10px 20px",
    marginTop: "10px",
  },
};

export default LoginPage;