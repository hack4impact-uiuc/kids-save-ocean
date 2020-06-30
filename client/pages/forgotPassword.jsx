import React, { useState } from "react";
import Link from "next/link";
import {
  getSecurityQuestionForUser,
  submitSecurityQuestionAnswer,
  resetPassword,
} from "../utils/apiWrapper";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  Alert,
  CardBody,
  CardTitle,
} from "reactstrap";
import Router from "next/router";
import { Head } from "../components";
import "../public/styles/auth.scss";

export default function ForgotPasswordPage() {
  // constants
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
  // const PASSWORD_REGEX = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
  const SUCCESS = 200;

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [submitNewPassword, setSubmitNewPassword] = useState(false);

  const handleGetSecurityQuestion = async (e) => {
    e.preventDefault();
    const result = await getSecurityQuestionForUser(email);
    const resp = await result.json();
    if (resp.question) {
      setQuestion(resp.question);
      setErrorMessage("");
    } else {
      setErrorMessage(resp.message);
    }
  };

  const handleSubmitSecurityAnswer = async (e) => {
    e.preventDefault();
    setLoadingAPI(true);
    const result = await submitSecurityQuestionAnswer(email, answer);
    const resp = await result.json();
    if (resp.status === SUCCESS) {
      setSubmitNewPassword(true);
      setErrorMessage("");
    } else {
      setLoadingAPI(false);
      setErrorMessage(resp.message);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorMessage("Passwords don't match!");
      return;
    }
    const response = await (
      await resetPassword(pin, email, password, answer)
    ).json();
    if (response.status === SUCCESS && response.token) {
      localStorage.setItem("token", response.token);
      Router.push("/");
    } else {
      setErrorMessage(response.message);
    }
  };
  return (
    <div>
      <Head />
      {submitNewPassword ? (
        <div className="auth-card-wrapper">
          <Card className="auth-card">
            <CardTitle>
              <h3 className="auth-card-title">Reset Password</h3>
            </CardTitle>

            <CardBody>
              {errorMessage && (
                <Alert className="auth-alert" color="danger">
                  {errorMessage}
                </Alert>
              )}
              <Form>
                <FormGroup>
                  <Label>Pin</Label>
                  <Input
                    name="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="64"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="password2"
                    minLength="8"
                    maxLength="64"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="m"
                  onClick={handleSubmitNewPassword}
                  className="mid-btn"
                >
                  Reset Password
                </Button>
              </Form>
            </CardBody>
            <div className="back-to-login">
              <Link href="/login">
                <a>Back to login page</a>
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <div className="auth-card-wrapper">
          {question === "" ? (
            <Card className="auth-card">
              <CardTitle>
                <h3 className="auth-card-title">Reset Password</h3>
              </CardTitle>

              <CardBody>
                {errorMessage && (
                  <Alert className="auth-alert" color="danger">
                    {errorMessage}
                  </Alert>
                )}

                <Form>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      maxLength="64"
                      pattern={EMAIL_REGEX}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="m"
                    onClick={handleGetSecurityQuestion}
                    className="mid-btn"
                  >
                    Get Security Question
                  </Button>
                </Form>
              </CardBody>
              <div className="back-to-login">
                <Link href="/login">
                  <a>Back to login page</a>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="auth-card">
              <CardTitle>
                <h3 className="auth-card-title">Reset Password</h3>
              </CardTitle>

              <CardBody>
                {errorMessage && (
                  <Alert className="auth-alert" color="danger">
                    {errorMessage}
                  </Alert>
                )}
                <Form>
                  <FormGroup>
                    <p> {question}</p>
                    <Label>Answer</Label>
                    <Input
                      type="answer"
                      name="answer"
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="m"
                    onClick={handleSubmitSecurityAnswer}
                    disabled={loadingAPI}
                    className="mid-btn"
                  >
                    Submit Answer
                  </Button>
                </Form>
              </CardBody>
              <div className="back-to-login">
                <Link href="/login">
                  <a>Back to login page</a>
                </Link>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
