
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

function Signup() {
  const [data, setData] = useState({});
  const nav = useNavigate(); // ✅ ADD THIS

  const signup = () => {
    axios.post("http://localhost:5000/api/signup", data)
      .then(() => {
        alert("User created");

        // ✅ REDIRECT TO LOGIN PAGE
        nav("/");
      })
      .catch(err => {
        console.error(err);
        alert("Signup failed");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
  
        <input
          placeholder="Username"
          onChange={e =>
            setData({ ...data, username: e.target.value })
          }
        />
  
        <input
          placeholder="Password"
          type="password"
          onChange={e =>
            setData({ ...data, password: e.target.value })
          }
        />
  
        <button onClick={signup}>Signup</button>
  
        {/* OPTIONAL: GO BACK TO LOGIN */}
        <p onClick={() => nav("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Signup;