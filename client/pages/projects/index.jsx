import React, { Component } from "react";
import { useState } from "react";
import { Head } from "../../components";
import PropTypes from "prop-types";
import Select from "react-select";

import "../../public/styles/home.scss";
//import "../../public/styles/project.scss";
import countryData from "../../utils/countries";
import UNGoalData from "../../utils/goals";
import groupSizeData from "../../utils/groups";
import levelData from "../../utils/levels";
import { IconButton } from "@material/react-icon-button";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";

export default function ProjectsPage(props) {
  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <Row className="projects-top-row">
          <div className="search-bar">
            <Input type="text" className="input" placeholder="Find a project" />
          </div>
          <Button
            className="notifications-btn"
            onClick={() => console.log("clicked")}
          >
            Notifications
          </Button>
          <Button className="user-btn" onClick={() => console.log("clicked")}>
            User
          </Button>
        </Row>
        <div className="dropdowns">
          <Select
            isMulti
            className="un-goals-list"
            options={UNGoalData}
            placeholder="Select UN Goals"
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
          />
        </div>
        <div className="project-cards">
          <Row className="project-row">
            <Col className="project-col">
              <CardGroup>
                <Card className="project-card">
                  <CardImg top width="100%" height="100%" />
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
