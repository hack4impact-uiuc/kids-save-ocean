import React from "react";
import { Head } from "../components";
import Link from "next/link";
import ReactPlayer from "react-player";
import {
  Button,
  Card,
  CardGroup,
  CardImg,
  Col,
  Container,
  Row
} from "reactstrap";

import "../public/styles/home.scss";

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

export default function App() {
  const images = populateImages();
  return (
    <>
      <Head />
      <Container>
        <div className="page-title">
          <h1 className="header2-text" align="center">
            <strong>FateMaker</strong>
          </h1>
        </div>
        <Row className="home-block-1" type="flex" justify="center" xs="2">
          <Col className="home-block-col">
            <ReactPlayer url="https://youtu.be/dQw4w9WgXcQ" />
          </Col>
          <Col className="home-block-col">
            <Link href="#about us">
              <a className="text-link" href="/">
                ABOUT US
              </a>
            </Link>
            <h1 className="header-text">Change the World,</h1>
            <h1 className="header-text" mode="single">
              one step at a time.
            </h1>
            <p className="body-text">
              The barred ratio flips under the proved nail. An umbrella brushes
              a loading ash. An anarchy purchases the compromise against the
              simulated cheek. The village parades beneath the breakdown.
            </p>
            <Row type="flex">
              <Col span={18}>
                <div className="home-page-btns">
                  <Link href={"/projects"}>
                    <Button type="primary" className="primary-btn">
                      <strong>Find Projects</strong>
                    </Button>
                  </Link>
                  <Button type="primary" className="second-btn">
                    <strong>Start a Project</strong>
                  </Button>
                </div>
              </Col>
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
        <img src="/homepage-images/filler-map.png" alt="Map" />
      </Container>
    </>
  );
}
