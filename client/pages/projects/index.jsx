import React, { Component } from "react";
import { useState } from "react";
import { Head } from "../../components";
import PropTypes from "prop-types";
import Select from "react-select";

import "../../public/style.scss";
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
        <div class="form-inline">
          <div className="search-bar">
            <Input type="text" className="input" placeholder="Find a project" />
          </div>
        </div>
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
        <div className="project-cards"></div>
      </Container>
    </>
  );
}
