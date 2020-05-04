import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Alert } from "reactstrap";
import { Editor, EditorState, ContentState } from "draft-js";
import Select from "react-select";
import {
  Button,
  Col,
  Input,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Container,
  Alert
} from "reactstrap";
import { getModelsByID, checkAdminPrivilege } from "../utils/apiWrapper";
import { Head, Stage } from "../components";
import "../public/styles/editProject.scss";
import { is } from "immutable";

export default function EditProjectPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [visAlert, setAlert] = useState(false);

  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState(false);

  const [inspiration, setInspiration] = useState([]);
  const [ideation, setIdeation] = useState([]);
  const [implementation, setImplementation] = useState([]);

  const id = "5e901732090f7cdff2e6757a";
  const ideationStages = [
    ["beauti", "Description 1"]
    // ["Stage 2", "Description 2"],
    // ["Stage 3", "Description 3"]
  ];
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const checkPriv = async () => {
      const raw_priv = await checkAdminPrivilege(id);
      const isAdmin = await raw_priv.json();
      const success_status = 200;
      if (isAdmin.status === success_status) {
        setIsAdmin(true);
        console.log("HIII");
      } else {
        console.log(isAdmin);
      }
    };
    checkPriv();
  }, []);

  useEffect(() => {
    const loadProject = async () => {
      const project = await getModelsByID(id);

      if (project) {
        setAlert(false);

        setProjTitle(project.data.name);
        setDescription(project.data.description);
        setGrpSize(project.data.groupSize);

        setInspiration(project.data.phases.inspiration);
        console.log(project.data.phases.inspiration); // to delete

        setIdeation(project.data.phases.ideation);
        setImplementation(project.data.phases.implementation);
      } else {
        setAlert(true);
      }
    };

    loadProject();
  }, [visAlert]);

  return (
    <>
      <form>
        <Head title="" />
        <Container>
          {visAlert && (
            <Alert color="danger">
              <div justify="center" align="middle">
                Load Failed
              </div>
            </Alert>
          )}
          <Row>
            <Col className="home-block-col">
              <Row className="home-block-1-ep">
                <h1 className="proj-title">
                  <strong>Edit Project</strong>
                </h1>
                <div className="div-1-ep">
                  <h4 className="proj-title-h">Project Title</h4>
                  <input
                    type="text"
                    className="form-control"
                    className="editor-top"
                    size="50"
                    value={projTitle}
                    onChange={handleTitleChange}
                  ></input>
                  <h4 className="num-ppl-h">How many people?</h4>
                  <Select
                    isClearable
                    className="grp-sizes-list"
                    options={groupSizeData}
                    placeholder="Change group size"
                    value={grpSize}
                    onChange={handleGrpSizeChange}
                  />
                  <h4 className="proj-descrip-h">Project Description</h4>
                  <textarea
                    className="form-control"
                    className="editor-top"
                    rows="4"
                    cols="105"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                  <Button className="save-top-btn" onClick={saveTopChanges}>
                    Save Changes
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
          <Col>
            <Row className="other-row">
              <Button className="inspiration-btn">Inspiration</Button>
              <Button className="ideation-btn">Ideation</Button>
              <Button className="implementation-btn">Implementation</Button>
              <Button className="delete-btn" onClick={deleteProject}>
                <a href="/projects">Delete Project</a>
              </Button>
            </Row>
            <Row>
              <h2 className="header2-text-ep-other">
                {" "}
                <strong> Inspiration </strong>{" "}
              </h2>
            </Row>
            <hr className="divider-stage" />
            <div className="stages">
              {inspiration.stages &&
                inspiration.stages.map(stage => (
                  <div className="stages">
                    <h2>{stage.name}</h2>
                    <h5>{stage.description}</h5>
                  </div>
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
            </Row>
            <hr className="header-row-ep" />
            <Row>
              <h2 className="header2-text-ep-other">
                {" "}
                <strong> Ideation </strong>{" "}
              </h2>
            </Row>
            <div className="stages">
              {ideation.stages &&
                ideation.stages.map(stage => (
                  <div className="stages">
                    <h2>{stage.name}</h2>
                    <h5>{stage.description}</h5>
                  </div>
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
            </Row>
            <hr className="header-row-ep" />
            <Row>
              <h2 className="header2-text-ep-other">
                {" "}
                <strong> Implementation </strong>{" "}
              </h2>
            </Row>
            <div className="stages">
              {implementation.stages &&
                implementation.stages.map(stage => (
                  <div className="stages">
                    <h2>{stage.name}</h2>
                    <h5>{stage.description}</h5>
                  </div>
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
            </Row>
            <hr className="header-row-ep" />
          </Col>
        </Container>
      </form>
    </>
  );
}
