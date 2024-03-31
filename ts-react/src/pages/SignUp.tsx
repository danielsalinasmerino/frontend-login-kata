import { useEffect, useState } from "react";
import "./SignUp.css";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { translateError } from "../utils/translateError.js";
import { useNavigate } from "react-router-dom";
import { FormField } from "../components/FormField";

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

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("https://backend-login-placeholder.deno.dev/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.code);
        }
      })
      .then(() => {
        navigate("/success");
      })
      .catch((error) => {
        setErrorMessage(error.message);
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
