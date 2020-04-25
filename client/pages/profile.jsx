import { Button, Col, Input, Row, CardGroup, Card, CardText } from "reactstrap";
import { Head } from "../components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../public/styles/profile.scss";
import Select from "react-select";
import countryData from "../utils/countries";
import { getModels } from "../utils/apiWrapper";
import "../public/styles/profileProjects.scss";
import "../../api/public/schema/projectSchema";
import { getUser, getModelsByID } from "../utils/apiWrapper";

export default function Profile() {
  const [user, setUser] = useState("");
  const [createdProjects, setCreatedProjects] = useState([]);
  const [followedProjects, setFollowedProjects] = useState([]);
  const [projectParsed, setProjectParsed] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const DESCRIPTION_LENGTH = 150;
  const [country, setCountry] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const populateAllProjects = async () => {
      const response = await getModels(null, true);
      setProjects(response.data);
    };
    populateAllProjects();
    const getUserInfo = async () => {
      const response = await getUser();
      const resp = await response.json();
      // const resJson = await response.json();
      // setUser(resJson.data);
      setUser(resp);
      setHasUser(true);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getProjects() {
      if (hasUser && !projectParsed && user) {
        let myprojects = user.data.createdProjects;
        if (typeof myprojects[0] === "string") {
          for (let i = 0; i < myprojects.length; i++) {
            myprojects[i] = await getModelsByID(myprojects[i]);
          }
        }
        setCreatedProjects(myprojects.map(resp => resp.data));

        let followprojects = user.data.followingProjects;
        if (typeof followprojects[0] === "string") {
          for (let i = 0; i < followprojects.length; i++) {
            followprojects[i] = await getModelsByID(followprojects[i]);
          }
        }
        setFollowedProjects(followprojects.map(resp => resp.data));
        setProjectParsed(true);
      }
    }
    getProjects();
  }, [hasUser, user]);

  return (
    <>
      <Head title="Your Profile" />
      <div className="parent" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Row style={{ marginTop: "5%" }}>
          <Col xs="2">
            <div style={{ marginTop: "135%" }}>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#details">
                  <h4>
                    {" "}
                    <strong> Details </strong>{" "}
                  </h4>
                </a>
              </div>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#your_projects">
                  <h4>
                    {" "}
                    <strong> Your Projects </strong>{" "}
                  </h4>
                </a>{" "}
              </div>
              <div style={{ marginTop: "15%" }}>
                <a style={{ color: "#003366" }} href="#saved_projects">
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
                <strong>Welcome to your profile Peder!</strong>
              </div>
            </h1>
            <h2 style={{ marginTop: "5%", marginLeft: "5.3333333%" }}>
              Username
            </h2>
            <div
              className="ContainerRTE"
              style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
            >
              {/* <InputGroup> */}
              <Input placeholder="" />
              {/* </InputGroup> */}
            </div>
            <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
              Password
            </h2>
            <div
              className="ContainerRTE"
              style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
            >
              {/* <InputGroup> */}
              <Input placeholder="" />
              {/* </InputGroup> */}
            </div>
            <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
              Birthday
            </h2>
            <div
              className="ContainerRTE"
              style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
            >
              {/* <InputGroup> */}
              <Input placeholder="" />
              {/* </InputGroup> */}
            </div>
            <h2 style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
              Country
            </h2>
            <div
              className="ContainerRTE"
              style={{ marginTop: "1%", marginLeft: "5.3333333%" }}
            >
              {/* <InputGroup> */}
              <Select
                options={countryData}
                placeholder=""
                isClearable
                onChange={setCountry}
                value={country}
              />
              {/* </InputGroup> */}
            </div>
            <Row style={{ marginTop: "2%", marginLeft: "5.3333333%" }}>
              <Button size="m" className="left-btn">
                <div className=" vertAlign textField">Save Changes</div>
              </Button>
            </Row>
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
              <strong> Your Projects &darr;</strong>
            </h2>
            {/* PROJECTS */}
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
                            {/* <CardImg
                                  className="project-card-img"
                                  top
                                  width="100%"
                                  alt="Project image"
                                ></CardImg> */}
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
                                  <div className="project-likes">Likes: </div>
                                </Col>
                                <Col>
                                  <div className="project-comments">
                                    Comments:
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
              <strong> Saved Projects &darr;</strong>
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
                            {/* <CardImg
                                  className="project-card-img"
                                  top
                                  width="100%"
                                  alt="Project image"
                                ></CardImg> */}
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
                                  <div className="project-likes">Likes: </div>
                                </Col>
                                <Col>
                                  <div className="project-comments">
                                    Comments:
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
          </Col>
        </Row>
      </div>
      <div></div>
    </>
  );
}
