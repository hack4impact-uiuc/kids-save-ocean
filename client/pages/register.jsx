import { Component } from "react";
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

export default class extends Component {
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
    questionIdx: -1,
    dropdownOpen: false,
    securityQuestionAnswer: ""
  };

  handleGoogle = async e => {
    const result = await google(e.tokenId);
    const resp = await result.json();
    if (resp.status !== 200) {
      this.setState({ errorMessage: resp.message });
    } else {
      setCookie("token", e.tokenId);
      setCookie("google", true);
      Router.push("/");
    }
  };

  pickDropDown = (idx, e) => {
    this.setState({ questionIdx: idx });
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleChangeSecurityAnswer = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ securityQuestionAnswer: value });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const resp = await getSecurityQuestions();
    console.log(resp);
    if (!resp) {
      this.setState({ error: "unable to load data" });
      return;
    }
    const respJson = await resp.json();
    if (!!respJson.questions) {
      this.setState({ questions: respJson.questions });
    } else {
      this.setState({ loading: false, errorMessage: respJson.error.message });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (
      this.state.password === this.state.password2 &&
      this.state.questionIdx !== -1 &&
      this.state.securityQuestionAnswer !== ""
    ) {
      let result = await register(
        this.state.email,
        this.state.password,
        this.state.questionIdx,
        this.state.securityQuestionAnswer
      );
      const response = await result.json();
      if (!response.token) {
        this.setState({ errorMessage: response.message });
      } else {
        setCookie("token", response.token);
        this.setState({ successfulSubmit: true });
      }
    } else if (this.state.password !== this.state.password2) {
      this.setState({ errorMessage: "Passwords do not match " });
    } else if (this.state.questionIdx === -1) {
      this.setState({ errorMessage: "Select a question" });
    } else if (!this.state.securityQuestionAnswer) {
      this.setState({ errorMessage: "Answer not selected" });
    }
  };

  handlePINVerify = async e => {
    e.preventDefault();
    const result = await verifyPIN(this.state.pin);
    const response = await result.json();
    this.setState({ pinMessage: response.message });
    if (response.status === 200) {
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
    this.setState({ roleDropdownOpen: !this.state.roleDropdownOpen });
  };

  render = () => (
    <div>
      <Head />
      {!this.state.successfulSubmit ? (
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
                      value={this.state.email}
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
                      value={this.state.password}
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
                      value={this.state.password2}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret>
                        {this.state.questionIdx === -1
                          ? "Security Question"
                          : this.state.questions[this.state.questionIdx]}
                      </DropdownToggle>
                      <DropdownMenu>
                        {this.state.questions.map((question, idx) => (
                          <DropdownItem
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
                      value={this.state.securityQuestionAnswer}
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
                  <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                </Form>
              </CardBody>
            </Card>
          </div>
          <div className="google-btn-wrapper">
            <GoogleLogin
              className="btn sign-in-btn"
              clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
              responseType="id_token"
              buttonText={this.props.role}
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
                  <p style={{ color: "green" }}>{this.state.pinMessage}</p>
                  <Label>PIN</Label>
                  <Input
                    name="pin"
                    type="number"
                    maxLength="10"
                    minLength="4"
                    value={this.state.pin}
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
              {this.state.passwordChangeMessage}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
