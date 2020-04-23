import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg
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
  const [isFetching, setIsFetching] = InfiniteScroller();

  useEffect(() => {
    const loadUpdates = async () => {
      if (!hasMore || (!isFetching && !willMount)) {
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

      nextUpdates.data.map(update => {
        setUpdates(prevState => [...prevState, update]);
      });
      if (willMount) {
        setWillMount(false);
      }
      setIsFetching(false);
    };
    loadUpdates();
  }, [isFetching, hasMore, willMount]);

  return (
    <div className="feed-page-div">
      <Head />
      <svg
        height="0px"
        width="0px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
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
      <Container className="user-sidebar">
        <Card className="user-card">
          <div className="user-profile-pic"></div>
          <CardTitle className="user-profile-name">
            <Link href="#full-profile">
              <a className="user-profile-name">
                <strong>Sahi M.</strong>
              </a>
            </Link>
          </CardTitle>
          <CardSubtitle className="follow-counters">
            <div className="follower-count">
              <strong>300</strong> followers
            </div>
            <div className="following-count">
              <strong>392</strong> following
            </div>
          </CardSubtitle>
          <div className="progress-div">
            <div className="progress-labels">
              <Link href="#current-project">
                <a className="progress-label-current-project">
                  <strong>Current Project</strong>
                </a>
              </Link>
              <div className="progress-label-percent">
                <strong>81%</strong>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div className="user-projects-row">
            <img
              className="project-ribbon-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <Link href="#saved-projects">
              <a className="user-projects-label">
                <strong>Saved Projects</strong>
              </a>
            </Link>
            <div className="user-projects-count">
              <strong>31</strong>
            </div>
          </div>
          <div className="user-projects-row">
            <img
              className="project-ribbon-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <Link href="#saved-projects">
              <a className="user-projects-label">
                <strong>Updates</strong>
              </a>
            </Link>
            <div className="user-projects-count">
              <strong>31</strong>
            </div>
          </div>
          <div className="user-projects-row">
            <img
              className="project-ribbon-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <Link href="#saved-projects">
              <a className="user-projects-label">
                <strong>My Projects</strong>
              </a>
            </Link>
            <div className="user-projects-count">
              <strong>31</strong>
            </div>
          </div>
        </Card>
      </Container>
      <Container className="feed-wrapper">
        {willMount && (
          <div className="gooey-loader">
            <div className="dot-1"></div>
            <div className="dot-2"></div>
            <div className="dot-3"></div>
          </div>
        )}
        {updates.map(update => (
          <Fragment key={update._id}>
            <Card className="feed-card">
              <CardBody className="feed-card-body">
                <CardTitle className="feed-card-title">
                  <div className="feed-card-profile-pic"></div>
                  <div className="feed-card-title-text">
                    <strong>Arpan Laha</strong> edited{" "}
                    <strong>Sustainable Recycling Project</strong>
                  </div>
                </CardTitle>
                <CardSubtitle className="feed-card-subtitle">
                  <strong>Updated</strong> 10 more interviews
                </CardSubtitle>
                <CardText className="feed-card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  nec magna sed nibh varius porttitor. Proin pulvinar, odio at
                  accumsan pharetra, tellus augue scelerisque leo, faucibus
                  sodales libero nulla at tellus.
                </CardText>
                <div className="feed-card-footer">
                  <div className="feed-card-date">Mar 20</div>
                  <div className="feed-card-interactions">
                    123{" "}
                    <img
                      className="feed-card-comment-icon"
                      src="/feed-images/comment-icon.svg"
                      alt="comment"
                    />
                    123
                    <img
                      className="feed-card-like-icon"
                      src="/feed-images/like-icon.svg"
                      alt="like"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Fragment>
        ))}
        {hasMore && !willMount && (
          <div className="loading-text">Loading...</div>
        )}
        {!hasMore && (
          <div className="loading-text">
            <Link href="/projects">
              <a className="featured-see-more">Find more projects!</a>
            </Link>
          </div>
        )}
      </Container>

      <Container className="featured-sidebar">
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
        <Link href="#more-features">
          <a className="featured-see-more">
            <strong>See More</strong>
          </a>
        </Link>
      </Container>
    </div>
  );
}
