import React, { useEffect, useState } from "react";
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
import { getModelsByID } from "../utils/apiWrapper";
import { Head, Stage } from "../components";
import "../public/styles/editProject.scss";

export default function EditProjectPage() {
  const [visAlert, setAlert] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState("");
  const [grpSizeDropDownOpen, setGrpSizeDropDownOpen] = useState(false);
  const [inspiration, setInspiration] = useState(null);
  const [ideation, setIdeation] = useState(null);
  const [implementation, setImplementation] = useState(null);
  const id = "5e901732090f7cdff2e6757a";
  const ideationStages = [
    ["beauti", "Description 1"] // ,
    // ["Stage 2", "Description 2"],
    // ["Stage 3", "Description 3"]
  ];
  const toggleGrpSize = () => setGrpSizeDropDownOpen(prevState => !prevState);

  const handleTitleChange = projTitle => {
    setProjTitle(projTitle.target.value);
  };

  const handleDescriptionChange = description => {
    setDescription(description.target.value);
  };

  const handleGrpSizeChange = grpSize => {
    setGrpSize(grpSize.target.value);
  };

  useEffect(() => {
    const loadProject = async () => {
      const project = await getModelsByID(id);

      if (project) {
        setAlert(false);
        setProjTitle(project.data.name);
        setDescription(project.data.description);
        setGrpSize(project.data.groupSize);
        console.log(grpSize); //
      } else {
        setAlert(true);
      }
    };

    loadProject();
  }, [visAlert]);

  return (
    <>
      <form className="edit-form">
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
                  <Dropdown
                    className="dropdown"
                    isOpen={grpSizeDropDownOpen}
                    toggle={toggleGrpSize}
                  >
                    <DropdownToggle caret>Change Group Size</DropdownToggle>
                    <DropdownMenu>
                      <FormGroup
                        radioGroup
                        value={grpSize}
                        onChange={handleGrpSizeChange}
                      >
                        <Col>
                          <Row>
                            <Label className="label" for="exampleCheck" check>
                              Under 5 People
                            </Label>
                            <Input
                              className="input"
                              type="radio"
                              name="check"
                              id="exampleCheck"
                            />
                          </Row>
                          <Row>
                            <Label className="label" for="exampleCheck" check>
                              {" "}
                              5+ People
                            </Label>
                            <Input
                              className="input"
                              type="radio"
                              name="check"
                              id="exampleCheck"
                            />
                          </Row>
                          <Row>
                            <Label className="label" for="exampleCheck" check>
                              {" "}
                              10+ People
                            </Label>
                            <Input
                              className="input"
                              type="radio"
                              name="check"
                              id="exampleCheck"
                            />
                          </Row>
                          <Row>
                            <Label className="label" for="exampleCheck" check>
                              20+ People
                            </Label>
                            <Input
                              className="input"
                              type="radio"
                              name="check"
                              id="exampleCheck"
                            />
                          </Row>
                          <Row>
                            <Label className="label" for="exampleCheck" check>
                              {" "}
                              50+ People
                            </Label>
                            <Input
                              className="input"
                              type="radio"
                              name="check"
                              id="exampleCheck"
                            />
                          </Row>
                        </Col>
                      </FormGroup>
                    </DropdownMenu>
                  </Dropdown>
                  <h4 className="proj-descrip-h">Project Description</h4>
                  <input
                    type="text"
                    class="form-control"
                    className="editor-top"
                    size="100"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></input>
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
            <Row className="inspo-des">
              <h4 className="header2-text-ep-other"></h4>
            </Row>
            <Row className="header-row-ep">
              <Button className="button-add">Add Stage</Button>
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
            <hr className="header-row-ep" />
            <Row>
              <h2 className="header2-text-ep-other">
                {" "}
                <strong> Ideation </strong>{" "}
              </h2>
            </Row>
            <Row className="other-row">
              <h4 className="header2-text-ep-other"></h4>
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
            <Row className="other-row">
              <h4 className="header2-text-ep-other"></h4>
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
