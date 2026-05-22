
import React, { useState } from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CDCDashboard from "./pages/CDCDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentDashboard from "./pages/DepartmentDashboard";
import ApplicantsPage from "./pages/ApplicantsPage";

function App() {

  // ✅ KEEP USER AFTER REFRESH
  const [user, setUser] = useState(null);

  console.log("USER:", user);
  console.log("ROLE:", user?.role);

  // ✅ LOGIN FIRST
  if (!user) {

    return (
      <LoginPage
        onLogin={setUser}
      />
    );

  }

  // ✅ NORMALIZE ROLE
  const role =
    user.role?.toUpperCase();

  return (

    <Routes>

      {/* 👩‍🎓 STUDENT */}

      {role === "STUDENT" && (

        <Route
          path="/"
          element={
            <StudentDashboard
              user={user}
            />
          }
        />

      )}

      {/* 🏢 RECRUITER */}

      {role === "RECRUITER" && (

        <>

          <Route
            path="/"
            element={
              <RecruiterDashboard
                user={user}
              />
            }
          />

          <Route
            path="/applicants/:jobId"
            element={
              <ApplicantsPage />
            }
          />

        </>

      )}

      {/* 👑 ADMIN */}

      {role === "ADMIN" && (

        <Route
          path="/admin"
          element={
            <AdminDashboard
              user={user}
            />
          }
        />

      )}

      {/* 🏫 DEPARTMENT */}

      {role === "DEPARTMENT" && (

        <Route
          path="/department"
          element={
            <DepartmentDashboard
              user={user}
            />
          }
        />

      )}

      {/* 🧑‍💼 CDC */}

      {role === "CDC" && (

        <Route
          path="/cdc"
          element={
            <CDCDashboard
              user={user}
            />
          }
        />

      )}

      {/* ✅ FALLBACK ROUTING */}

      <Route
        path="*"
        element={
          role === "STUDENT"
            ? <Navigate to="/" />
            : role === "DEPARTMENT"
            ? <Navigate to="/department" />
            : role === "CDC"
            ? <Navigate to="/cdc" />
            : role === "ADMIN"
            ? <Navigate to="/admin" />
            : role === "RECRUITER"
            ? <Navigate to="/" />
            : <Navigate to="/" />
        }
      />

    </Routes>

  );

}

export default App;