// import React, { useState } from "react";
// import axios from "axios";

// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Enter email and password");
//       return;
//     }

//     try {
//       // 🔥 Call backend
//       const response = await axios.post(
//         "http://localhost:8080/students/login",
//         {
//           email,
//           password,
//         }
//       );

//       const student = response.data;

//       // 🔥 Store logged-in user
//       // localStorage.setItem("student", JSON.stringify(student));
//       localStorage.setItem("user", JSON.stringify(student));

//       alert("Login successful!");

//       // 🔥 Pass to parent if needed
//       onLogin(student);

//     } catch (error) {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Placement Portal Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={styles.input}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={styles.input}
//       />

//       {/* Optional role dropdown (can keep or remove later) */}
//       <select
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         style={styles.input}
//       >
//         <option value="student">Student</option>
//         <option value="recruiter">Recruiter</option>
//         <option value="department">Department</option>
//         <option value="cdc">CDC</option>
//       </select>

//       <button onClick={handleLogin} style={styles.button}>
//         Login
//       </button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: "center",
//     marginTop: "100px",
//   },
//   input: {
//     display: "block",
//     margin: "10px auto",
//     padding: "10px",
//     width: "220px",
//   },
//   button: {
//     padding: "10px 20px",
//     marginTop: "10px",
//   },
// };

// export default LoginPage;
import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN
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
          password: form.password,
        }
      );

      const user = response.data;

      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(response.data));
      onLogin(user);

      alert("Login successful!");

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  // 🆕 REGISTER
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/students/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      const user = response.data;

      // 🔥 Auto login after register
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);

      alert("Registered & Logged in!");

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegister ? "Student Register" : "Placement Portal Login"}</h2>

      {/* 👤 Name field only in Register */}
      {isRegister && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
      )}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={styles.input}
      />

      <button
        onClick={isRegister ? handleRegister : handleLogin}
        style={styles.button}
      >
        {isRegister ? "Register" : "Login"}
      </button>

      {/* 🔄 Toggle */}
      <p
        style={{ color: "blue", cursor: "pointer", marginTop: "10px" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "New user? Register"}
      </p>
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