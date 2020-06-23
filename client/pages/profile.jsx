import { Button, Col, Input, Row, CardGroup, Card, CardText } from "reactstrap";
import { Head } from "../components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../public/styles/profile.scss";
import Select from "react-select";
import countryData from "../utils/countries";
import "../public/styles/profileProjects.scss";
import "../../api/public/schema/projectSchema";
import {
  getUser,
  getFollowingProjects,
  getCreatedProjects,
  updateUser
} from "../utils/apiWrapper";
import { checkValidUser } from "../utils/validator";
import Router from "next/router";

export default function Profile() {
  const [user, setUser] = useState("");
  const [createdProjects, setCreatedProjects] = useState([]);
  const [followedProjects, setFollowingProjects] = useState([]);
  const [projectParsed, setProjectParsed] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [section, setCurrSection] = useState("details");
  const DESCRIPTION_LENGTH = 150;
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [newChanges, setNewChanges] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const setSection = () => {
        if (Router.query.dest) {
          setCurrSection(Router.query.dest);
        }
      };

      setSection();
    }

    const getUserInfo = async () => {
      if (await checkValidUser()) {
        const resp = await getUser();
        const userResp = resp.data.user;

        setUser(userResp);
        setUsername(userResp.username);
        setBirthday(userResp.birthday);
        setCountry(userResp.country);
        setHasUser(true);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    async function getProjects() {
      if (hasUser && !projectParsed && user) {
        let resp = await getCreatedProjects();
        setCreatedProjects(resp.data);

        resp = await getFollowingProjects();
        setFollowingProjects(resp.data);

        setProjectParsed(true);
      }
    }
    getProjects();
  }, [hasUser, user, projectParsed]);

  useEffect(() => {
    if (
      hasUser &&
      (username !== user.username ||
        birthday !== user.birthday ||
        country !== user.country)
    ) {
      setNewChanges(true);
    } else {
      setNewChanges(false);
    }
  }, [username, birthday, country, user, hasUser]);

  const toggleSectionDetails = e => {
    e.preventDefault();
    setCurrSection("details");
  };

  const toggleSectionUserProj = e => {
    e.preventDefault();
    setCurrSection("projects");
  };

  const toggleSectionSavedProj = e => {
    e.preventDefault();
    setCurrSection("saved");
  };

  const saveChanges = async () => {
    const SUCCESS = 200;
    const changes = {
      username: username,
      birthday: birthday,
      country: country.label
    };

    const resp = await updateUser(changes);

    if (resp.status === SUCCESS) {
      const newUser = await getUser();
      setUser(newUser.data.user);
    }
  };

  return (
    <>
      <Head title="Your Profile" />
      <div className="parent" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Row style={{ marginTop: "5%" }}>
          <Col xs="2">
            <div style={{ marginTop: "135%" }} className="profile-sections">
              <div style={{ marginTop: "15%" }}>
                <a
                  style={{ color: "#003366" }}
                  href="#"
                  onClick={toggleSectionDetails}
                >
                  <h4>
                    {" "}
                    {section === "details" ? (
                      <strong className="profile-highlighted"> Details </strong>
                    ) : (
                      <strong> Details </strong>
                    )}{" "}
                  </h4>
                </a>
              </div>
              <div style={{ marginTop: "15%" }}>
                <a
                  style={{ color: "#003366" }}
                  href="#"
                  onClick={toggleSectionUserProj}
                >
                  <h4>
                    {" "}
                    {section === "projects" ? (
                      <strong className="profile-highlighted">
                        {" "}
                        My Projects{" "}
                      </strong>
                    ) : (
                      <strong> My Projects </strong>
                    )}{" "}
                  </h4>
                </a>{" "}
              </div>
              <div style={{ marginTop: "15%" }}>
                <a
                  style={{ color: "#003366" }}
                  href="#"
                  onClick={toggleSectionSavedProj}
                >
                  <h4>
                    {" "}
                    {section === "saved" ? (
                      <strong className="profile-highlighted">
                        Saved Projects
                      </strong>
                    ) : (
                      <strong>Saved Projects</strong>
                    )}{" "}
                  </h4>
                </a>
              </div>
            </div>
          </Col>
          <Col justify="center" align="middle" xs="2">
            <div className="gold-circle"></div>
            <div className="gold-line"></div>
          </Col>
          <Col xs="8" style={{ height: "700px", overflowY: "auto" }}>
            <h1 style={{ marginTop: "5%" }}>
              <div
                id="details"
                style={{
                  marginTop: "3%",
                  marginBottom: "3%",
                  marginLeft: "5.3333333%"
                }}
              >
                <strong>Welcome to your profile, {user.username}!</strong>
              </div>
            </h1>
            {section === "details" && (
              <div>
                <h2 style={{ marginTop: "5%", marginLeft: "5.3333333%" }}>
                  Username
                </h2>
                <div
                  className="ContainerRTE"
                  style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
                >
                  <Input
                    placeholder={username}
                    value={username}
                    onInput={e => setUsername(e.target.value)}
                  />
                </div>
                <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
                  Birthday
                </h2>
                <div
                  className="ContainerRTE"
                  style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
                >
                  <Input
                    placeholder={birthday}
                    value={birthday}
                    onInput={e => setBirthday(e.target.value)}
                  />
                </div>
                <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
                  Country
                </h2>
                <div
                  className="ContainerRTE"
                  style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
                >
                  <Select
                    options={countryData}
                    placeholder={country}
                    isClearable
                    onChange={setCountry}
                    value={country}
                  />
                </div>
                <Row style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
                  <Button
                    size="m"
                    className="left-btn"
                    onClick={saveChanges}
                    disabled={!newChanges}
                  >
                    <div className=" vertAlign textField">Save Changes</div>
                  </Button>
                </Row>
              </div>
            )}
            {section === "projects" && (
              <div>
                {createdProjects.length === 0 && (
                  <h3 className="profile-projects">
                    Create a project to see it here &darr;
                  </h3>
                )}
                {createdProjects.length > 0 && (
                  <h2 className="profile-projects">My Projects</h2>
                )}
                <Row>
                  {createdProjects.map(project => (
                    <Col key={project._id} className="project-col">
                      <CardGroup>
                        <Link
                          href="/projects/[projectId]"
                          as={`/projects/${project._id}`}
                          passHref
                        >
                          <a>
                            <Card className="project-card">
                              <CardText width="100%" height="100%">
                                <div className="project-card-name">
                                  <strong>{project.name}</strong>
                                </div>
                                <br />
                                <div className="project-card-description">
                                  {`${project.description.slice(
                                    0,
                                    DESCRIPTION_LENGTH
                                  )}${project.description.length >
                                    DESCRIPTION_LENGTH && "..."}`}
                                </div>
                                <br />
                                <Row>
                                  <Col>
                                    <div className="prof-pic"></div>
                                  </Col>
                                  <Col>
                                    <div className="username"></div>
                                  </Col>
                                  <Col>
                                    <div className="project-likes">
                                      Likes: {project.numUpvotes}
                                    </div>
                                  </Col>
                                  <Col>
                                    <div className="project-comments">
                                      Comments: {project.numComments}
                                    </div>
                                  </Col>
                                </Row>
                              </CardText>
                            </Card>
                          </a>
                        </Link>
                      </CardGroup>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {section === "saved" && (
              <div>
                {followedProjects.length === 0 && (
                  <h3 className="profile-projects">
                    Follow a project to see it here &darr;
                  </h3>
                )}
                {followedProjects.length > 0 && (
                  <h2 className="profile-projects">Saved Projects</h2>
                )}
                <Row>
                  {followedProjects &&
                    followedProjects.map(project => (
                      <Col key={project._id} className="project-col">
                        <CardGroup>
                          <Link
                            href="/projects/[projectId]"
                            as={`/projects/${project._id}`}
                            passHref
                          >
                            <a>
                              <Card className="project-card">
                                <CardText width="100%" height="100%">
                                  <div className="project-card-name">
                                    <strong>{project.name}</strong>
                                  </div>
                                  <br />
                                  <div className="project-card-description">
                                    {`${project.description.slice(
                                      0,
                                      DESCRIPTION_LENGTH
                                    )}${project.description.length >
                                      DESCRIPTION_LENGTH && "..."}`}
                                  </div>
                                  <br />
                                  <Row>
                                    <Col>
                                      <div className="prof-pic"></div>
                                    </Col>
                                    <Col>
                                      <div className="username"></div>
                                    </Col>
                                    <Col>
                                      <div className="project-likes">
                                        Likes: {project.numUpvotes}
                                      </div>
                                    </Col>
                                    <Col>
                                      <div className="project-comments">
                                        Comments: {project.numUpvotes}
                                      </div>
                                    </Col>
                                  </Row>
                                </CardText>
                              </Card>
                            </a>
                          </Link>
                        </CardGroup>
                      </Col>
                    ))}
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
