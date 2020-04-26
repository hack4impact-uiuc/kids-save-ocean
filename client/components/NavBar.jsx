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
import Link from "next/link";
import "../public/styles/navbar.scss";
import Router from "next/router";

export default function NavBar() {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Router.replace("/");
  }

  useEffect(() => {
    if (process.browser) {
      document.addEventListener("scroll", () => {
        let topBound = 100;
        const currTop = window.scrollY < topBound;
        if (currTop !== isTop) {
          setTop(currTop);
        }
      });
    }
  }, [isTop]);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token"));
  });

  function toggleNavbar() {
    setCollapsed(!isCollapsed);
  }

  return (
    <Navbar
      className={`navbar-expand-lg navbar-light shadow fixed-top ${"navbar-body"}`}
    >
      <Container className="container-nav">
        <NavbarBrand>
          <Link href="/">
            <a>
              <img
                className="logo-settings"
                id="logo"
                src="/homepage-images/fatemaker-logo.png"
                alt="FateMaker logo"
              />
            </a>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse navbar isOpen={!isCollapsed}>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Col className="button-col">
                <Link href="/projects">
                  <a>
                    <Button className="button-create" color="#ffcc66">
                      Explore
                    </Button>
                  </a>
                </Link>
              </Col>
            </NavItem>
            <NavItem>
              <Col className="button-col">
                <Button className="button-create" color="#ffcc66">
                  Create
                </Button>
              </Col>
            </NavItem>
            {loggedIn && <NavItem>
              <Col lg={{ size: 1 }} className="divider"></Col>
            </NavItem>}
            {loggedIn && <NavItem className="notif-col">
              <Link href="#notifications">
                <a>
                  <img
                    className="nav-img"
                    src="/navbar-images/notification-icon.svg"
                    alt="Notifications"
                  />
                </a>
              </Link>
            </NavItem>}
            {loggedIn && <NavItem className="user-col">
              <Link href="#profile">
                <a>
                  <img
                    className="nav-img"
                    src="/navbar-images/user-icon.svg"
                    alt="Profile"
                  />
                </a>
              </Link>
            </NavItem>}
            <NavItem>
              <Col lg={{ size: 1 }} className="secondDivider"></Col>
            </NavItem>
            {!loggedIn && <NavItem>
              <Col className="button-col">
                <Link href="/login">
                  <a>
                    <Button className="button-login" color="#ffcc66">
                      Login
                    </Button>
                  </a>
                </Link>
              </Col>
            </NavItem>}
            {loggedIn && <NavItem>
              <Col className="button-col">
                <Button className="button-login" color="#ffcc66" onClick={handleLogout}>
                  Logout
                </Button>
              </Col>
            </NavItem>}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
