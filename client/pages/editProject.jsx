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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visAlert, setAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const id = "5e653b729a1cbfaba98adc5b";
  const ideationStages = [
    ["Stage 1", "Description 1"] //,
    //["Stage 2", "Description 2"],
    //["Stage 3", "Description 3"]
  ];
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const loadProject = async () => {
      const project = await getModelsByID(id);

      if (project === null) {
        setAlert(false);
        setTitle(project.data[0].name);
        setDescription(project.data[0].description);
      } else {
        setAlert(true);
      }
    };

    loadProject();
  }, [visAlert]);

  return (
    <>
      <Head title={title} />
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
              <div className="div-1-ep">
                <h1 className="header2-text-ep-other">
                  <strong>{title}</strong>
                </h1>
                <h3 className="header3">{description}</h3>

                <Dropdown
                  className="dropdown"
                  isOpen={dropdownOpen}
                  toggle={toggle}
                >
                  <DropdownToggle caret>Choose SDG's</DropdownToggle>
                  <DropdownMenu>
                    <FormGroup check>
                      <Col>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            No Poverty
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Zero Hunger
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Good Health + Well-Being
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Quality Education
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Gender Equality
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Clean Water + Sanitation
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Affordable + Clean Energy
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Decent Work + Economic Growth
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Industry, Innovation + Infrastructure
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Reduced Inequalities
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Sustainable Cities + Communities
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Responsible Consumption + Production
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Climate Action
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Life Below Water
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Life on Land
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            Peace, Justice + Strong Institutions
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                        <Row>
                          <Label className="label" for="exampleCheck" check>
                            {" "}
                            Partnerships for the Goals
                          </Label>
                          <Input
                            className="input"
                            type="checkbox"
                            name="check"
                            id="exampleCheck"
                          />
                        </Row>
                      </Col>
                    </FormGroup>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Row>
          </Col>
        </Row>
        <Col>
          <Row className="other-row">
            <h2 className="header2-text-ep-other">
              {" "}
              <strong> Inspiration </strong>{" "}
            </h2>
          </Row>
          <Row className="inspo-des">
            <h4 className="header2-text-ep-other">
              Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
              elementum, enim ante posuere ante, nec suscipit tellus erat quis
              mi. Suspendisse vehicula finibus leo, ut molestie lacus eleifend
              non. Phasellus non risus nibh. In hac habitasse platea dictumst.
            </h4>
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
                id={"5e66f5600689eb59ef2c8ef3"}
                key={idx}
              />
            ))}
          </div>
          <hr className="header-row-ep" />
        </Col>
        <Col>
          <Row className="other-row">
            <h2 className="header2-text-ep-other">
              {" "}
              <strong> Ideation </strong>{" "}
            </h2>
          </Row>
          <Row className="other-row">
            <h4 className="header2-text-ep-other">
              Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
              elementum, enim ante posuere ante, nec suscipit tellus erat quis
              mi. Suspendisse vehicula finibus leo, ut molestie lacus eleifend
              non. Phasellus non risus nibh. In hac habitasse platea dictumst.
            </h4>
          </Row>
          <Row className="header-row-ep">
            <Button className="button-add">Add Stage</Button>
          </Row>
          <hr className="header-row-ep" />
        </Col>
        <Col>
          <Row className="other-row">
            <h2 className="header2-text-ep-other">
              {" "}
              <strong> Implementation </strong>{" "}
            </h2>
          </Row>
          <Row className="other-row">
            <h4 className="header2-text-ep-other">
              Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
              elementum, enim ante posuere ante, nec suscipit tellus erat quis
              mi. Suspendisse vehicula finibus leo, ut molestie lacus eleifend
              non. Phasellus non risus nibh. In hac habitasse platea dictumst.
            </h4>
          </Row>
          <Row className="header-row-ep">
            <Button className="button-add">Add Stage</Button>
          </Row>
          <hr className="header-row-ep" />
        </Col>
      </Container>
    </>
  );
}
