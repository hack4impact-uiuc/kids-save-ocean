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
  Container
} from "reactstrap";
import { getModelsByID } from "../utils/apiWrapper";
import { Head, Stage } from "../components";
import { useState } from "react";
import "../public/styles/editProject.scss";

export default function() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const id = "5e653b729a1cbfaba98adc5b"
  //Stage
  let ideationStages = [
    ["Stage 1", "Description 1"],
    ["Stage 2", "Description 2"],
    ["Stage 3", "Description 3"]
  ];
  //Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState);
  //Get Title
  const [title, setTitle] = useState("Loading");
  const getTitle = async () => {
    const project = await getModelsByID(id);
    return project.data[0].name;
  };
  getTitle().then(name => {
    name = setTitle(name);
  });
  //Set Description
  const [description, setDescription] = useState("Loading");
  const getDescription = async () => {
    const project = await getModelsByID(id);
    return project.data[0].description;
  };
  getDescription().then(description => {
    description = setDescription(description);
  });
  return (
    <>
      <Head title={title} />
      <Container>
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
                      {/* <Label for="exampleSelectMulti">Select Multiple</Label> */}
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
                          Good Health & Well-Being
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
            <Button
              className="header2-text-ep-other"
              onClick={() => addStage()}
            >
              Add Stage
            </Button>
          </Row>
          <hr className="divider-stage" />
          {/* <Col className="column"> */}
          <div className="stages">
            {ideationStages.map(value => (
              <Stage props={value} />
            ))}
          </div>
          {/* </Col> */}
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
            <Button className="header2-text-ep-other">Add Stage</Button>
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
            <Button className="header2-text-ep-other">Add Stage</Button>
          </Row>
          <hr className="header-row-ep" />
        </Col>
      </Container>
    </>
  );
}
