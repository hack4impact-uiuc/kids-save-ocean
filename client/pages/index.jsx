import React, { useEffect, useState } from "react";
import { Head } from "../components";
import Link from "next/link";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  Container,
  Row,
  Col,
  Card,
  CardDeck,
  CardTitle,
  CardText,
  CardBody,
  CardGroup,
  CardImg
} from "reactstrap";
import ReactCardFlip from "react-card-flip";
import chroma from "chroma-js";
import UNGoals from "../utils/goals";
import "../public/styles/home.scss";
import { checkValidUser } from "../utils/validator";
import Router from "next/router";

export default function Home() {
  const [validUser, setIsValidUser] = useState(false);
  const [isFlipped, setFlipped] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const numSlides = 5;
  const numCardsPerSlide = 3;
  const cardOpacity = 0.9;
  const isRevolving = true;
  const slideIndices = [...Array(numSlides).keys()];

  useEffect(() => {
    let sdgs = [...UNGoals];
    sdgs.push({
      label: "Sustainable Development Goals",
      value: "18",
      color: "#ffffff",
      imageLink: "/sdg-images/sdg.png"
    });
    setGoals(sdgs);
  }, []);

  const next = () => {
    if (animating) {
      return;
    }
    const nextIndex =
      activeIndex === slideIndices.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) {
      return;
    }
    const nextIndex =
      activeIndex === 0 ? slideIndices.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handleClick = (e, value) => {
    e.preventDefault();
    let flips = [...isFlipped];
    flips[value - 1] = !flips[value - 1];
    setFlipped(flips);
  };
  const slides = slideIndices.map(slideIndex => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={slideIndex}
    >
      <CardDeck className="hp-featured-card-deck">
        <Card className="hp-featured-card">
          <CardImg
            src="/homepage-images/feature-img.png"
            alt="Card image cap"
            className="hp-card-img"
          ></CardImg>
          <CardBody className="hp-featured-body">
            <CardTitle className="hp-featured-caption-title">
              <strong>
                Sustainablility Rules! {slideIndex * numCardsPerSlide + 1}
              </strong>
            </CardTitle>
            <CardText className="hp-featured-description">
              A project to help your school become more sustainable and
              responsible.
            </CardText>
            <div className="hp-featured-footer">
              <div className="hp-featured-interactions">
                123{" "}
                <img
                  className="hp-featured-comment-icon"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="hp-featured-like-icon"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="hp-featured-card">
          <CardImg
            src="/homepage-images/feature-img.png"
            alt="Card image cap"
            className="hp-card-img"
          ></CardImg>
          <CardBody className="hp-featured-body">
            <CardTitle className="hp-featured-caption-title">
              <strong>
                Sustainablility Rules! {(slideIndex + 1) * numCardsPerSlide - 1}
              </strong>
            </CardTitle>
            <CardText className="hp-featured-description">
              A project to help your school become more sustainable and
              responsible.
            </CardText>
            <div className="hp-featured-footer">
              <div className="hp-featured-interactions">
                123{" "}
                <img
                  className="hp-featured-comment-icon"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="hp-featured-like-icon"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="hp-featured-card">
          <CardImg
            src="/homepage-images/feature-img.png"
            alt="Card image cap"
            className="hp-card-img"
          ></CardImg>
          <CardBody className="hp-featured-body">
            <CardTitle className="hp-featured-caption-title">
              <strong>
                Sustainablility Rules! {(slideIndex + 1) * numCardsPerSlide}
              </strong>
            </CardTitle>
            <CardText className="hp-featured-description">
              A project to help your school become more sustainable and
              responsible.
            </CardText>
            <div className="hp-featured-footer">
              <div className="hp-featured-interactions">
                123{" "}
                <img
                  className="hp-featured-comment-icon"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="hp-featured-like-icon"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </CardDeck>
    </CarouselItem>
  ));

  useEffect(() => {
    const checkCurrUser = async () => {
      let user = await checkValidUser(false);
      setIsValidUser(user);
      if (user) {
        Router.replace("/feed");
      }
    };
    checkCurrUser();
  }, [validUser]);

  return (
    <>
      <Head />
      <Container className="home-main-box">
        <img
          className="figures-img"
          src="/homepage-images/home.svg"
          alt="home-figures"
        ></img>
        <div className="home-title">Save the world, one step at a time</div>
        <div className="home-subtitle">
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
      </Container>
      <Container className="home-intro-box">
        <Row className="art-row">
          <div className="spacer-left" />
          <Col className="figma-art-col-left">
            <img
              className="figma-img"
              src="/homepage-images/figma-art.png"
              alt="Figma Art"
            ></img>
          </Col>
          <Col className="figma-art-col-right">
            <div>
              <Row className="about-text">ABOUT THE PROJECTS</Row>
              <Row className="hcd-title">Human Centered Design</Row>
              <Row className="hcd-desc">
                We help you launch your sustainability project by using human
                centered design. Projects will follow a process of Inspiration,
                Ideation, and Implementation.
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <div className="home-featured-box">
        <div className="home-featured-title">Featured Projects</div>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="featured-carousel"
        >
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
      </div> */}
      <Container className="home-sdg-box">
        <div className="home-sdg-title">The Sustainable Development Goals</div>
        <div className="home-sdg-desc">
          The UN has set 17 goals which promote country development while also
          protecting the Earth. These goals were adopted in 2015 alongside a
          15-year plan to achieve these goals. The SDGs serve as the core
          driving force behind the projects on FateMaker.
        </div>
        <Row className="hp-sdg-row">
          {goals.map(sdg => (
            <Col key={sdg.value} className="sdg-col" sm="2">
              <ReactCardFlip
                key={sdg.value}
                isFlipped={isFlipped[sdg.value - 1]}
                flipDirection="horizontal"
                infinite={isRevolving}
              >
                <CardGroup>
                  <Card
                    className="sdg-card"
                    tag="a"
                    onClick={e => handleClick(e, sdg.value)}
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
                <CardGroup>
                  <Card
                    className="sdg-card-back"
                    tag="a"
                    onClick={e => handleClick(e, sdg.value)}
                    style={{
                      backgroundColor: chroma(sdg.color)
                        .alpha(cardOpacity)
                        .css()
                    }}
                  >
                    <CardImg
                      top
                      width="100%"
                      height="100%"
                      src={sdg.imageLink}
                      alt="Card image cap"
                      className="sdg-card-back-img"
                    />
                    <CardText className="sdg-card-desc">
                      SDG {sdg.value} Description
                    </CardText>
                  </Card>
                </CardGroup>
              </ReactCardFlip>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
