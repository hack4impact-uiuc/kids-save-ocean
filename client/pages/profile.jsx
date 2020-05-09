import { Button, Col, Input, Row, CardGroup, Card, CardText } from "reactstrap";
import { Head } from "../components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../public/styles/profile.scss";
import Select from "react-select";
import countryData from "../utils/countries";
import "../public/styles/profileProjects.scss";
import "../../api/public/schema/projectSchema";
import { getUser, getFollowingProjects, getCreatedProjects, updateUser } from "../utils/apiWrapper";
import { checkValidUser } from "../utils/validator";

export default function Profile() {
  const [user, setUser] = useState("");
  const [createdProjects, setCreatedProjects] = useState([]);
  const [followedProjects, setFollowingProjects] = useState([]);
  const [projectParsed, setProjectParsed] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [section, setCurrSection] = useState("Details");
  const DESCRIPTION_LENGTH = 150;
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      if (await checkValidUser()) {
        const response = await getUser();
        const resp = await response.json();
        setUser(resp.data);
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

  const toggleSectionDetails = e => {
    e.preventDefault();
    setCurrSection("Details");
  }

  const toggleSectionUserProj = e => {
    e.preventDefault();
    setCurrSection("Your Projects");
  }

  const toggleSectionSavedProj = e => {
    e.preventDefault();
    setCurrSection("Saved Projects");
  }

  const saveChanges = () => {
    const changes = {
      username: username,
      birthday: birthday,
      country: country.label
    }

    updateUser(changes);
  }

  return (
    <>
      <Head title="Your Profile" />
      <div className="parent" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Row style={{ marginTop: "5%" }}>
          <Col xs="2">
            <div style={{ marginTop: "135%" }}>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#" onClick={toggleSectionDetails}>
                  <h4>
                    {" "}
                    <strong> Details </strong>{" "}
                  </h4>
                </a>
              </div>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#" onClick={toggleSectionUserProj}>
                  <h4>
                    {" "}
                    <strong> Your Projects </strong>{" "}
                  </h4>
                </a>{" "}
              </div>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#" onClick={toggleSectionSavedProj}>
                  <h4>
                    {" "}
                    <strong>Saved Projects</strong>{" "}
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
            {section === "Details" && <div>
              <h2 style={{ marginTop: "5%", marginLeft: "5.3333333%" }}>
                Username
              </h2>
              <div
                className="ContainerRTE"
                style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
              >
                <Input placeholder={user.username} value={username} onInput={e => setUsername(e.target.value)}/>
              </div>
              <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
                Birthday
              </h2>
              <div
                className="ContainerRTE"
                style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
              >
                <Input placeholder={user.birthday} value={birthday} onInput={e => setBirthday(e.target.value)}/>
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
                  placeholder={user.country}
                  isClearable
                  onChange={setCountry}
                  value={country}
                />
              </div>
              <Row style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
                <Button size="m" className="left-btn" onClick={saveChanges}>
                  <div className=" vertAlign textField">Save Changes</div>
                </Button>
              </Row>
            </div>}
            {section === "Your Projects" && <div>
              <h2
                id="your_projects"
                justify="center"
                align="middle"
                style={{
                  marginTop: "6%",
                  marginBottom: "3%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <strong> Your Projects </strong>
              </h2>
              <Row>
                {createdProjects &&
                  createdProjects.map(project => (
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
                                  <div className="project-likes">Likes: {project.numUpvotes}</div>
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
            </div>}
            {section === "Saved Projects" && <div>
              <h2
                id="saved_projects"
                justify="center"
                align="middle"
                style={{
                  marginTop: "6%",
                  marginBottom: "3%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <strong> Saved Projects </strong>
              </h2>
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
                                    <div className="project-likes">Likes: {project.numUpvotes}</div>
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
            </div>}
          </Col>
        </Row>
      </div>
    </>
  );
}
