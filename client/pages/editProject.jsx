import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Label, Container, Alert } from "reactstrap";
import Select from "react-select";
import { getModelsByID } from "../utils/apiWrapper";
import { Head, Stage } from "../components";
import groupSizeData from "../utils/groups";
import "../public/styles/editProject.scss";
import { is } from "immutable";

export default function EditProjectPage() {
  const [visAlert, setAlert] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState(false);
  const [inspiration, setInspiration] = useState(null);
  const [ideation, setIdeation] = useState(null);
  const [implementation, setImplementation] = useState(null);
  const id = "5e901732090f7cdff2e6757a";
  const ideationStages = [
    ["beauti", "Description 1"] // ,
    // ["Stage 2", "Description 2"],
    // ["Stage 3", "Description 3"]
  ];

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

  useEffect(() => {
    const loadProject = async () => {
      const project = await getModelsByID(id);

      if (project) {
        setAlert(false);

        setProjTitle(project.data.name);
        setDescription(project.data.description);
        setGrpSize(project.data.groupSize);

        setInspiration(project.data.phases.inspiration);
        console.log(project.data.phases.inspiration);
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
                    class="form-control"
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
            </Row>
            <Row>
              <h2 className="header2-text-ep-other">
                {" "}
                <strong> Inspiration </strong>{" "}
              </h2>
            </Row>
            <hr className="divider-stage" />
            <div className="stages">
              {ideationStages.map((value, idx) => (
                <Stage
                  stageName={value[0]}
                  description={value[1]}
                  phaseName={"inspiration"}
                  id={id}
                  key={idx}
                />
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
