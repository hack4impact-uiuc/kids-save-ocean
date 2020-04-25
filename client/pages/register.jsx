import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  register,
  verifyPIN,
  resendPIN,
  google,
  createUser
} from "../utils/apiWrapper";
import { Alert, Form, Button, FormGroup, Input, Row, Col } from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { Head } from "../components";

import "../public/styles/auth.scss";
import "../public/styles/signupPage.scss";
import Select from "react-select";
import countryData from "../utils/countries";

export default function RegisterPage(props) {
  // constants
  // michael's baby
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
  const SUCCESS = 200;
  const INVALID = -1;
  const { role } = props;

  // state related to auth user

  const [anon, setAnon] = useState(false);
  const [person, setPerson] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pin, setPin] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(INVALID);
  // state related to kso user

  // useEffect(() => {
  //   const loadSecurityQuestions = async () => {
  //     const resp = await getSecurityQuestions();
  //     if (!resp) {
  //       setErrorMessage("Unable to load data");
  //       return;
  //     }
  //     const respJson = await resp.json();
  //     if (respJson.questions) {
  //       setQuestions(respJson.questions);
  //     } else {
  //       setErrorMessage(respJson.error.message);
  //     }
  //   };
  //   loadSecurityQuestions();
  // }, [setErrorMessage, setQuestions]);

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
  // const pickDropDown = idx => {
  //   setQuestionIdx(idx);
  // };

  // const toggle = () => {
  //   setDropdownOpen(prevState => !prevState);
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      password === password2 &&
      questionIdx !== INVALID &&
      securityQuestionAnswer !== "" &&
      person.label !== "" &&
      birthday !== "" &&
      country.label !== "" &&
      anon !== INVALID
    ) {
      // #1: create user in auth db
      const authUserResp = await register(
        email,
        password,
        questionIdx.value,
        securityQuestionAnswer,
        person.label
      );
      // hello
      const authUserRes = await authUserResp.json();
      if (authUserRes.status === SUCCESS) {
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
          country: country.label,
          birthday,
          anon: anon.value,
          projectIds: [],
          followingProjects: [],
          followingUsers: [],
          followers: []
        };
        const ksoUserResp = await createUser(newUser);
        console.log(ksoUserResp);
        const ksoUserRes = await ksoUserResp.json();
        console.log(ksoUserRes);
        if (ksoUserRes.success) {
          setSuccessfulSubmit(true);
        } else {
          setErrorMessage(ksoUserRes.message);
        }
      } else {
        setErrorMessage(authUserRes.message);
      }
    } else if (password !== password2) {
      setErrorMessage("Passwords do not match");
    } else if (!username) {
      setErrorMessage("Choose a username");
    } else if (questionIdx === INVALID) {
      setErrorMessage("Select a question");
    } else if (!securityQuestionAnswer) {
      setErrorMessage("Answer not selected");
    } else if (!person) {
      setErrorMessage("Select your role");
    } else if (!country) {
      setErrorMessage("Select country of origin");
    } else if (!birthday) {
      setErrorMessage("Enter birthday");
    } else if (anon === INVALID) {
      setErrorMessage("Select account type");
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
  const options = [
    { value: "student", label: "student" },
    { value: "teacher", label: "teacher" },
    { value: "stakeholder", label: "stakeholder" }
  ];
  const anonOptions = [
    { value: true, label: "Anonymous Account" },
    { value: false, label: "Visible Account" }
  ];
  const security_questions = [
    { value: 0, label: "What is the name of your first pet?" },
    { value: 1, label: "Which city were you born in?" },
    { value: 2, label: "Which city did you first meet your spouse?" },
    { value: 3, label: "What was the model of your first car?" },
    { value: 4, label: "What is the name of your childhood best friend?" }
  ];

  return (
    <div>
      <Head />

      <div>
        <Row className="parentRow">
          <Col className="columnLeft" xs="6">
            <div className="motto">
              {/* <Image 
                source={require('https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.gettyimages.ca%2Fgi-resources%2Fimages%2F500px%2F983801190.jpg&imgrefurl=https%3A%2F%2Fwww.gettyimages.ca%2Fcollections%2F500px&tbnid=IPCHuzhMDMWSwM&vet=12ahUKEwiws-77iPjoAhXFnZ4KHRj9CeAQMygbegQIARBr..i&docid=g_FeCARn6BUwiM&w=929&h=700&q=images&ved=2ahUKEwiws-77iPjoAhXFnZ4KHRj9CeAQMygbegQIARBr')}  
                style={{width: 400, height: 400, borderRadius: 400/ 2}} 
              /> */}
              <strong>
                Change your community, <br /> Change the world.
                <br /> <br /> Join FateMaker today.
              </strong>
            </div>
          </Col>
          <Col xs="6">
            {/* !successfulSubmit */}
            {!successfulSubmit ? (
              <div className="outer">
                <h1 className="auth-card-title">
                  <strong>Welcome to FateMaker!</strong>
                </h1>
                {errorMessage && (
                  <Alert className="auth-alert" color="danger">
                    {errorMessage}
                  </Alert>
                )}
                {/* username*/}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    username
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Input
                          type="username"
                          name="username"
                          minLength="8"
                          maxLength="64"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* email */}
                <Row align="middle" justify="center">
                  <Col xs="3" align="right" className=" vertAlign textField">
                    email
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
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
                    </Form>
                  </Col>
                </Row>
                {/* password */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    password
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
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
                    </Form>
                  </Col>
                </Row>

                {/* confirm password */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    confirm password
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
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
                    </Form>
                  </Col>
                </Row>
                {/* select country */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    country
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={countryData}
                          placeholder=""
                          isClearable
                          onChange={setCountry}
                          value={country}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* birthday */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    birthday
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Input
                          placeholder="dd/mm/yyyy"
                          minLength="10"
                          maxLength="10"
                          onChange={e => setBirthday(e.target.value)}
                        />
                      </FormGroup>
                    </Form>
                    <Form></Form>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    who are you?
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={options}
                          placeholder=""
                          isClearable
                          onChange={setPerson}
                          value={person}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    security question
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={security_questions}
                          placeholder=""
                          isClearable
                          onChange={setQuestionIdx}
                          value={questionIdx}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* answer */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    security answer
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          maxLength="64"
                          pattern={EMAIL_REGEX}
                          value={securityQuestionAnswer}
                          onChange={e =>
                            setSecurityQuestionAnswer(e.target.value)
                          }
                          required
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* Anonymous */}
                <Row>
                  <Col xs="3" align="right" className=" vertAlign textField">
                    account type
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={anonOptions}
                          placeholder=""
                          isClearable
                          onChange={setAnon}
                          value={anon}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Button size="m" onClick={handleSubmit} className="left-btn">
                    <div className=" vertAlign textField">Register</div>
                  </Button>

                  <Button
                    size="m"
                    onClick={() => Router.push("/login")}
                    className="right-btn"
                  >
                    <div className=" vertAlign textField">Login</div>
                  </Button>
                </Row>
                <Row>
                  <Col xs="2"></Col>

                  <Col xs="8">
                    <div className="google-btn-wrapper">
                      <GoogleLogin
                        justify="center"
                        align="middle"
                        float="middle"
                        className="btn sign-in-btn"
                        clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
                        responseType="id_token"
                        buttonText={role}
                        scope="https://www.googleapis.com/auth/userinfo.email"
                        onSuccess={handleGoogle}
                      />
                    </div>
                  </Col>
                  <Col xs="2"></Col>
                </Row>
              </div>
            ) : (
              <div className="auth-card-wrapper">
                <div className="auth-card">
                  <h1 className="auth-card-title">
                    <strong>Welcome to FateMaker!</strong>
                  </h1>
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

                  <Row>
                    <Col xs="2" align="right">
                      <div className=" vertAlign textField">enter pin</div>
                    </Col>
                    <Col xs="10">
                      <Form>
                        <FormGroup>
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
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      size="m"
                      onClick={handlePINResend}
                      className="left-btn"
                    >
                      <div className=" vertAlign textField">Resend PIN</div>
                    </Button>
                    <Button
                      size="m"
                      onClick={handlePINVerify}
                      className="right-btn"
                    >
                      <div className=" vertAlign textField">Verify Email</div>
                    </Button>
                  </Row>
                  <div className="forgot-password">
                    <Link href="/">
                      <a className=" vertAlign textField">Skip verification</a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
