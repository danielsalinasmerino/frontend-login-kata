import { useEffect, useState } from "react";
import "./SignUp.css";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { translateError } from "../utils/translateError.js";
import { useNavigate } from "react-router-dom";
import { FormField } from "../components/FormField";
import axios from "axios";
import { useMutation } from "react-query";

type LoginData = {
  email: string;
  password: string;
};

export const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setErrorMessage(null);
  }, [email, password]);

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const loginMutation = useMutation((loginData: LoginData) => {
    return axios.post(
      "https://backend-login-placeholder.deno.dev/api/users",
      loginData
    );
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation
      .mutateAsync({
        email,
        password,
      })
      .then((response) => {
        if (response.statusText === "error") {
          throw new Error(response.statusText);
        }
        navigate("/success");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.code);
        }
      });
  };

  return (
    <main className="signup-container">
      <form className="signup-form" onSubmit={handleOnSubmit}>
        <Title>Sign up with email</Title>

        <p>Enter your email address to create an account.</p>

        <FormField
          id="email"
          labelText="Your email"
          value={email}
          onChange={handleChangeEmail}
          type={"email"}
        />

        <FormField
          id="password"
          labelText="Your password"
          value={password}
          onChange={handleChangePassword}
          type={"password"}
        />

        {errorMessage && <p>{translateError(errorMessage)}</p>}

        <Button title="Signup" />
      </form>
    </main>
  );
};
