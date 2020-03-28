import Link from "next/link";
import Router from "next/router";
import { login, google } from "../utils/apiWrapper";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { setCookie } from "./../utils/cookie";
import { Head } from "../components";
import "../public/styles/auth.scss";

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
const SUCCESS = 200;
import { GoogleLogin } from "react-google-login";
import React, { Component } from "react";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    username: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    const result = await login(email, password);
    const resp = await result.json();

    if (!resp.token) {
      this.setState({ errorMessage: resp.message });
    } else {
      setCookie("token", resp.token);
      Router.push("/");
    }
  };

  render = () => {
    const { email, password, errorMessage } = this.state;
    const { role } = this.props;
    return (
      <div>
        <Head />
        <div className="auth-card-wrapper">
          <Card className="auth-card" style={{ width: "400px", height: "60%" }}>
            <CardTitle>
              <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Login</h3>
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
                    id="examplePassword"
                    minLength="8"
                    maxLength="64"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="lg"
                  onClick={this.handleSubmit}
                  style={{ float: "left", width: "49%" }}
                >
                  Log In
                </Button>{" "}
                <Button
                  color="success"
                  size="lg"
                  onClick={() => Router.push("/register")}
                  style={{ float: "right", width: "49%" }}
                >
                  Register
                </Button>
              </Form>
              <p style={{ color: "red", paddingTop: "70px" }}>
                {errorMessage ? errorMessage : ""}
              </p>
              <Link prefetch href="/forgotPassword">
                <a>Forgot Password?</a>
              </Link>
            </CardBody>
          </Card>
        </div>
        <br />
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
        <br />
      </div>
    );
  };
}
export default Login;
