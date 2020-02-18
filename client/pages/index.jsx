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
      const sdgObject = {
        id: i,
        imageLink: `/sdg-images/${i}.png`
      };
      sdgImages.push(sdgObject);
    }
  };

  render() {
    this.populateImagesArr(this.sdgImages);
    return (
      <Container>
        <div className="page-title">
          <h1 align="center">
            <strong>FateMaker</strong>
          </h1>
        </div>
        <Row>
          {this.sdgImages.map(sdgImage => (
            <Col key={sdgImage.id} className="sdg-col" sm="2">
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
                    height="100%"
                    src={sdgImage.imageLink}
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
