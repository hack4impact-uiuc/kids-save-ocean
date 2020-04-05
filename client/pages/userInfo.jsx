import React from "react";
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardGroup,
  CardImg,
  Container,
} from "reactstrap";
import { Head } from "../components";
import { EditProfile } from "../components";
import "../public/styles/home.scss";

export default function UserInfo() {
  return (
    <Container>
      <Head />
      <div className="page-title" align="center">
        <h1 className="header2-text" align="center">
          <strong>Profile</strong>
        </h1>
      </div>
      <Row
        className="profile-header"
        type="flex"
        justify="center"
        xs="2"
        height="1000px"
      >
        <img
          src="/Users/ashwinsaxena/Hack4Impact/kids-save-ocean/client/public/homepage-images/stock-ocean.jpg"
          alt="Profile pic"
        />
      </Row>
      <EditProfile></EditProfile>
    </Container>
  );
}
