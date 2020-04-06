import React from "react";
import Link from "next/link";
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

class NavBar extends React.Component {
  state = {
    isTop: true,
    collapsed: true
  };
  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });
      }
    });
  }
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Navbar
        className={`navbar-expand-lg navbar-dark fixed-top ${
          this.state.isTop ? "navbar-color" : "navbar-color"
        }`}
        id={this.props.navType ? this.props.navType : "mainNav"}
        bg="primary"
        variant="dark"
      >
        <Container>
          <NavbarBrand href="/">
            <img
              className="icon-settings"
              id="logo"
              height="60"
              width="240"
              src="/homepage-images/fatemaker-logo.png"
              alttext="Hack4Impact UIUC logo"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse navbar isOpen={!this.state.collapsed}>
            <Nav navbar className="text-uppercase ml-auto">
              <Link href="/userInfo">
                <Button className="button-design-3" type="primary">
                  Create
                </Button>
              </Link>
              <NavItem href="/feed">
                <img
                  className="notification-img"
                  src="/homepage-images/notification-icon.png"
                  alt="User"
                />
              </NavItem>
              <Link href="/userInfo">
                <img
                  className="user-img"
                  src="/homepage-images/user-icon.png"
                  alt="User"
                />
              </Link>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default NavBar;
