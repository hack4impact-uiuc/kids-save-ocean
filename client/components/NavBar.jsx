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
import { getUpdates } from "../utils/apiWrapper";
import WrappedMessage from "./WrappedMessage";
import Router from "next/router";

export default WrappedMessage(function NavBar(props) {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(false);
  const [renderPopover, setRenderPopover] = useState(false);
  const [updates, setUpdates] = useState([]);

  const NOTIF_LIMIT = 10;
  const ERROR_STATUS = 400;
  const { error } = props;

  useEffect(() => {
    if (process.browser) {
      setRenderPopover(true);
    }
  }, [renderPopover]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Router.replace("/");
  };

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
    const populateNotifs = async () => {
      const updateResp = await getUpdates(NOTIF_LIMIT, 0);
      if (updateResp.status >= ERROR_STATUS) {
        props.setError("An error occured while retriving notifications.");
      } else if (updateResp.data.length === 0) {
        setUpdates(["No new notifications."]);
      } else {
        setUpdates(updateResp.data);
      }
    };
    populateNotifs();
  }, [error]);

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
            )}
            <NavItem>
              <Col lg={{ size: 1 }} className="divider"></Col>
            </NavItem>
            <NavItem className="notif-col">
              <img
                className="nav-img"
                src="/navbar-images/notification-icon.svg"
                alt="Notifications"
                id="notif-icon"
                type="button"
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
                    {updates.map(update => (
                      <p key={update._id}>{update.description}</p>
                    ))}
                  </PopoverBody>
                </Popover>
              )}
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
});
