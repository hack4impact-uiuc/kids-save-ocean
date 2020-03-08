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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardText,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";

const populateProjects = () => {
  var numProjects = 21;
  const projects = new Array(numProjects);

  for (let i = 1; i <= numProjects; i++) {
    const projObject = {
      id: i,
      text: "project" + i
    };
    projects[i - 1] = projObject;
  }

  return projects;
};

export default function ProjectsPage(props) {
  const projects = populateProjects();
  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <Row className="projects-top-row">
          <div className="search-bar">
            <Input type="text" className="input" placeholder="Find a project" />
          </div>
          <a
            class="asoc"
            href="https://www.google.com"
            className="notifications-icon"
          >
            <i class="fa fa-bell" aria-hidden="true"></i>
          </a>

          <a class="asoc" href="https://www.google.com" className="user-icon">
            <i class="fa fa-user" aria-hidden="true"></i>
          </a>
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
            {projects.map(text => (
              <Col key={text.id} className="project-col">
                <CardGroup>
                  <Card
                    className="project-card"
                    onClick={() => console.log("clicked")}
                  >
                    <CardText top width="100%" height="100%" />
                  </Card>
                </CardGroup>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
