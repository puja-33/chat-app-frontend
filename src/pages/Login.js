import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({});
  const nav = useNavigate();

  const login = () => {
    axios.post("http://localhost:5000/api/login", data)
      .then(res => {
        if (res.data === "User not found" || res.data === "Wrong password") {
          alert(res.data);
          return;
        }
  
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", data.username);
        nav("/chat");
      })
      .catch(() => alert("Login failed"));
  };

return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setData({...data, username: e.target.value})}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => setData({...data, password: e.target.value})}
      />

      <button onClick={login}>Login</button>

      <p onClick={() => nav("/signup")}>
        Create account
      </p>
    </div>
  </div>
);
}

export default Login;