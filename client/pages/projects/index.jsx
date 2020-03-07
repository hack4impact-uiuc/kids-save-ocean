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

export default function(props) {
  const [dropdownOpen3, setOpen3] = useState(false);
  const toggle3 = () => setOpen3(!dropdownOpen3);

  const [dropdownOpen4, setOpen4] = useState(false);
  const toggle4 = () => setOpen4(!dropdownOpen4);

  const populateUNGoals = () => {
    let goals = new Array(17);

    for (let i = 0; i < 17; i++) {
      goals.push({
        label: UNGoalData[i]["label"]
      });
    }

    return goals;
  };

  const populateLocations = () => {
    let locations = new Array(244);

    for (let i = 0; i < 244; i++) {
      locations.push({
        label: countryData[i]["label"]
      });
    }

    return locations;
  };

  const populateGroupOptions = () => {
    let groups = new Array(5);

    for (let i = 0; i < 5; i++) {
      groups.push({
        label: groupSizeData[i]["label"]
      });
    }

    return groups;
  };

  const populateLevels = () => {
    let levels = new Array(3);

    for (let i = 0; i < 3; i++) {
      levels.push({
        label: levelData[i]["label"]
      });
    }

    return levels;
  };

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
            options={populateUNGoals()}
            placeholder="Select UN Goals"
          />
          <Select
            className="country-list"
            options={populateLocations()}
            placeholder="Search country"
          />
          <Select
            className="grp-sizes-list"
            options={populateGroupOptions()}
            placeholder="Select group size"
          />
          <Select
            className="difficulty-list"
            options={populateLevels()}
            placeholder="Select difficulty"
          />
        </div>
        <div className="project-cards"></div>
      </Container>
    </>
  );
}
