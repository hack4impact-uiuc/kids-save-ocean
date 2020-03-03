import React, { Component } from "react";
import { useState } from "react";
import { Head } from "../../components";
import PropTypes from "prop-types";
import Select from "react-select";
import SelectSearch from "react-select-search";

import "../../public/style.scss";
import countryData from "../../utils/countries";
import {
  Button,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
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

export default function(props) {
  const [dropdownOpen1, setOpen1] = useState(false);
  const toggle1 = () => setOpen1(!dropdownOpen1);

  const [dropdownOpen2, setOpen2] = useState(false);
  const toggle2 = () => setOpen2(!dropdownOpen2);

  const [dropdownOpen3, setOpen3] = useState(false);
  const toggle3 = () => setOpen3(!dropdownOpen3);

  const [dropdownOpen4, setOpen4] = useState(false);
  const toggle4 = () => setOpen4(!dropdownOpen4);

  const populateLocations = () => {
    let locations = new Array(244);

    for (let i = 0; i < 244; i++) {
      locations.push({
        name: countryData[i]["name"]
      });
    }

    return locations;
  };

  const locations = populateLocations();

  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <div className="search-bar">
          <Input type="text" className="input" placeholder="Find a project" />
        </div>
        <div className="dropdowns">
          <div className="dropdown-goals">
            <ButtonDropdown id="goals" isOpen={dropdownOpen1} toggle={toggle1}>
              <DropdownToggle caret>UN Goals</DropdownToggle>
              <DropdownMenu>
                <DropdownItem id="goal-1">No Poverty</DropdownItem>
                <DropdownItem id="goal-2">Zero Hunger</DropdownItem>
                <DropdownItem id="goal-3">
                  Good Health and Well-Being
                </DropdownItem>
                <DropdownItem id="goal-4">Quality Education</DropdownItem>
                <DropdownItem id="goal-5">Gender Equality</DropdownItem>
                <DropdownItem id="goal-6">
                  Clean Water and Sanitation
                </DropdownItem>
                <DropdownItem id="goal-7">
                  Affordable and Clean Energy
                </DropdownItem>
                <DropdownItem id="goal-8">
                  Decent Work and Economic Growth
                </DropdownItem>
                <DropdownItem id="goal-9">
                  Industry, Innovation and Infrastructure
                </DropdownItem>
                <DropdownItem id="goal-10">Reduced Inequalities</DropdownItem>
                <DropdownItem id="goal-11">
                  Sustainable Cities and Communities
                </DropdownItem>
                <DropdownItem id="goal-12">
                  Responsible Consumption and Production
                </DropdownItem>
                <DropdownItem id="goal-13">Climate Action</DropdownItem>
                <DropdownItem id="goal-14">Life Below Water</DropdownItem>
                <DropdownItem id="goal-15">Life On Land</DropdownItem>
                <DropdownItem id="goal-16">
                  Peace, Justice and Strong Institutions
                </DropdownItem>
                <DropdownItem id="goal-17">
                  Partnerships for the Goals
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="dropdown-locations">
            <Select
              className="country"
              options={locations}
              placeholder="Search country"
            />
          </div>
          <div className="dropdown-grp-sizes">
            <ButtonDropdown
              id="grp-sizes"
              isOpen={dropdownOpen3}
              toggle={toggle3}
            >
              <DropdownToggle caret>Group Size</DropdownToggle>
              <DropdownMenu>
                <DropdownItem id="under-5">Under 5 People</DropdownItem>
                <DropdownItem id="5+">5+ People</DropdownItem>
                <DropdownItem id="10+">10+ People</DropdownItem>
                <DropdownItem id="20+">20+ People</DropdownItem>
                <DropdownItem id="50+">50+ People</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="dropdown-difficulty">
            <ButtonDropdown
              id="difficulty"
              isOpen={dropdownOpen4}
              toggle={toggle4}
            >
              <DropdownToggle caret>Difficulty</DropdownToggle>
              <DropdownMenu>
                <DropdownItem id="beginner">Beginner</DropdownItem>
                <DropdownItem id="moderate">Moderate</DropdownItem>
                <DropdownItem id="difficult">Difficult</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </Container>
    </>
  );
}
