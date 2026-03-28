import { supabase } from "../api/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate();

  const handleAuth = async () => {
    setErrorMsg("");
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const token = data.session.access_token;
      localStorage.setItem("token", token);

      try {
        const res = await fetch("https://rapt-backend.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = await res.json();

        if (profile.role) {
          localStorage.setItem("role", profile.role);
        }

        if (profile.role === "recruiter") {
          navigate("/recruiter");
        } else {
          if (!profile.full_name || !profile.major || !profile.current_year) {
            navigate("/setup-profile");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.error(err);
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }
      
      setIsLogin(true);
      setErrorMsg("Signup successful! Please login.");
    }
  };

  return (
    <div className="login-container">
      <div className="space-particles"></div>
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>

      <div className="login-card">
        <h1>RAPT</h1>
        <p>AI-Powered Recruitment Platform</p>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <div className="login-inputs">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleAuth}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <button 
          className="toggle-mode" 
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMsg("");
          }}
        >
          {isLogin ? "New to RAPT? Create an account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;