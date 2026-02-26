import { supabase } from "../api/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const token = data.session.access_token;
    localStorage.setItem("token", token);

    alert("Login successful");

    try {
      const res = await fetch("https://rapt-backend.onrender.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = await res.json();

      // ⭐ Cache role locally for faster routing later
      if (profile.role) {
        localStorage.setItem("role", profile.role);
      }

      // ⭐ Role-based navigation
      if (profile.role === "recruiter") {
        navigate("/recruiter");
      } else {
        // student flow
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
  };

  const handleSignup = async () => {

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful. You can now login.");
  };

  return (
    <div>
      <h1>RAPT Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <button onClick={handleSignup}>
        New user? Sign Up
      </button>
    </div>
  );
}

export default Login;