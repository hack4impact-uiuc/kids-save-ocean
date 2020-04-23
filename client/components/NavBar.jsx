import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
  Button,
<<<<<<< HEAD
  Row,
  Col,
  Container,
=======
  Col,
  Container
>>>>>>> cb068f7d9a0fdae9eee27c19b22d44d357250327
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
<<<<<<< HEAD
  });
=======
  }, [isTop]);
>>>>>>> cb068f7d9a0fdae9eee27c19b22d44d357250327
  function toggleNavbar() {
    setCollapsed(!isCollapsed);
  }
  return (
<<<<<<< HEAD
    <div className="enclosing-div">
      <div className="triangle"></div>
      <div className="rectangle"></div>
      <div className="triangle-2"></div>

      <Navbar
        className={`navbar-expand-lg navbar-light shadow fixed-top ${"navbar-body"}`}
      >
        <Container className="container-nav">
          <NavbarBrand className="brandblock" href="/">
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
    </div>
=======
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
>>>>>>> cb068f7d9a0fdae9eee27c19b22d44d357250327
  );
}
