import React, { Component } from "react";
import Router from "next/router";
import {
  register,
  verifyPIN,
  resendPIN,
  google,
  getSecurityQuestions
} from "../utils/apiWrapper";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { setCookie } from "./../utils/cookie";
import { GoogleLogin } from "react-google-login";
import { Head } from "../components";
import "../public/styles/auth.scss";

// michael's baby
const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
const SUCCESS = 200;
const INVALID = -1;

class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errorMessage: "",
    pinMessage: "",
    pin: "",
    successfulSubmit: false,
    loading: false,
    questions: [],
    questionIdx: INVALID,
    dropdownOpen: false,
    securityQuestionAnswer: ""
  };

  handleGoogle = async e => {
    const result = await google(e.tokenId);
    const resp = await result.json();
    if (resp.status !== SUCCESS) {
      this.setState({ errorMessage: resp.message });
    } else {
      setCookie("token", e.tokenId);
      setCookie("google", true);
      Router.push("/");
    }
  };

  pickDropDown = idx => {
    this.setState({ questionIdx: idx });
  };
  toggle = () => {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleChangeSecurityAnswer = event => {
    const value = event.target.value;
    this.setState({ securityQuestionAnswer: value });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const resp = await getSecurityQuestions();
    if (!resp) {
      this.setState({ error: "unable to load data" });
      return;
    }
    const respJson = await resp.json();
    if (respJson.questions) {
      this.setState({ questions: respJson.questions });
    } else {
      this.setState({ loading: false, errorMessage: respJson.error.message });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const {
      password,
      questionIdx,
      securityQuestionAnswer,
      email,
      password2
    } = this.state;
    if (
      password === password2 &&
      questionIdx !== INVALID &&
      securityQuestionAnswer !== ""
    ) {
      let result = await register(
        email,
        password,
        questionIdx,
        securityQuestionAnswer
      );
      const response = await result.json();
      if (!response.token) {
        this.setState({ errorMessage: response.message });
      } else {
        setCookie("token", response.token);
        this.setState({ successfulSubmit: true });
      }
    } else if (password !== password2) {
      this.setState({ errorMessage: "Passwords do not match " });
    } else if (questionIdx === INVALID) {
      this.setState({ errorMessage: "Select a question" });
    } else if (!securityQuestionAnswer) {
      this.setState({ errorMessage: "Answer not selected" });
    }
  };

  handlePINVerify = async e => {
    e.preventDefault();
    const { pin } = this.state;
    const result = await verifyPIN(pin);
    const response = await result.json();
    this.setState({ pinMessage: response.message });
    if (response.status === SUCCESS) {
      Router.push("/");
    }
  };

  handlePINResend = async e => {
    e.preventDefault();
    const result = await resendPIN();
    const response = await result.json();
    this.setState({ pinMessage: response.message });
  };

  roletoggle = () => {
    const { roleDropdownOpen } = this.state;
    this.setState({ roleDropdownOpen: !roleDropdownOpen });
  };

  render = () => {
    const {
      successfulSubmit,
      email,
      password,
      password2,
      securityQuestionAnswer,
      errorMessage,
      pin,
      pinMessage,
      questionIdx,
      questions,
      dropdownOpen,
      passwordChangeMessage
    } = this.state;
    const { role } = this.props;
    return (
      <div>
        <Head />
        {!successfulSubmit ? (
          <div>
            <div className="auth-card-wrapper">
              <Card className="auth-card">
                <CardTitle>
                  <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                    Register
                  </h3>
                </CardTitle>
                <CardBody>
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
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
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
                      <Label for="examplePassword">Confirm Password</Label>
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
                    <FormGroup>
                      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                          {questionIdx === INVALID
                            ? "Security Question"
                            : questions[questionIdx]}
                        </DropdownToggle>
                        <DropdownMenu>
                          {questions.map((question, idx) => (
                            <DropdownItem
                              key={idx}
                              onClick={this.pickDropDown.bind(null, idx)}
                            >
                              {question}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      <Label for="exampleEmail">Answer</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        maxLength="64"
                        pattern={EMAIL_REGEX}
                        value={securityQuestionAnswer}
                        onChange={this.handleChangeSecurityAnswer}
                        required
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handleSubmit}
                      style={{ float: "left", width: "48%" }}
                    >
                      Register
                    </Button>{" "}
                    <Button
                      color="success"
                      size="lg"
                      onClick={() => Router.push("/login")}
                      style={{ float: "right", width: "49%" }}
                    >
                      Login
                    </Button>
                    <br />
                    <br />
                    <br />
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  </Form>
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
                onSuccess={this.handleGoogle}
              />
            </div>
          </div>
        ) : (
          <div className="auth-card-wrapper">
            <Card className="auth-card">
              <CardBody>
                <Form>
                  <FormGroup>
                    <p style={{ color: "green" }}>{pinMessage}</p>
                    <Label>PIN</Label>
                    <Input
                      name="pin"
                      type="number"
                      maxLength="10"
                      minLength="4"
                      value={pin}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="lg"
                    onClick={this.handlePINResend}
                    style={{
                      float: "left",
                      marginBottom: "3%",
                      width: "100%"
                    }}
                  >
                    Resend PIN
                  </Button>
                  <Button
                    color="success"
                    size="lg"
                    onClick={this.handlePINVerify}
                    style={{
                      float: "left",
                      marginBotton: "3%",
                      width: "100%"
                    }}
                  >
                    Verify Email
                  </Button>
                  <Button
                    color="link"
                    size="sm"
                    onClick={() => Router.push("/")}
                    style={{
                      float: "right",
                      width: "25%",
                      marginRight: "6%"
                    }}
                  >
                    Skip Verification
                  </Button>
                </Form>
                {passwordChangeMessage}
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    );
  };
}

export default Register;
