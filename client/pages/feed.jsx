import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardGroup,
  CardImg,
  Col,
} from "reactstrap";
import { getModelsGreaterThanID } from "../utils/apiWrapper";
import { Head, InfiniteScroller } from "../components";
import "../public/styles/feed.scss";

export default function Feed() {
  const maxUpdatesAtOnce = 20;
  const maxUpdatesTotal = 200;

  const [lastID, setLastID] = useState("5e901732090f7cdff2e67565");
  const [willMount, setWillMount] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [updates, setUpdates] = useState([]);

  // const [loadingBar, setLoadingBar] = useState(0);
  const [isFetching, setIsFetching] = InfiniteScroller(setFetch);

  // useEffect(() => {
  //   return function cleanup() {};
  // }, []);
  function setFetch() {
    if (hasMore) {
      // setLoadingBar(0);
      setIsFetching(true);
    }
  }
  // useEffect(() => {
  //   if (!isFetching) {
  //     return;
  //   }
  //   const interval = setInterval(() => {
  //     setLoadingBar((loadingBar) => loadingBar + 1);
  //   }, 4);
  //   return () => clearInterval(interval);
  //   // if (loadingBar >= 95) {
  //   //   console.log(loadingBar);
  //   //   setLoadingBar(100);
  //   //   return;
  //   // }
  //   // const constIncr = () => {
  //   //   setLoadingBar(loadingBar + 1);
  //   //   console.log(loadingBar);
  //   // };
  //   // constIncr();
  // }, [isFetching]); //isFetching

  useEffect(() => {
    const loadUpdates = async () => {
      if (!hasMore) {
        return;
      }
      if (!isFetching && !willMount) {
        return;
      }
      const nextUpdates = await getModelsGreaterThanID(
        maxUpdatesAtOnce,
        lastID
      );
      if (nextUpdates === undefined || nextUpdates.data.length === 0) {
        return;
      }
      if (
        nextUpdates.data.length < maxUpdatesAtOnce ||
        updates.length + maxUpdatesAtOnce >= maxUpdatesTotal
      ) {
        setHasMore(false);
      }

      setLastID(nextUpdates.data[nextUpdates.data.length - 1]._id);

      nextUpdates.data.map((update) => {
        setUpdates((prevState) => [...prevState, update]);
      });
      if (willMount) {
        setWillMount(false);
      }
      setTimeout(() => {
        setIsFetching(false);
      }, 10000);
    };
    loadUpdates();
  }, [isFetching]);

  return (
    <Row className="feed-div">
      <Head />
      {willMount && (
        <div class="container-loader">
          <div class="dot-1"></div>
          <div class="dot-2"></div>
          <div class="dot-3"></div>
        </div>
      )}

      <Col className="container-sidebar">
        <Card className="card-profile">
          <div className="pfp-2"></div>
          <CardTitle>
            <h3 className="card-title-text-2">
              <Link href="#full-profile">
                <a className="current-project">
                  <strong>Sahi M.</strong>
                </a>
              </Link>
            </h3>
          </CardTitle>
          <CardSubtitle className="end-2">
            <div className="left-2">
              <strong>300</strong> followers
            </div>
            <div className="right-2">
              <strong>392</strong> following
            </div>
          </CardSubtitle>
          <div className="progress-div">
            <div className="end-3">
              <div className="left-3">
                <Link href="#current-project">
                  <a className="current-project">
                    <strong>Current Project</strong>
                  </a>
                </Link>
              </div>
              <div className="right-3">
                <strong>81%</strong>
              </div>
            </div>
            <div className="progress-bar">
              {" "}
              <div className="progress-fill"></div>
            </div>

            {/* <div className="edit-project-button">
              <strong>Edit</strong>
            </div> */}
          </div>
          <div className="end-4">
            <img
              className="project-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <div className="left-4">
              <Link href="#saved-projects">
                <a className="current-project">
                  <strong>Saved Projects</strong>
                </a>
              </Link>
            </div>
            <div className="right-4">
              <strong>31</strong>
            </div>
          </div>
          <div className="end-4">
            <img
              className="project-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <div className="left-4">
              <Link href="#updates">
                <a className="current-project">
                  <strong>Updates</strong>
                </a>
              </Link>
            </div>
            <div className="right-4">
              <strong>31</strong>
            </div>
          </div>
          <div className="end-4">
            <img
              className="project-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <div className="left-4">
              <Link href="#my-projects">
                <a className="current-project">
                  <strong>My Projects</strong>
                </a>
              </Link>
            </div>
            <div className="right-4">
              <strong>31</strong>
            </div>
          </div>
        </Card>
      </Col>
      <Container className="container-feed">
        <div>
          {updates.map((update) => (
            <Fragment key={update._id}>
              {/* <div>
                <div>
                  <p>User: {update.id}</p>
                  <p>Country: {update.country}</p>
                  <p>Email: {update.email}</p>
                  <p>Project Name: {update.name}</p>
                  <p>Description: {update.description}</p>
                </div>
              </div> */}
              <Card className="feed-card">
                <CardBody className="card-body">
                  <CardTitle className="card-title">
                    <div className="pfp"></div>
                    <div className="card-title-text">
                      <strong>Arpan Laha</strong> edited{" "}
                      <strong>Sustainable Recycling Project</strong>
                    </div>
                  </CardTitle>
                  <CardSubtitle className="country-title">
                    <strong>Updated</strong> 10 more interviews
                  </CardSubtitle>
                  <CardText className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec nec magna sed nibh varius porttitor. Proin pulvinar,
                    odio at accumsan pharetra, tellus augue scelerisque leo,
                    faucibus sodales libero nulla at tellus.
                    {/* {update.description.length < 240
                      ? update.description
                      : update.description.slice(0, 240).concat("...")} */}
                  </CardText>
                  <div className="end">
                    <div className="left">Mar 20</div>
                    <div className="right">
                      123{" "}
                      <img
                        className="comment-icon"
                        src="/feed-images/comment-icon.svg"
                        alt="comment"
                      />
                      123
                      <img
                        className="like-icon"
                        src="/feed-images/like-icon.svg"
                        alt="like"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Fragment>
          ))}
          {(!isFetching || willMount) && (
            <div className="loader-container"></div>
          )}
          {isFetching && !willMount && hasMore && (
            <div className="loader-container">
              <div class="dot-1-1"></div>
              <div class="dot-2-2"></div>
              <div class="dot-3-3"></div>
            </div>
          )}
          {!hasMore && (
            <div className="find-more-row">
              <Link href="/projects">
                <a href="/projects" width="100%" text-align="center">
                  Find more projects!
                </a>
              </Link>
            </div>
          )}
        </div>
      </Container>
      <svg height="0px" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
      <Container className="container-sidebar-2">
        <div className="featured-title">
          <strong>Featured</strong>
        </div>
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
            <div className="end-feature">
              <div className="right-feature">
                123{" "}
                <img
                  className="comment-icon-feature"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="like-icon-feature"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
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
            <div className="end-feature">
              <div className="right-feature">
                123{" "}
                <img
                  className="comment-icon-feature"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="like-icon-feature"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
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
            <div className="end-feature">
              <div className="right-feature">
                123{" "}
                <img
                  className="comment-icon-feature"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="like-icon-feature"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
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
            <div className="end-feature">
              <div className="right-feature">
                123{" "}
                <img
                  className="comment-icon-feature"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="like-icon-feature"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
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
            <div className="end-feature">
              <div className="right-feature">
                123{" "}
                <img
                  className="comment-icon-feature"
                  src="/feed-images/comment-icon.svg"
                  alt="comment"
                />
                123
                <img
                  className="like-icon-feature"
                  src="/feed-images/like-icon.svg"
                  alt="like"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <Link href="#more-features">
          <a className="more-featured">See More</a>
        </Link>
      </Container>
    </Row>
  );
}
