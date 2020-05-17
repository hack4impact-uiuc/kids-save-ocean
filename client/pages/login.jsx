import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../utils/apiWrapper";
import { Alert, Form, Button, FormGroup, Input, Row, Col } from "reactstrap";
import { Head } from "../components";
import "../public/styles/login.scss";

export default function Login() {
  // constants
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

  const defaultHeight = 1000;

  // state
  const [height, setHeight] = useState(defaultHeight);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

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

      <div>
        <Row className="parentRow">
          <Col className="columnLeft" xs="6">
            <div className="motto" style={{ height: `${height}px` }}>
              <strong>
                Change your community, <br /> Change the world.
                <br /> <br /> Join FateMaker today.
              </strong>
            </div>
          </Col>
          <Col xs="6">
            <div className="login-outer">
              <h1 className="auth-card-title">
                <strong> Login to FateMaker!</strong>
              </h1>
              {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              {/* username*/}
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

              <Row>
                <Button
                  size="m"
                  onClick={handleSubmit}
                  className="login-left-btn"
                >
                  <div className=" vertAlign textField">Login</div>
                </Button>

                <Button
                  size="m"
                  onClick={() => Router.push("/register")}
                  className="login-right-btn"
                >
                  <div className=" vertAlign textField">Register</div>
                </Button>
              </Row>
              <Row>
                <div className="forgot-password">
                  <Link href="/forgotPassword">
                    <a>Forgot Password?</a>
                  </Link>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
