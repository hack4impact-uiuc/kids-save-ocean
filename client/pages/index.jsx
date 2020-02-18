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
  sdgImages = [];
  populateImagesArr = sdgImages => {
    for (let i = 1; i <= 17; i++) {
      sdgImages.push(`/sdg-images/${i}.png`);
    }
  };

  render() {
    this.populateImagesArr(this.sdgImages);
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
                    width: "150px",
                    height: "200px",
                    fontSize: "13px"
                  }}
                >
                  <CardImg
                    top
                    width="100%"
                    height="100%"
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
