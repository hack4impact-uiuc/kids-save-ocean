import React, { useEffect, useState } from "react";
import { Head } from "../components";
import Link from "next/link";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardGroup,
  CardImg
} from "reactstrap";

import UNGoals from "../utils/goals";
import "../public/styles/home.scss";
import { checkValidUser } from "../utils/validator";
import Router from "next/router";

export default function Home() {
  const [validUser, setIsValidUser] = useState(false);
  const [features, setFeatures] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const items = [
    {
      src: "/homepage-images/stock-ocean.jpg",
      altText: "Sustainability Rules!",
      caption: "Sustainability Rules!"
    },
    {
      src: "/homepage-images/stock-ocean.jpg",
      altText: "Sustainability Rules!",
      caption: "Sustainability Rules!"
    },
    {
      src: "/homepage-images/stock-ocean.jpg",
      altText: "Sustainability Rules!",
      caption: "Sustainability Rules!"
    }
  ];
  const next = () => {
    if (animating) {
      return;
    }
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) {
      return;
    }
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) {
      return;
    }
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <Card className="featured-card">
          <CardImg
            width="100%"
            src="/homepage-images/stock-ocean.jpg"
            alt="Card image cap"
          ></CardImg>
          <CardBody className="featured-body">
            <CardTitle className="featured-caption-title">
              <strong>Sustainable Recycling Project</strong>
            </CardTitle>
            <CardText className="featured-description">
              A project which helps people take over the world and save it at
              the same time.
            </CardText>
            <div className="featured-footer">
              <div className="featured-interactions">
                123{" "}
                <img
                  className="featured-comment-icon"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="featured-like-icon"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        {/* <img src={item.src} className="carousel-hp-image" alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  useEffect(() => {
    const checkCurrUser = async () => {
      setIsValidUser(await checkValidUser(false));
    };
    console.log("HI");
    if (validUser) {
      Router.replace("/feed");
    }
    checkCurrUser();
  }, [validUser]);

  return (
    <div>
      <Head />
      <div className="header-box">
        <div className="header-title">Save the world, one step at a time</div>
        <div className="header-subtitle">
          We help you find and launch sustainability projects in your community.
        </div>
        <div>
          <Link href="/projects">
            <a>
              <Button className="explore-button" color="#003366">
                Discover Projects
              </Button>
            </a>
          </Link>
        </div>
        <div className="main-figures">
          <img
            className="figures-img"
            src="/homepage-images/main-figures.png"
            alt="Notifications"
          ></img>
        </div>
      </div>
      <div className="second-div">
        <Row className="art-row">
          <Col className="figma-art-col-left">
            <img
              className="figma-img"
              src="/homepage-images/figma-art.png"
              alt="Figma Art"
            ></img>
          </Col>
          <Col className="figma-art-col-right">
            {/* <Row className="figma-text">
              <Col> */}
            <Row className="about-text">ABOUT THE PROJECTS</Row>
            <Row className="hcd-title">Human Centered Design</Row>
            <Row className="hcd-desc">
              We help you launch your sustainability project by using human
              centered design. Projects will follow a process of Inspiration,
              Ideation, and Implementation.
            </Row>
            {/* </Col>
            </Row> */}
          </Col>
        </Row>
      </div>
      <div className="third-div">
        <div className="hp-featured-title">Featured Projects</div>
        <div className="hp-featured-cards">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </div>
      </div>
      <Container>
        <div className="hp-featured-title">
          The Sustainable Development Goals
        </div>
        <div className="hp-sdg-desc">
          The UN has set 17 goals which promote country development while also
          protecting the Earth. These goals were adopted in 2015 alongside a
          15-year plan to achieve these goals. The SDGs serve as the core
          driving force behind the projects on FateMaker.
        </div>
        {/* <Row className="home-block-1" type="flex" justify="center" xs="2">
          <Col className="home-block-col">
            <ReactPlayer url="https://www.youtube.com/watch?v=o08ykAqLOxk" />
          </Col>
          <Col className="home-block-col">
            <Link href="#about-us">
              <a className="text-link" href="#about-us">
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
            <Row>
              <Col xs="3"></Col>
              <Col xs="2.5">
                <Link href="/projects">
                  <Button type="primary" className="button-design">
                    <a href="/projects">
                      <strong>Explore</strong>
                    </a>
                  </Button>
                </Link>
              </Col>
              <Col>
                <ProjectForm></ProjectForm>
              </Col>
              <Col xs="2"></Col>
            </Row>
          </Col>
  </Row> */}
        <Row className="sdg-row">
          {UNGoals.map(sdg => (
            <Col key={sdg.value} className="sdg-col" sm="2">
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
                    src={sdg.imageLink}
                    alt="Card image cap"
                  />
                </Card>
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
