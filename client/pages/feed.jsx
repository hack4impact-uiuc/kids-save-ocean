import React from "react";
import { ScrollDetector, Head } from "../components";
import { Container } from "reactstrap";

export default function Feed() {
  return (
    <Container>
      <Head />
      <div className="page-title" align="center">
        <h1 className="header2-text" align="center">
          <strong>Welcome</strong>
        </h1>
      </div>
      <h1>Recommended FateMakers to Follow!</h1>
      <ScrollDetector></ScrollDetector>
    </Container>
  );
}
