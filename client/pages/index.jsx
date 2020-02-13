import React, { Component } from "react";
import { Head } from "../components/Head";
import { Button, Input } from "reactstrap";

import "../public/style.scss";

export default class App extends Component {
  // const searchBar = {
  //   flex: 1,
  //   justifyContent: center
  // }
  render() {
    return (
      <>
        <div>
          <h1 align="center">Welcome to FateMaker!</h1>
        </div>

        <div className="searchBar">
          <Input type="text" className="input" placeholder="Search" />
        </div>
        <Button>Test</Button>
      </>
    );
  }
}
