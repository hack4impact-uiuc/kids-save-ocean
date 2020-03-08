import {
  Button,
  Col,
  Input,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label
} from "reactstrap";
import { getModelsByID } from "../utils/apiWrapper";
import "../public/styles/home.scss";
import "../public/styles/editProject.scss";
import "../public/styles/style.scss";
import { Head, Stage } from "../components";
import { useState } from "react";
export default function() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("Loading");
  const [description, setDescription] = useState("Loading");
  //Stages
  let ideationStages = [
    ["Stage 1", "Description 1"],
    ["Stage 2", "Description 2"],
    ["Stage 3", "Description 3"]
  ];
  const addStage = () => {
    ideationStages.push(["Added Stage Title", "Added Stage Description"]);
  };
  //Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState);
  //Set Title
  const getTitle = async () => {
    const project = await getModelsByID("5e5f20e2f182430b94c8c66d");
    return project.data[0].name;
  };
  getTitle().then(name => {
    name = setTitle(name);
  });
  //Set Description
  const getDescription = async () => {
    const project = await getModelsByID("5e5f20e2f182430b94c8c66d");
    return project.data[0].description;
  };
  getDescription().then(description => {
    description = setDescription(description);
  });
  return (
    <>
      <Head title={title} />
      {/* Icons and buttons and such */}
      <Row className="header-row-ep" justify="center" align="middle">
        <Col xs="1">
          <img className="header-img" src="/homepage-images/menu-icon.png" />
        </Col>
        <Col xs="1">
          <img className="header-img" src="/homepage-images/kso-icon.png" />
        </Col>
        <Col xs={{ size: 1, offset: 8 }}>
          <img
            className="header-img"
            src="/homepage-images/notification-icon.png"
          />
        </Col>
        <Col xs="1">
          <img className="header-img" src="/homepage-images/user-icon.png" />
        </Col>
      </Row>
      {/* Blue block and such */}
      <Row>
        <Col classname="home-block-col">
          <Row className="home-block-1-ep">
            <div className="div-1-ep">
              <h1 classname="header2-text">
                <strong>{title}</strong>
              </h1>
              <h3 classname="header3">{description}</h3>

              <Dropdown
                style={{ marginLeft: "10%" }}
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
          <h2 classname="header2-text-ep-other">
            {" "}
            <strong> Inspiration </strong>{" "}
          </h2>
        </Row>
        <Row className="inspo-des">
          <h4 className="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button className="header2-text-ep-other" onClick={() => addStage()}>
            Add Stage
          </Button>
        </Row>
        <hr className="dvider-stage" />
        <Col className="column">
          {ideationStages.map(value => {
            return <Stage props={value} />;
          })}
        </Col>
        <hr className="divider-stage" />
      </Col>
      <Col>
        <Row className="other-row">
          <h2 classname="header2-text-ep-other">
            {" "}
            <strong> Ideation </strong>{" "}
          </h2>
        </Row>
        <Row className="other-row">
          <h4 className="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button className="header2-text-ep-other">Add Stage</Button>
        </Row>
        <hr className="header-row-ep" />
      </Col>
      <Col>
        <Row className="other-row">
          <h2 classname="header2-text-ep-other">
            {" "}
            <strong> Implementation </strong>{" "}
          </h2>
        </Row>
        <Row className="other-row">
          <h4 classname="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button classname="header2-text-ep-other">Add Stage</Button>
        </Row>
        <hr className="header-row-ep" />
      </Col>
    </>
  );
}
