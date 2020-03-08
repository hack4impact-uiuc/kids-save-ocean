import {
  Button,
  Card,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Jumbotron,
  Alert,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselCaption,
  CarouselItem,
  FormGroup,
  Label
} from "reactstrap";
import {
  deleteForm,
  editModel,
  addModel,
  getModelsByID,
  getModels
} from "../utils/apiWrapper";
import "../public/style.scss";
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
  console.log(ideationStages);
  let addStage = () => {
    ideationStages.push(["Added Stage Title", "Added Stage Description"]);
    console.log(ideationStages);
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
      <Row
        className="header-row"
        justify="center"
        align="middle"
        style={{ marginRight: "15%", marginLeft: "15%", marginBottom: "2.5%" }}
      >
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
      <Row style={{}}>
        <Col classname="home-block-col">
          <Row
            className="home-block-1"
            style={{ marginRight: "11%", marginLeft: "11%", marginTop: "5%" }}
          >
            <div style={{ paddingBottom: "5%", paddingTop: "5%" }}>
              <h1
                classname="header2-text"
                style={{ marginLeft: "10%", paddingBottom: "2.5%" }}
              >
                <strong>{title}</strong>
              </h1>
              <h3
                style={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  paddingBottom: "2.5%",
                  color: "white"
                }}
              >
                {description}
              </h3>

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
                      <Label
                        for="exampleCheck"
                        style={{ marginLeft: "11%" }}
                        check
                      >
                        No Poverty
                      </Label>
                      <Input
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                        style={{ marginLeft: "1%" }}
                      />
                    </Row>
                    <Row>
                      <Label
                        for="exampleCheck"
                        style={{ marginLeft: "11%" }}
                        check
                      >
                        {" "}
                        Zero Hunger
                      </Label>
                      <Input
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                        style={{ marginLeft: "1%" }}
                      />
                    </Row>
                    <Row>
                      <Label
                        for="exampleCheck"
                        style={{ marginLeft: "11%" }}
                        check
                      >
                        {" "}
                        Good Health & Well-Being
                      </Label>
                      <Input
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                        style={{ marginLeft: "1%" }}
                      />
                    </Row>
                    <Row>
                      <Label
                        for="exampleCheck"
                        style={{ marginLeft: "11%" }}
                        check
                      >
                        Quality Education
                      </Label>
                      <Input
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                        style={{ marginLeft: "1%" }}
                      />
                    </Row>
                    <Row>
                      <Label
                        for="exampleCheck"
                        style={{ marginLeft: "11%" }}
                        check
                      >
                        {" "}
                        Gender Equality
                      </Label>
                      <Input
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                        style={{ marginLeft: "1%" }}
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
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%",
            marginTop: "2.5%"
          }}
        >
          <h2
            classname="header2-text"
            style={{ marginLeft: "10%", marginRight: "10%" }}
          >
            {" "}
            <strong> Inspiration </strong>{" "}
          </h2>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "1%",
            marginTop: "2.5%"
          }}
        >
          <h4 style={{ marginLeft: "10%", marginRight: "10%" }}>
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%"
          }}
        >
          <Button
            style={{ marginLeft: "10%", marginRight: "10%" }}
            onClick={() => addStage()}
          >
            Add Stage
          </Button>
        </Row>
        <hr
          style={{ marginRight: "25%", marginLeft: "25%", marginBottom: "0%" }}
        />
        <Col
          style={{ marginLeft: "25%", marginRight: "25%", marginBottom: "1%" }}
        >
          {ideationStages.map(value => {
            console.log(value);
            return <Stage props={value} />;
          })}
        </Col>
        <hr
          style={{ marginRight: "25%", marginLeft: "25%", marginBottom: "0%" }}
        />
      </Col>
      <Col>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%",
            marginTop: "2.5%"
          }}
        >
          <h2
            classname="header2-text"
            style={{ marginLeft: "10%", marginRight: "10%" }}
          >
            {" "}
            <strong> Ideation </strong>{" "}
          </h2>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%",
            marginTop: "2.5%"
          }}
        >
          <h4 style={{ marginLeft: "10%", marginRight: "10%" }}>
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%"
          }}
        >
          <Button style={{ marginLeft: "10%", marginRight: "10%" }}>
            Add Stage
          </Button>
        </Row>
        <hr
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%"
          }}
        />
      </Col>
      <Col>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%",
            marginTop: "2.5%"
          }}
        >
          <h2
            classname="header2-text"
            style={{ marginLeft: "10%", marginRight: "10%" }}
          >
            {" "}
            <strong> Implementation </strong>{" "}
          </h2>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%",
            marginTop: "2.5%"
          }}
        >
          <h4 style={{ marginLeft: "10%", marginRight: "10%" }}>
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%"
          }}
        >
          <Button style={{ marginLeft: "10%", marginRight: "10%" }}>
            Add Stage
          </Button>
        </Row>
        <hr
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "2.5%"
          }}
        />
      </Col>
    </>
  );
}
