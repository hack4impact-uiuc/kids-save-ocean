import React from "react";
import { verify } from "../utils/api";
import NavBar from "./navbar";
import Router from "next/router";
import { setCookie } from "./../utils/cookie";

const withAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      verified: false
    };
    async componentDidMount() {
      const verifyResponse = await verify();
      const verifyResponseParsed = await verifyResponse.json();
      if (verifyResponseParsed.status === 200) {
        if (verifyResponseParsed.newToken !== undefined) {
          setCookie("token", verifyResponseParsed.newToken);
        }
        this.setState({ verified: true });
      } else {
        Router.push("/register");
      }
    }
    render() {
      return (
        <div>
          {this.state.verified ? (
            <WrappedComponent {...this.props} verified={this.state.verified} />
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
