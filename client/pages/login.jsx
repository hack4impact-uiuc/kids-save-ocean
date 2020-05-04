import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../utils/apiWrapper";
import {
  Alert,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { Head } from "../components";
import "../public/styles/auth.scss";

export default function Login(props) {
  // constants
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
  const SUCCESS = 200;
  const { role } = props;

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await login(email, password);
    const resp = await result.json();

    if (!resp.token) {
      setErrorMessage(resp.message);
    } else {
      localStorage.setItem("token", resp.token);
      localStorage.setItem("google", false);
      Router.push("/feed");
    }
  };

  return (
    <div>
      <Head />
      <div className="auth-card-wrapper">
        <Card className="auth-card">
          <CardTitle>
            <h3 className="auth-card-title">Login</h3>
          </CardTitle>

          <CardBody>
            {errorMessage && (
              <Alert className="auth-alert" color="danger">
                {errorMessage}
              </Alert>
            )}
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  maxLength="64"
                  pattern={EMAIL_REGEX}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  minLength="8"
                  maxLength="64"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button
                className="left-btn"
                color="success"
                size="m"
                onClick={handleSubmit}
              >
                Log In
              </Button>
              <Button
                className="right-btn"
                color="success"
                size="m"
                onClick={() => Router.push("/register")}
              >
                Register
              </Button>
            </Form>
            <div className="forgot-password">
              <Link href="/forgotPassword">
                <a>Forgot Password?</a>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
      <br />
    </div>
  );
}
