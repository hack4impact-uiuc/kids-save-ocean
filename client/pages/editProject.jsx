import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Alert } from "reactstrap";
import { Editor, EditorState, ContentState } from "draft-js";
import Select from "react-select";
import {
  getModelsByID,
  saveDescription,
  deleteForm
} from "../utils/apiWrapper";
import { Head, Stage } from "../components";
import groupSizeData from "../utils/groups";
import "../public/styles/editProject.scss";
import { is } from "immutable";

export default function EditProjectPage() {
  const [visAlert, setAlert] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState(false);
  const [inspiration, setInspiration] = useState([]);
  const [ideation, setIdeation] = useState([]);
  const [implementation, setImplementation] = useState([]);
  const id = "5e901732090f7cdff2e6757a";

  const handleTitleChange = projTitle => {
    setProjTitle(projTitle.target.value);
  };

  const handleDescriptionChange = description => {
    setDescription(description.target.value);
  };

  const handleGrpSizeChange = grpSize => {
    setGrpSize(grpSize);
  };

  const handleInspirationChange = inspiration => {
    setInspiration(inspiration);
  };

  const handleIdeationChange = ideation => {
    setIdeation(ideation);
  };

  const handleImplementationChange = implementation => {
    setImplementation(implementation);
  };

  const deleteProject = id => {
    deleteForm(id);
  };

  // finish
  const savePhase = id => {
    //saveDescription(id, );
  };

  useEffect(() => {
    const loadProject = async () => {
      const project = await getModelsByID(id);

      if (project) {
        setAlert(false);

        setProjTitle(project.data.name);
        setDescription(project.data.description);
        setGrpSize(project.data.groupSize);

        setInspiration(project.data.phases.inspiration);
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
                    class="form-control"
                    className="editor-top"
                    rows="4"
                    cols="105"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
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
                  <Stage
                    stageName={stage.name}
                    description={stage.description}
                    phaseName={"inspiration"}
                    id={id}
                  />
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
              <Button className="save-btn" onClick={savePhase}>
                Save Phase
              </Button>
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
                  <Stage
                    stageName={stage.name}
                    description={stage.description}
                    phaseName={"ideation"}
                    id={id}
                  />
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
              <Button className="save-btn" onClick={savePhase}>
                Save Phase
              </Button>
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
                  <Stage
                    stageName={stage.name}
                    description={stage.description}
                    phaseName={"implementation"}
                    id={id}
                  />
                ))}
            </div>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
              <Button className="save-btn" onClick={savePhase}>
                Save Phase
              </Button>
            </Row>
            <hr className="header-row-ep" />
          </Col>
        </Container>
      </form>
    </>
  );
}
