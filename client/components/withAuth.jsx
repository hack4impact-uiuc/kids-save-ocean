import React from "react";
import { verify } from "../utils/apiWrapper";
import NavBar from "./NavBar";
import Router from "next/router";

const SUCCESS = 200;

const withAuth = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      verified: false,
      error: false,
    };
    async componentDidMount() {
      try {
        const verifyResponse = await verify();
        const verifyResponseParsed = await verifyResponse.json();
        if (verifyResponseParsed.status === SUCCESS) {
          if (verifyResponseParsed.newToken !== undefined) {
            localStorage.setItem("token", verifyResponseParsed.newToken);
          }
          this.setState({ verified: true });
        } else {
          Router.push("/register");
        }
      } catch {
        this.setState({ error: true });
      }
    }
    render() {
      const { verified, error } = this.state;
      return error ? (
        <p>
          An error was encountered - please contact Hack4Impact UIUC with
          details.
        </p>
      ) : (
        <div>
          {verified ? (
            <WrappedComponent {...this.props} verified={verified} />
          ) : (
            <div>
              <NavBar />
              <p> You are not authenticated </p>
            </div>
          )}
        </div>
      );
    }
  }

  return HOC;
};

export default withAuth;
