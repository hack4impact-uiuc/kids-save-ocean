import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  register,
  verifyPIN,
  resendPIN,
  google,
  getSecurityQuestions
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
  Row,
  Col
} from "reactstrap";
import { setCookie } from "./../utils/cookie";
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

  // state
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [person, setPerson] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pin, setPin] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [questionIdx, setQuestionIdx] = useState(INVALID);

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
  }, [setErrorMessage, setQuestions]);
  const handleGoogle = async e => {
    const result = await google(e.tokenId);
    const resp = await result.json();
    if (resp.status !== SUCCESS) {
      setErrorMessage(resp.message);
    } else {
      setCookie("token", e.tokenId);
      setCookie("google", true);
      Router.push("/");
    }
  };
  const handleQuestion = questionIdx => {
    setQuestionIdx(questionIdx);
  };
  const handleCountry = country => {
    setCountry(country);
  };
  const handlePerson = person => {
    setPerson(person);
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
      country.label !== ""
    ) {
      let result = await register(
        email,
        password,
        questionIdx.value,
        securityQuestionAnswer,
        person.label,
        birthday,
        country.label
      );
      const response = await result.json();
      if (!response.token) {
        setErrorMessage(response.message);
      } else {
        setCookie("token", response.token);
        setSuccessfulSubmit(true);
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
    } else {
      console.log("hello");
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
              <strong>
                Change your community, <br /> Change the world.
                <br /> <br /> Join FateMaker today.
                </strong>
              
            </div>
          </Col>
          <Col xs="6">
          {/* !successfulSubmit */}
            { true ? (
              <div
                style={{
                  width: "80%",
                  marginLeft: "10%",
                  marginRight: "10%",
                  marginTop: "7.5%"
                }}
              >
                <h1 className="auth-card-title" style={{ marginBottom: "5%" }}>
                  <strong>Welcome to FateMaker!</strong>
                </h1>
                {errorMessage && (
                  <Alert className="auth-alert" color="danger">
                    {errorMessage}
                  </Alert>
                )}
                {/* username*/}
                <Row>
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
                    country
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={countryData}
                          placeholder=""
                          isClearable
                          onChange={handleCountry}
                          value={country}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* birthday */}
                <Row>
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
                    who are you?
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={options}
                          placeholder=""
                          isClearable
                          onChange={handlePerson}
                          value={person}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
                    security question
                  </Col>
                  <Col xs="9">
                    <Form>
                      <FormGroup>
                        <Select
                          options={security_questions}
                          placeholder=""
                          isClearable
                          onChange={handleQuestion}
                          value={questionIdx}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* answer */}
                <Row>
                  <Col xs="3" align="right" className="vertAlign" style={{fontSize: "1.20rem"}}>
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

                <Row style={{}}>
                  <Button size="m" onClick={handleSubmit} className="left-btn">
                  <div style={{fontSize: "1.20rem"}}>
                      Register
                      </div>
                  </Button>

                  <Button
                    style={{ marginLeft: "10%" }}
                    size="m"
                    onClick={() => Router.push("/login")}
                    className="right-btn"
                  >
                    <div style={{fontSize: "1.20rem"}}>
                      Login
                      </div>
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
              <div className="auth-card-wrapper" style = {{marginTop : "25%"}}>
                
                <div className="auth-card">
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
                  <h1 className="auth-card-title" style={{ marginBottom: "5%" }}>
                  <strong>Welcome to FateMaker!</strong>
                </h1>
                  <Row>
                  <Col xs="2" align="right" className="vertAlign">
                    <div  style={{fontSize: "1.20rem"}}>
                    enter pin
                    </div>
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
                  
                    <Button
                      size="m"
                      onClick={handlePINResend}
                      className="left-btn" 
                    >
                      <div style={{fontSize: "1.20rem"}}>
                      Resend PIN
                      </div>
                    </Button>
                    <Button
                      size="m"
                      onClick={handlePINVerify}
                      className="right-btn"
                    >
                      <div style={{fontSize: "1.20rem"}}>
                      Verify Email
                      </div>
                    </Button>
                    <div className="forgot-password">
                      <Link href="/" >
                        <a style={{fontSize: "1.20rem"}}>Skip verification</a>
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
