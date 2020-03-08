import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Head } from "../../components";
import PropTypes from "prop-types";
import Select from "react-select";

import "../../public/styles/home.scss";
import "../../public/styles/project.scss";
import countryData from "../../utils/countries";
import UNGoalData from "../../utils/goals";
import groupSizeData from "../../utils/groups";
import levelData from "../../utils/levels";
import mockData from "../../utils/mockData";
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
  const numProjects = 21;

  const projectsToReturn = new Array(numProjects).slice(numProjects);

  for (let i = 1; i <= numProjects; i++) {
    const projObject = {
      id: i,
      projName: "- Project Name: " + mockData.projects[i].name,
      projDescrip:
        "- Description: " +
        mockData.projects[i].description.substring(0, 200) +
        "..."
    };
    projectsToReturn[i - 1] = projObject;
  }

  return projectsToReturn;
};

export default function ProjectsPage(props) {
  const projects = populateProjects();

  const router = useRouter();

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
            isMulti={true}
            className="un-goals-list"
            options={UNGoalData}
            placeholder="Select UN Goals"
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
            isClearable={true}
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            isClearable={true}
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
            isClearable={true}
          />
        </div>
        <div className="project-cards">
          <Row className="project-row">
            {projects.map(proj => (
              <Col key={proj.id} className="project-col">
                <CardGroup>
                  <Card
                    class="card"
                    className="project-card"
                    onClick={() => console.log("clicked")}
                  >
                    <CardText top width="100%" height="100%">
                      <br />
                      {proj.projName}
                      <br />
                      <br />
                      {proj.projDescrip}
                    </CardText>
                  </Card>
                </CardGroup>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <div className="padding"></div>
    </>
  );
}
