import React, { Component } from "react";
import Link from "next/link";
import {
  getSecurityQuestionForUser,
  submitSecurityQuestionAnswer,
  resetPassword
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
  CardTitle
} from "reactstrap";
import { setCookie } from "./../utils/cookie";
import Router from "next/router";

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
// const PASSWORD_REGEX = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
const SUCCESS = 200;
class ForgotPasswordPage extends Component {
  state = {
    email: "",
    question: "",
    errorMessage: "",
    answer: "",
    pin: "",
    password: "",
    password2: "",
    loadingAPI: false,
    submitNewPassword: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleGetSecurityQuestion = async e => {
    e.preventDefault();
    console.log("HHERE");
    const { email } = this.state;
    console.log(email);
    const result = await getSecurityQuestionForUser(email);
    const resp = await result.json();
    if (resp.question) {
      this.setState({ question: resp.question, errorMessage: "" });
    } else {
      this.setState({ errorMessage: resp.message });
    }
  };

  handleSubmitSecurityAnswer = async e => {
    e.preventDefault();

    this.setState({ loadingAPI: true });
    const { email, answer } = this.state;
    const result = await submitSecurityQuestionAnswer(email, answer);
    const resp = await result.json();
    if (resp.status === SUCCESS) {
      this.setState({ submitNewPassword: true, errorMessage: "" });
    } else {
      this.setState({ errorMessage: resp.message });
    }
  };

  handleSubmitNewPassword = async e => {
    e.preventDefault();
    const { password, password2, pin, email, answer } = this.state;
    if (password !== password2) {
      this.setState({ errorMessage: "Passwords don't match!" });
      return;
    }
    const response = await (
      await resetPassword(pin, email, password, answer)
    ).json();
    if (response.status === SUCCESS && response.token) {
      setCookie("token", response.token);
      this.setState({ successfulSubmit: true });
      Router.push("/");
    } else {
      this.setState({ errorMessage: response.message });
    }
  };

  render = () => {
    const {
      errorMessage,
      submitNewPassword,
      pin,
      password,
      password2,
      question,
      email,
      loadingAPI
    } = this.state;
    return (
      <div>
        {errorMessage !== "" && <Alert color="danger">{errorMessage}</Alert>}
        {submitNewPassword ? (
          <Card
            className="interview-card"
            style={{ width: "400px", height: "60%" }}
          >
            <CardTitle>
              <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                Reset Password
              </h3>
            </CardTitle>

            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Pin</Label>
                  <Input
                    name="pin"
                    value={pin}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="lg"
                  onClick={this.handleSubmitNewPassword}
                  style={{ float: "left", width: "100%" }}
                >
                  Reset Password
                </Button>{" "}
              </Form>
            </CardBody>
            <div style={{ textAlign: "center" }}>
              <Link prefetch href="/login">
                <a>Back to login page</a>
              </Link>
            </div>
          </Card>
        ) : (
          <div>
            {question === "" ? (
              <Card
                className="interview-card"
                style={{ width: "400px", height: "60%" }}
              >
                <CardTitle>
                  <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                    Reset Password
                  </h3>
                </CardTitle>

                <CardBody>
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
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handleGetSecurityQuestion}
                      style={{ float: "right", width: "100%" }}
                    >
                      Get Security Question
                    </Button>

                    {errorMessage}
                  </Form>
                </CardBody>
                <div style={{ textAlign: "center" }}>
                  <Link prefetch href="/login">
                    <a>Back to login page</a>
                  </Link>
                </div>
              </Card>
            ) : (
              <Card
                className="interview-card"
                style={{ width: "400px", height: "60%" }}
              >
                <CardTitle>
                  <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                    Reset Password
                  </h3>
                </CardTitle>

                <CardBody>
                  <Form>
                    <FormGroup>
                      <p> {question}</p>
                      <Label>Answer</Label>
                      <Input
                        type="answer"
                        name="answer"
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handleSubmitSecurityAnswer}
                      style={{ float: "right", width: "100%" }}
                      disabled={loadingAPI}
                    >
                      Submit Answer
                    </Button>
                  </Form>
                </CardBody>
                <div style={{ textAlign: "center" }}>
                  <Link prefetch href="/login">
                    <a>Back to login page</a>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    );
  };
}
export default ForgotPasswordPage;
