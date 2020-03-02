import React, { Component } from "react";
import { useState } from "react";
import { Head } from "../../components";
import PropTypes from "prop-types";
import "../../public/style.scss";
//import "../../bootstrap/dist/js/bootstrap.bundle";
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

// populate locations for locations drop down
const populateLocations = () => {};

export default function(props) {
  const locations = populateLocations();

  //const [dropdownOpen, setOpen] = useState(true);
  //const toggle = () => setOpen(dropdownOpen);

  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <div className="search-bar">
          <Input type="text" className="input" placeholder="Find a project" />
        </div>
      </Container>
    </>
  );
}
