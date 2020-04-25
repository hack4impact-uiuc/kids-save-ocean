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
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import Link from "next/link";
import "../public/styles/navbar.scss";

export default function NavBar() {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(false);
  const [renderPopover, setRenderPopover] = useState(false);

  useEffect(() => {
    if (process.browser) {
      setRenderPopover(true);
    }
  }, [renderPopover]);

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
                    id="notif-icon"
                  />
                  {renderPopover && (
                    <Popover
                      placement="bottom"
                      isOpen={displayNotif}
                      target="notif-icon"
                      toggle={() => setDisplayNotif(!displayNotif)}
                    >
                      <PopoverHeader>Notifications</PopoverHeader>
                      <PopoverBody>
                        <p>Arpan editied project The The.</p>
                        <p>Yousef commented on project The The.</p>
                      </PopoverBody>
                    </Popover>
                  )}
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
