import { Head } from "../components";
import { ProjectForm } from "../components";
import ReactPlayer from "react-player";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";

import "../public/style.scss";
const numSDGs = 17;

const populateImages = () => {
  const images = new Array(numSDGs + 1);

  for (let i = 1; i <= numSDGs; i++) {
    const sdgObject = {
      id: i,
      imageLink: `/sdg-images/${i}.png`
    };
    images[i - 1] = sdgObject;
  }

  const sdgObject = {
    id: numSDGs + 1,
    imageLink: `/sdg-images/sdg.png`
  };
  images[numSDGs] = sdgObject;

  return images;
};
const images = populateImages();
export default function() {
  return (
    <Container>
      <Row className="first-row"></Row>
      <Row className="header-row" justify="center" align="middle">
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
      <Head />

      <div className="page-title" align="center">
        <h1 className="header2-text" align="center">
          <strong>FateMaker</strong>
        </h1>
      </div>
      <Row className="home-block-1" type="flex" justify="center" xs="2">
        <Col className="home-block-col">
          <ReactPlayer url="https://www.youtube.com/watch?v=o08ykAqLOxk" />
        </Col>
        <Col className="home-block-col">
          <a className="text-link" href="about us">
            ABOUT US
          </a>
          <h1 className="header-text">Change the World,</h1>
          <h1 className="header-text" mode="single">
            one step at a time.
          </h1>
          <p className="body-text">
            The barred ratio flips under the proved nail. An umbrella brushes a
            loading ash. An anarchy purchases the compromise against the
            simulated cheek. The village parades beneath the breakdown.
          </p>
          <Row>
            <Col xs="3"></Col>
            <Col xs="2.5">
              <Button type="primary" className="button-design">
                <strong>Explore</strong>
              </Button>
            </Col>
            <Col>
              <ProjectForm></ProjectForm>
            </Col>
            <Col xs="2"></Col>
          </Row>
        </Col>
      </Row>
      <Row className="sdg-row">
        {images.map(sdgImage => (
          <Col key={sdgImage.id} className="sdg-col" sm="2">
            <CardGroup>
              <Card
                className="sdg-card"
                tag="a"
                onClick={() => console.log("clicked")}
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
      <img src="/homepage-images/filler-map.png" />
    </Container>
  );
}
