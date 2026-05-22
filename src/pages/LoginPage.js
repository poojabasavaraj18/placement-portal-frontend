import React, { useState, useEffect } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {

  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    departmentId: "",
    usn: "",
    cgpa: "",
    year: "",
    phone: ""
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/students/login",
        {
          email: form.email,
          password: form.password
        }
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);

      alert("Login successful!");

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.departmentId
    ) {
      alert("Fill all required fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/students/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          usn: form.usn,
          cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
          year: form.year ? parseInt(form.year) : null,
          phone: form.phone,
          department: {
            id: parseInt(form.departmentId)
          }
        }
      );

      alert("Registered successfully! Please login.");
      setIsRegister(false);

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="fade-in">

        <h2 style={styles.title}>
          {isRegister ? "Create Account" : "Placement Portal"}
        </h2>
        <p style={styles.subtitle}>
          {isRegister ? "Register to continue" : "Sign in to your account"}
        </p>

        {/* REGISTER FIELDS */}
        {isRegister && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />

            <select name="departmentId" onChange={handleChange} style={styles.input}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <input name="usn" placeholder="USN" onChange={handleChange} style={styles.input} />
            <input name="cgpa" placeholder="CGPA" onChange={handleChange} style={styles.input} />
            <input name="year" placeholder="Year of Studying" onChange={handleChange} style={styles.input} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} style={styles.input} />
          </>
        )}

        {/* COMMON FIELDS */}
        <input name="email" placeholder="Email Address" onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} />

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          style={styles.button}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* TOGGLE */}
        <p
          style={styles.toggle}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register"}
        </p>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          .fade-in {
            animation: fadeSlide 0.7s ease;
          }

          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7fb",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    width: "360px",
    padding: "35px",
    borderRadius: "14px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    color: "#0d47a1",
    marginBottom: "5px",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1565c0",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  toggle: {
    marginTop: "15px",
    color: "#1565c0",
    cursor: "pointer",
    fontSize: "14px",
  }
};

export default LoginPage;