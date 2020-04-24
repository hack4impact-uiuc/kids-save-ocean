import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
  Button,
  Col,
  Container
} from "reactstrap";

import "../public/styles/navbar.scss";

export default function NavBar() {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      let topBound = 100;
      const currTop = window.scrollY < topBound;
      if (currTop !== isTop) {
        setTop(currTop);
      }
    });
  }, [isTop]);
  function toggleNavbar() {
    setCollapsed(!isCollapsed);
  }
  return (
    <Navbar
      className={`navbar-expand-lg navbar-light shadow fixed-top ${"navbar-body"}`}
    >
      <Container className="container-nav">
        <NavbarBrand href="/">
          <img
            className="logo-settings"
            id="logo"
            src="/homepage-images/fatemaker-logo.png"
            alt="FateMaker logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse navbar isOpen={!isCollapsed}>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Col className="button-col">
                <Button className="button-create" color="#ffcc66">
                  Explore
                </Button>
              </Col>
            </NavItem>
            <NavItem>
              <Col className="button-col">
                <Button className="button-create" color="#ffcc66">
                  Create
                </Button>
              </Col>
            </NavItem>
            <NavItem>
              <Col lg={{ size: 1 }} className="divider"></Col>
            </NavItem>
            <NavItem className="notif-col">
              <img
                className="nav-img"
                src="/navbar-images/notification-icon.svg"
                alt="Notifications"
              />
            </NavItem>
            <NavItem className="user-col">
              <img
                className="nav-img"
                src="/navbar-images/user-icon.svg"
                alt="Profile"
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
