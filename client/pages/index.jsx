import { Component } from "react";
import { Head } from "../components/Head";
import ReactPlayer from "react-player";
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
    const sdgObject = {
      id: 18,
      imageLink: `/sdg-images/sdg.png`
    };
    sdgImages.push(sdgObject);
  };

  render() {
    this.populateImagesArr(this.sdgImages);
    return (
      <Container>
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
            <a className="text-link" href="about us">
              ABOUT US
            </a>
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
                <Button type="primary">
                  <strong>Find Projects</strong>
                </Button>{" "}
                <Button type="primary">
                  <strong>Start a Project</strong>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="sdg-row">
          {this.sdgImages.map(sdgImage => (
            <Col key={sdgImage.id} className="sdg-col" sm="2">
              <CardGroup>
                <Card
                  className="sdg-card"
                  tag="a"
                  onClick={() => console.log("clicked")}
                  // style={{
                  //   cursor: "pointer",
                  //   width: "200px",
                  //   height: "200px",
                  //   fontSize: "13px"
                  // }}
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
}
