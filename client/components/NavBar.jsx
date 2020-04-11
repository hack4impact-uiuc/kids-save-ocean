import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
  Button
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
  });
  function toggleNavbar() {
    setCollapsed(!isCollapsed);
  }
  return (
    <Navbar className={`navbar-expand-lg fixed-top ${"navbar-color"}`}>
      <Container>
        <NavbarBrand href="/">
          <img
            className="icon-settings"
            id="logo"
            height="60"
            width="240"
            src="/homepage-images/fatemaker-logo.png"
            alt="FateMaker logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="tempclasstoggler" />
        <Collapse navbar isOpen={!isCollapsed}>
          <Nav navbar className="ml-auto">
            <Button className="button-create" type="primary">
              Create
            </Button>
            <NavItem href="/feed">
              <img
                className="notification-img"
                src="/homepage-images/notification-icon.png"
                alt="Notifications"
              />
            </NavItem>
            <img
              className="user-img"
              src="/homepage-images/user-icon.png"
              alt="Profile"
            />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
