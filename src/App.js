// import React, { useState } from "react";
// import LoginPage from "./pages/LoginPage";
// import StudentDashboard from "./pages/StudentDashboard";
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import CDCDashboard from "./pages/CDCDashboard";
// // import AdminDashboard from "./components/AdminDashboard"; 
// import AdminDashboard from "./pages/AdminDashboard";
// import DepartmentDashboard from "./pages/DepartmentDashboard";
// // or correct path

// function App() {
//   const [user, setUser] = useState(null);

//   console.log("USER:", user);
//   console.log("ROLE:", user?.role);

//   // 🔐 Show login if not logged in
//   if (!user) {
//     return <LoginPage onLogin={setUser} />;
//   }

//   // 🔥 Normalize role (fix case mismatch issue permanently)
//   const role = user.role?.toUpperCase();

//   // 👩‍🎓 Student Dashboard
//   if (role === "STUDENT") {
//     return <StudentDashboard user={user} />;
//   }

//   // 🏢 Recruiter Dashboard
//   if (role === "RECRUITER") {
//     return <RecruiterDashboard user={user} />;
//   }
//   if (role === "ADMIN") return <AdminDashboard />;

//   // 🏫 Department Dashboard (placeholder)
//   if (role === "DEPARTMENT") {
//   return <DepartmentDashboard user={user} />;
//   }

//   // 🧑‍💼 CDC Dashboard
//   if (role === "CDC") {
//     return <CDCDashboard user={user} />;
//   }

//   // ❌ Fallback (should not happen)
//   return <h1>Invalid Role</h1>;
// }



// export default App;

import React, { useState } from "react";

// ✅ Make sure folder name is EXACTLY "pages" (lowercase)
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CDCDashboard from "./pages/CDCDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentDashboard from "./pages/DepartmentDashboard";

function App() {
  const [user, setUser] = useState(null);

  console.log("USER:", user);
  console.log("ROLE:", user?.role);

  // 🔐 Show login if not logged in
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // 🔥 Normalize role (important)
  const role = user.role?.toUpperCase();

  // 👑 ADMIN
  if (role === "ADMIN") {
    return <AdminDashboard user={user} />;
  }

  // 🏢 RECRUITER
  if (role === "RECRUITER") {
    return <RecruiterDashboard user={user} />;
  }

  // 🏫 DEPARTMENT
  if (role === "DEPARTMENT") {
    return <DepartmentDashboard user={user} />;
  }

  // 🧑‍💼 CDC
  if (role === "CDC") {
    return <CDCDashboard user={user} />;
  }

  // 👩‍🎓 STUDENT
  if (role === "STUDENT") {
    return <StudentDashboard user={user} />;
  }

  // ❌ fallback
  return <h1>Invalid Role</h1>;
}

export default App;