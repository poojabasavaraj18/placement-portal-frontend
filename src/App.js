import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CDCDashboard from "./pages/CDCDashboard";

function App() {
  const [user, setUser] = useState(null);

  console.log("USER:", user);
  console.log("ROLE:", user?.role);

  // 🔐 Show login if not logged in
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // 🔥 Normalize role (fix case mismatch issue permanently)
  const role = user.role?.toUpperCase();

  // 👩‍🎓 Student Dashboard
  if (role === "STUDENT") {
    return <StudentDashboard user={user} />;
  }

  // 🏢 Recruiter Dashboard
  if (role === "RECRUITER") {
    return <RecruiterDashboard user={user} />;
  }

  // 🏫 Department Dashboard (placeholder)
  if (role === "DEPARTMENT") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🏫 Department Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  // 🧑‍💼 CDC Dashboard
  if (role === "CDC") {
    return <CDCDashboard user={user} />;
  }

  // ❌ Fallback (should not happen)
  return <h1>Invalid Role</h1>;
}

export default App;