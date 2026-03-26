import React, { useState } from "react";
// import LoginPage from "./pages/LoginPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [user, setUser] = useState(null);

  // 🔐 Login screen
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // 👩‍🎓 Student (FULL WORKING)
  if (user.role === "student") {
    return <StudentDashboard user={user} />;
  }

  // 🏢 Recruiter (placeholder)
  if (user.role === "recruiter") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🏢 Recruiter Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  // 🏫 Department (placeholder)
  if (user.role === "department") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🏫 Department Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  // 🧑‍💼 CDC (placeholder)
  if (user.role === "cdc") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🧑‍💼 CDC Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  return <h1>Invalid Role</h1>;
}

export default App;