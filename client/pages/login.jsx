import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Link from "next/link";
import Router from "next/router";
import { login, google } from "../utils/apiWrapper";
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
import ls from "local-storage";
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

  const handleGoogle = async e => {
    const result = await google(e.tokenId);
    const resp = await result.json();
    if (resp.status !== SUCCESS) {
      setErrorMessage(resp.message);
    } else {
      ls.set("token", e.tokenId);
      ls.set("google", true);
      Router.push("/");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await login(email, password);
    const resp = await result.json();

    if (!resp.token) {
      setErrorMessage(resp.message);
    } else {
      ls.set("token", resp.token);
      Router.push("/");
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
      <div className="google-btn-wrapper">
        <GoogleLogin
          className="btn sign-in-btn"
          clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
          responseType="id_token"
          buttonText={role}
          scope="https://www.googleapis.com/auth/userinfo.email"
          onSuccess={handleGoogle}
        />
      </div>
      <br />
    </div>
  );
}
