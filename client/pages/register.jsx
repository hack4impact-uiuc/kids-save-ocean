import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  register,
  verifyPIN,
  resendPIN,
  google,
  getSecurityQuestions,
  createUser
} from "../utils/apiWrapper";
import {
  Alert,
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
import { GoogleLogin } from "react-google-login";
import { Head } from "../components";
import { signAuthJWT } from "../utils/jwtHelpers";

import "../public/styles/auth.scss";

export default function RegisterPage(props) {
  // constants
  // michael's baby
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
  const SUCCESS = 200;
  const INVALID = -1;
  const { role } = props;

  // state related to auth user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pin, setPin] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(INVALID);

  // state related to kso user
  const [username, setUsername] = useState("test");
  const [country, setCountry] = useState("test");
  const [birthday, setBirthday] = useState("test");
  const [userRole, setUserRole] = useState("admin");
  const [anon, setAnon] = useState(false);

  useEffect(() => {
    const loadSecurityQuestions = async () => {
      const resp = await getSecurityQuestions();
      if (!resp) {
        setErrorMessage("Unable to load data");
        return;
      }
      const respJson = await resp.json();
      if (respJson.questions) {
        setQuestions(respJson.questions);
      } else {
        setErrorMessage(respJson.error.message);
      }
    };
    loadSecurityQuestions();
  }, []);

  const handleGoogle = async e => {
    const result = await google(e.tokenId);
    const resp = await result.json();
    if (resp.status !== SUCCESS) {
      setErrorMessage(resp.message);
    } else {
      localStorage.setItem("token", e.tokenId);
      localStorage.setItem("google", true);
      Router.push("/");
    }
  };

  const pickDropDown = idx => {
    setQuestionIdx(idx);
  };

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      password === password2 &&
      questionIdx !== INVALID &&
      securityQuestionAnswer !== ""
    ) {
      // #1: create user in auth db
      const authUserResp = await register(
        email,
        password,
        questionIdx,
        securityQuestionAnswer,
        userRole
      );
      const authUserRes = await authUserResp.json();
      if (authUserRes.status === 200) {
        // #2: store token in local storage
        const { token } = authUserRes;
        if (!token) {
          setErrorMessage("Invalid Token.");
        } else {
          localStorage.setItem("token", token);
        }

        // #3: create user in kso db
        const newUser = {
          email,
          username,
          password,
          country,
          birthday,
          anon,
          createdProjects: [],
          followingProjects: [],
          followingUsers: [],
          followers: []
        };
        const ksoUserResp = await createUser(newUser);
        const ksoUserRes = await ksoUserResp.json();
        if (ksoUserRes.code === 200) {
          setSuccessfulSubmit(true);
        } else {
          setErrorMessage(ksoUserRes.message);
        }
      } else {
        setErrorMessage(authUserRes.message);
      }
    } else if (password !== password2) {
      setErrorMessage("Passwords do not match");
    } else if (questionIdx === INVALID) {
      setErrorMessage("Select a question");
    } else if (!securityQuestionAnswer) {
      setErrorMessage("Answer not selected");
    }
  };

  const handlePINVerify = async e => {
    e.preventDefault();
    const result = await verifyPIN(pin);
    const response = await result.json();
    setPinMessage(response.message);
    if (response.status === SUCCESS) {
      Router.push("/");
    }
  };

  const handlePINResend = async e => {
    e.preventDefault();
    const result = await resendPIN();
    const response = await result.json();
    setPinMessage(response.message);
  };

  return (
    <div>
      <Head />
      {!successfulSubmit ? (
        <div>
          <div className="auth-card-wrapper">
            <Card className="auth-card">
              <CardTitle>
                <h3 className="auth-card-title">Register</h3>
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
                      minLength="8"
                      maxLength="64"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                      onChange={e => setPassword2(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Dropdown
                      className="security-select"
                      isOpen={dropdownOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle caret>
                        {questionIdx === INVALID
                          ? "Security Question"
                          : questions[questionIdx]}
                      </DropdownToggle>
                      <DropdownMenu>
                        {questions.map((question, idx) => (
                          <DropdownItem
                            key={idx}
                            onClick={pickDropDown.bind(null, idx)}
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
                      onChange={e => setSecurityQuestionAnswer(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="m"
                    onClick={handleSubmit}
                    className="left-btn"
                  >
                    Register
                  </Button>
                  <Button
                    color="success"
                    size="m"
                    onClick={() => Router.push("/login")}
                    className="right-btn"
                  >
                    Login
                  </Button>
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
              onSuccess={handleGoogle}
            />
          </div>
        </div>
      ) : (
        <div className="auth-card-wrapper">
          <Card className="auth-card">
            <CardBody>
              {pinMessage === "Invalid request" ||
              pinMessage === "PIN does not match" ? (
                <Alert className="auth-alert" color="danger">
                  {pinMessage}
                </Alert>
              ) : (
                pinMessage && (
                  <Alert className="auth-alert" color="success">
                    {pinMessage}
                  </Alert>
                )
              )}
              <Form>
                <FormGroup>
                  <Label>PIN</Label>
                  <Input
                    name="pin"
                    type="number"
                    maxLength="10"
                    minLength="4"
                    value={pin}
                    onChange={e => setPin(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="m"
                  onClick={handlePINResend}
                  className="left-btn"
                >
                  Resend PIN
                </Button>
                <Button
                  color="success"
                  size="m"
                  onClick={handlePINVerify}
                  className="right-btn"
                >
                  Verify Email
                </Button>
                <div className="forgot-password">
                  <Link href="/">
                    <a>Skip verification</a>
                  </Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
