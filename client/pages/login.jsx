import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../utils/apiWrapper";
import { Alert, Form, Button, FormGroup, Input, Row, Col } from "reactstrap";
import { Head } from "../components";
import "../public/styles/login.scss";

export default function Login() {
  const EMAIL_REGEX =
    "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const result = await login(email, password);
      const resp = await result.json();

      if (!resp.token) {
        setErrorMessage(resp.message);
      } else {
        localStorage.setItem("token", resp.token);
        Router.push("/feed");
      }
    },
    [email, password]
  );

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email, password, handleSubmit]);

  return (
    <div>
      <Head />

      <div className="login-register-main">
        <Row className="parentRow">
          <Col className="columnLeft" xs="6">
            <div className="motto">
              <strong>
                Change your community, <br /> Change the world.
                <br /> <br /> Join FateMaker today.
              </strong>
            </div>
            <img
              className="login-man-img"
              src="/search-page-images/man.svg"
              alt="Login person"
            ></img>
            <img
              className="login-tree-img"
              src="/login-register-images/trees.svg"
              alt="Trees"
            ></img>
            <img
              className="login-tree-img2"
              src="/login-register-images/trees.svg"
              alt="Trees"
            ></img>
            <img
              className="login-sun-img"
              src="/login-register-images/sun.svg"
              alt="Trees"
            ></img>
          </Col>
          <Col className="columnRight" xs="6">
            <div className="login-outer">
              <h1 className="auth-card-title">Login to FateMaker!</h1>
              {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              <Row align="middle" justify="center">
                <Col xs="2" align="right" className=" vertAlign textField">
                  Email
                </Col>
                <Col xs="9">
                  <Form>
                    <FormGroup>
                      <Input
                        className="login-register-input"
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
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xs="2" align="right" className=" vertAlign textField">
                  Password
                </Col>
                <Col xs="9">
                  <Form>
                    <FormGroup>
                      <Input
                        className="login-register-input"
                        type="password"
                        name="password"
                        minLength="8"
                        maxLength="64"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  className="login-register-left-btn"
                >
                  <div className=" vertAlign textField">Login</div>
                </Button>

                <Button
                  size="m"
                  onClick={() => Router.push("/register")}
                  className="login-register-right-btn"
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
