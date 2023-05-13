import React from "react";
import styles from "./Login.module.css";
import RegistrationForm from "../../components/Forms/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState<boolean>(true);
  return (
    <div className={styles.login}>
      {form ? (
        <LoginForm setForm={setForm} />
      ) : (
        <RegistrationForm setForm={setForm} />
      )}
    </div>
  );
};

export default Login;
