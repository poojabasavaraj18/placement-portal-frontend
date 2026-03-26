import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";

function App() {

  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return <StudentDashboard user={user} />;
}

export default App;