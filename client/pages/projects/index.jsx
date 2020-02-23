import React, { Component } from "react";
import "../public/style.scss";
import {
  ButtonDropdown,
  DropdownItem,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";

export default class App extends Component {
  projects = []; // would need to populate 6 most popular projects based on selected tags
  populateProjectsArr = projects => {
    for (let i = 1; i <= 6; i++) {
      const projObject = {
        id: proj_i
      };
      projects.push(projObject);
    }
  };

  render() {
    return (
      <Container>
        <div className="search-bar">
          <Input type="text" className="input" placeholder="Search" />
        </div>

        <ButtonDropdown id="dropdown-un-goals" title="UN Goals">
          <DropdownItem href="#/action-1">No Poverty</DropdownItem>
          <DropdownItem href="#/action-2">Zero Hunger</DropdownItem>
          <DropdownItem href="#/action-3">
            Good Health and Well-Being
          </DropdownItem>
          <DropdownItem href="#/action-4">Quality Education</DropdownItem>
          <DropdownItem href="#/action-5">Gender Equality</DropdownItem>
          <DropdownItem href="#/action-6">
            Clean Water and Sanitation
          </DropdownItem>
          <DropdownItem href="#/action-7">
            Affordable and Clean Energy
          </DropdownItem>
          <DropdownItem href="#/action-8">
            Decent Work and Economic Growth
          </DropdownItem>
          <DropdownItem href="#/action-9">
            Industry, Innovation and Infrastructure
          </DropdownItem>
          <DropdownItem href="#/action-10">Reduced Inequalities</DropdownItem>
          <DropdownItem href="#/action-11">
            Sustainable Cities and Communities
          </DropdownItem>
          <DropdownItem href="#/action-12">
            Responsible Consumption and Production
          </DropdownItem>
          <DropdownItem href="#/action-13">Climate Action</DropdownItem>
          <DropdownItem href="#/action-14">Life Below Water</DropdownItem>
          <DropdownItem href="#/action-15">Life on Land</DropdownItem>
          <DropdownItem href="#/action-16">
            Peace, Justice and Strong Institutions
          </DropdownItem>
          <DropdownItem href="#/action-17">
            Partnerships for the Goals
          </DropdownItem>
        </ButtonDropdown>

        <ButtonDropdown id="dropdown-location" title="Location">
          <DropdownItem href="#/action-1">Action</DropdownItem>
        </ButtonDropdown>

        <ButtonDropdown id="dropdown-grp-size" title="Group Size">
          <DropdownItem href="#/action-1">Action</DropdownItem>
        </ButtonDropdown>

        <ButtonDropdown id="dropdown-difficulty" title="Difficulty">
          <DropdownItem href="#/action-1">Action</DropdownItem>
        </ButtonDropdown>

        <Row>
          {this.projects.map(proj => (
            <Col>
              <Card
                className="project-card"
                tag="a"
                onClick={() => console.log("clicked")}
                style={{
                  cursor: "pointer",
                  width: "400px",
                  height: "400px"
                }}
              ></Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
