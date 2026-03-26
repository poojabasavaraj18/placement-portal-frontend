import React, { useState } from "react";

function LoginPage({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    onLogin({ username, password });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Placement Portal Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "200px" }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "200px" }}
      />
      <br />

      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;