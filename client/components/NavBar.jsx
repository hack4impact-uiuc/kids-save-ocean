import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
  Button,
  Col,
  Container
} from "reactstrap";
import { ProjectForm } from "../components";

import Link from "next/link";
import "../public/styles/navbar.scss";
import Router from "next/router";
import { checkValidUser } from "../utils/validator";

export default function NavBar() {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const waitTime = 200;

  const handleLogout = () => {
    localStorage.removeItem("token");
    Router.replace("/");
  };
  async function handleCreate() {
    const isLoggedIn = await checkValidUser();
    if (isLoggedIn) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
      }, waitTime);
    }
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
    toggleLoggedIn();
  });

  function toggleLoggedIn() {
    setLoggedIn(localStorage.getItem("token"));
  }

  function toggleNavbar() {
    setCollapsed(!isCollapsed);
  }

  return (
    <Navbar
      className={`navbar-expand-lg navbar-light shadow fixed-top ${"navbar-body"}`}
    >
      <ProjectForm isModalActivated={modal}></ProjectForm>
      <Container className="container-nav">
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
                <Button
                  className="button-create"
                  onClick={handleCreate}
                  color="#ffcc66"
                >
                  Create
                </Button>
              </Col>
            </NavItem>
            {loggedIn && (
              <NavItem>
                <Col lg={{ size: 1 }} className="divider"></Col>
              </NavItem>
            )}
            {loggedIn && (
              <NavItem className="notif-col">
                <Link href="#notifications">
                  <a>
                    <img
                      className="nav-img"
                      src="/navbar-images/notification-icon.svg"
                      alt="Notifications"
                    />
                  </a>
                </Link>
              </NavItem>
            )}
            {loggedIn && (
              <NavItem className="user-col">
                <Link href="/profile">
                  <a>
                    <img
                      className="nav-img"
                      src="/navbar-images/user-icon.svg"
                      alt="Profile"
                    />
                  </a>
                </Link>
              </NavItem>
            )}
            <NavItem>
              <Col lg={{ size: 1 }} className="secondDivider"></Col>
            </NavItem>
            {!loggedIn && (
              <NavItem>
                <Col className="button-col">
                  <Link href="/login">
                    <a>
                      <Button className="button-login" color="#ffcc66">
                        Login
                      </Button>
                    </a>
                  </Link>
                </Col>
              </NavItem>
            )}
            {loggedIn && (
              <NavItem>
                <Col className="button-col">
                  <Button
                    className="button-login"
                    color="#ffcc66"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Col>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
