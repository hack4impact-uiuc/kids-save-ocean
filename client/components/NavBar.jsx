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
  Container,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import Popover from "react-tiny-popover";
import Link from "next/link";
import "../public/styles/navbar.scss";

export default function NavBar() {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(true);

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

  const toggleNotifs = () => {
    console.log("CLICKED");
    setDisplayNotif(!displayNotif);
  };
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
                onClick={() => setDisplayNotif(!displayNotif)}
              />
              <Popover
                isOpen={displayNotif}
                position={"bottom"} // preferred position
                content={
                  <div>
                    <h1>Notifications</h1>
                    <p>Notification 1</p>
                  </div>
                }
              ></Popover>
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
            <NavItem>
              <Col lg={{ size: 1 }} className="divider"></Col>
            </NavItem>
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
            <NavItem className="user-col">
              <Link href="#profile">
                <a>
                  <img
                    className="nav-img"
                    src="/navbar-images/user-icon.svg"
                    alt="Profile"
                  />
                </a>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
