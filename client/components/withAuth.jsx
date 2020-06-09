import React from "react";
import { verify } from "../utils/apiWrapper";
import NavBar from "./NavBar";
import Router from "next/router";

const SUCCESS = 200;

const withAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      verified: false
    };
    async componentDidMount() {
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
    }
    render() {
      const { verified } = this.state;
      return (
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
