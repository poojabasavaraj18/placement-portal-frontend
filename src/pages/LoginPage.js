
// import React, { useState } from "react";
// import axios from "axios";

// function LoginPage({ onLogin }) {
//   const [isRegister, setIsRegister] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     departmentId: "",
//     usn: "",
//     cgpa: "",
//     year: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔐 LOGIN
//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Enter email and password");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/students/login",
//         {
//           email: form.email,
//           password: form.password
//         }
//       );

//       const user = response.data;

//       localStorage.setItem("user", JSON.stringify(user));
//       onLogin(user);

//       alert("Login successful!");

//     } catch (error) {
//       alert("Invalid email or password");
//     }
//   };


//   const [departments, setDepartments] = useState([]);

// useEffect(() => {
//   axios.get("http://localhost:8080/departments")
//     .then(res => setDepartments(res.data))
//     .catch(err => console.error(err));
// }, []);

//   // 🆕 REGISTER
//   const handleRegister = async () => {
//     if (
//       !form.name ||
//       !form.email ||
//       !form.password ||
//       !form.departmentId
//     ) {
//       alert("Fill all required fields");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/students/register",
//         {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           usn: form.usn,
//           cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
//           year: form.year ? parseInt(form.year) : null,
//           phone: form.phone,
//           department: {
//             id: form.departmentId
//           }
//         }
//       );

//       alert("Registered successfully! Please login.");

//       setIsRegister(false);

//     } catch (error) {
//       console.error(error);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>{isRegister ? "Student Register" : "Placement Portal Login"}</h2>

//       {/* 🔥 REGISTER FIELDS */}
//       {isRegister && (
//         <>
//           <input
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <select name="departmentId" onChange={handleChange} style={styles.input}>
//   <option value="">Select Department</option>

//   {departments.map(dept => (
//     <option key={dept.id} value={dept.id}>
//       {dept.name}
//     </option>
//   ))}
// </select>

//           <input
//             name="usn"
//             placeholder="USN"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             name="cgpa"
//             placeholder="CGPA"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             name="year"
//             placeholder="Year"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             name="phone"
//             placeholder="Phone"
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </>
//       )}

//       {/* 🔑 COMMON FIELDS */}
//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         style={styles.input}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//         style={styles.input}
//       />

//       <button
//         onClick={isRegister ? handleRegister : handleLogin}
//         style={styles.button}
//       >
//         {isRegister ? "Register" : "Login"}
//       </button>

//       {/* 🔄 SWITCH */}
//       <p
//         style={{ color: "blue", cursor: "pointer", marginTop: "10px" }}
//         onClick={() => setIsRegister(!isRegister)}
//       >
//         {isRegister
//           ? "Already have an account? Login"
//           : "New user? Register"}
//       </p>
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

  // 🔥 Fetch departments (runs once)
  useEffect(() => {
    axios.get("http://localhost:8080/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

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

  // 🆕 REGISTER
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
      <h2>{isRegister ? "Student Register" : "Placement Portal Login"}</h2>

      {/* 🔥 REGISTER FIELDS */}
      {isRegister && (
        <>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
          />

          {/* ✅ Dynamic Department Dropdown */}
          <select
            name="departmentId"
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <input
            name="usn"
            placeholder="USN"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="cgpa"
            placeholder="CGPA"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="year"
            placeholder="Year"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            style={styles.input}
          />
        </>
      )}

      {/* 🔑 COMMON FIELDS */}
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={styles.input}
      />

      <button
        onClick={isRegister ? handleRegister : handleLogin}
        style={styles.button}
      >
        {isRegister ? "Register" : "Login"}
      </button>

      {/* 🔄 TOGGLE */}
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