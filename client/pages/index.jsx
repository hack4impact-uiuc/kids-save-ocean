import React, { Component } from "react";
import { Head } from "../components/Head";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";

import "../public/style.scss";

export default class App extends Component {
  // sdgNames = [
  //   "NO POVERTY",
  //   "HUNGER",
  //   "GOOD HEALTH AND WELL-BEING",
  //   "QUALITY EDUCATION",
  //   "GENDER EQUALITY",
  //   "CLEAN WATER AND SANITATION",
  //   "AFFORDABLE AND CLEAN CLEAN ENERGY",
  //   "DECENT WORK AND ECONOMIC GROWTH",
  //   "INDUSTRY, INNOVATION, AND INFRASTRUCTURE",
  //   "REDUCED INEQUALITIES",
  //   "SUSTAINABLE CITIES AND COMMUNITIES",
  //   "RESPONSIBLE CONSUMPTION AND PRODUCTION",
  //   "CLIMATE ACTION",
  //   "LIFE BELOW WATER",
  //   "LIFE ON LAND",
  //   "PEACE, JUSTICE, AND STRONG INSTITUTIONS",
  //   "PARTNERSHIPS FOR THE GOALS"
  // ];

  sdgImages = ["../public/3.png"];

  render() {
    return (
      <Container>
        <div className="search-bar">
          <Input type="text" className="input" placeholder="Search" />
        </div>
        <div className="sdg-general-info">
          <p>Description text here!</p>
        </div>
        <Row>
          {this.sdgImages.map(sdgImage => (
            <Col className="sdg-col" sm="2">
              <CardGroup>
                <Card
                  className="sdg-card"
                  tag="a"
                  onClick={() => console.log("clicked")}
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "200px",
                    fontSize: "13px"
                  }}
                >
                  <CardImg
                    top
                    width="100%"
                    src={sdgImage}
                    alt="Card image cap"
                  />
                </Card>
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
