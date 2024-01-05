import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import style from "./login.module.css";
import LoginInput from "../../components/Inputs/LoginInput";
import TogglePasswordVisibility from "../../components/Buttons/TogglePasswordVisibility";
import { isValidEmail } from "../../utils/valid-email";

const Login = () => {
  const [active, setActive] = useState("login");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const navigate = useNavigate();

  const { login, register } = useAuth();

  const handleTogglePasswordInputType = () => {
    if (passwordInputType === "password") setPasswordInputType("text");
    else setPasswordInputType("password");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const credentials = {
      email,
      password
    }

    login(credentials);
    navigate("/home");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const credentials = {
      username,
      email,
      password
    }

    register(credentials);
    navigate("/home");
  };

  return (
    <main className={style.login}>
      <div className={style.button_bar}>
        <button 
          type="button"
          onClick={() => setActive("login")}
          className={`${style.button} ${active === "login" && style.button_active}`}
        >
          Login
        </button>
        <button 
          type="button"
          onClick={() => setActive("register")}
          className={`${style.button} ${active === "register" && style.button_active}`}
        >
          Register
        </button>
      </div>
      <form 
        className={style.form}
        onSubmit={active === "login" ? handleLogin : handleRegister}
      >
        {active === "register" && (
          <LoginInput type="text" placeholder="Username" ref={usernameRef} />
        )}
        <LoginInput type="text" placeholder="Email" ref={emailRef} />
        <LoginInput
          type={passwordInputType}
          placeholder="Password"
          ref={passwordRef}
        >
          <TogglePasswordVisibility 
            type={passwordInputType}
            action={handleTogglePasswordInputType}
          />
        </LoginInput>
        <button 
          type="submit"
          className={style.submit_button}
        >
          {active === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </main>
  );
}

export default Login;
