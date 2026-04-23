import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      // 🔥 Call backend
      const response = await axios.post(
        "http://localhost:8080/students/login",
        {
          email,
          password,
        }
      );

      const student = response.data;

      // 🔥 Store logged-in user
      // localStorage.setItem("student", JSON.stringify(student));
      localStorage.setItem("user", JSON.stringify(student));

      alert("Login successful!");

      // 🔥 Pass to parent if needed
      onLogin(student);

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Placement Portal Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {/* Optional role dropdown (can keep or remove later) */}
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