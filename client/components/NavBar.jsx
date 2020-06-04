import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
  Button,
  Col,
  Container,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { ProjectForm } from "../components";

import Link from "next/link";
import "../public/styles/navbar.scss";
import { getUpdates, updateLastCheckedNotifDate } from "../utils/apiWrapper";
import WrappedMessage from "./WrappedMessage";
import Router from "next/router";
import { checkValidUser } from "../utils/validator";

export default WrappedMessage(function NavBar(props) {
  const [isTop, setTop] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(false);
  const [renderPopover, setRenderPopover] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [displayNotifDot, setDisplayNotifDot] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const waitTime = 200;

  const NOTIF_LIMIT = 10;
  const ERROR_STATUS = 400;

  useEffect(() => {
    if (process.browser) {
      setRenderPopover(true);
    }
  }, [renderPopover]);

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
    const populateNotifs = async () => {
      const validUser = await checkValidUser(false);
      if (validUser) {
        const updateRes = await getUpdates(NOTIF_LIMIT, 0);
        if (updateRes.status >= ERROR_STATUS) {
          props.setError("An error occured while retrieving notifications.");
        } else {
          const updateObj = updateRes.data.data;
          if (updateObj.shouldNotif) {
            setDisplayNotifDot(true);
          }
          setUpdates(updateObj.updates);
        }
      }
    };
    populateNotifs();
  }, [props, setDisplayNotifDot, setUpdates]);

  useEffect(toggleLoggedIn);

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
                <img
                  className="nav-img"
                  src={
                    displayNotifDot
                      ? "/navbar-images/notification-icon-red.svg"
                      : "/navbar-images/notification-icon.svg"
                  }
                  alt="Notifications"
                  id="notif-icon"
                />
                {renderPopover && (
                  <Popover
                    placement="bottom"
                    isOpen={displayNotif}
                    target="notif-icon"
                    toggle={() => {
                      setDisplayNotif(!displayNotif);
                      setDisplayNotifDot(false);
                      updateLastCheckedNotifDate();
                    }}
                  >
                    <PopoverHeader>Notifications</PopoverHeader>
                    <PopoverBody>
                      {updates.map((update) => (
                        <p key={update._id}>{`${update.description}.`}</p>
                      ))}
                    </PopoverBody>
                  </Popover>
                )}
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
});
