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
import { getUpdates } from "../utils/apiWrapper";
import { Head, InfiniteScroller, Loader } from "../components";
import "../public/styles/feed.scss";

export default function Feed() {
  const maxUpdatesAtOnce = 20;
  const maxUpdatesTotal = 200;
  const numWordsName = 2;
  const stageWord = 3;
  const randomUpdatesLimit = 10;
  const charLimit = 240;

  const [nextIdx, setNextIdx] = useState(0);
  const [willMount, setWillMount] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [updates, setUpdates] = useState([]);
  const [isFetching, setIsFetching] = InfiniteScroller();
  const phases = ["Inspiration", "Ideation", "Implementation"];

  useEffect(() => {
    const loadUpdates = async () => {
      if (!hasMore || (!isFetching && !willMount)) {
        return;
      }
      const nextUpdates = await getUpdates(maxUpdatesAtOnce, nextIdx);
      if (
        nextUpdates === undefined ||
        nextUpdates.data.data.updates.length === 0
      ) {
        setWillMount(false);
        return;
      }
      if (
        nextUpdates.data.data.updates.length < maxUpdatesAtOnce ||
        updates.length + maxUpdatesAtOnce >= maxUpdatesTotal
      ) {
        setHasMore(false);
      }
      setNextIdx(nextUpdates.data.data.updates.length);
      nextUpdates.data.data.updates.map(update => {
        const dateObj = new Date(update.date);
        update.date = `${dateObj.toLocaleString("default", {
          month: "long"
        })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
        setUpdates(prevState => [...prevState, update]);
      });
      setWillMount(false);
      setIsFetching(false);
    };
    loadUpdates();
  }, [isFetching, hasMore, willMount, nextIdx, setIsFetching, updates.length]);

  return (
    <div className="feed-page-div">
      <Head />
      <Container className="user-sidebar">
        <Card className="user-card">
          <div className="user-profile-pic"></div>
          <CardTitle className="user-profile-name">
            <strong>Ashwin S.</strong>
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
              <strong>Current Project</strong>
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
            <a className="user-projects-label">
              <strong>Saved Projects</strong>
            </a>
            <div className="user-projects-count">
              <strong>76</strong>
            </div>
          </div>
          <div className="user-projects-row">
            <img
              className="project-ribbon-icon"
              src="/feed-images/project-icon.svg"
              alt="proj-icon"
            />
            <a className="user-projects-label">
              <strong>Updates</strong>
            </a>
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
            <a className="user-projects-label">
              <strong>My Projects</strong>
            </a>
            <div className="user-projects-count">
              <strong>13</strong>
            </div>
          </div>
        </Card>
      </Container>
      <Container className="feed-wrapper">
        {willMount && <Loader />}
        {updates.map(update => (
          <Fragment key={update._id}>
            <Card className="feed-card">
              <CardBody className="feed-card-body">
                <CardTitle className="feed-card-title">
                  <div className="feed-card-profile-pic"></div>
                  {update.description && (
                    <div className="feed-card-title-text">
                      <strong>
                        {update.description
                          .split(" ")
                          .slice(0, numWordsName)
                          .join(" ")}
                      </strong>{" "}
                      updated their{" "}
                      <strong>
                        {update.description
                          .split(" ")
                          .slice(numWordsName, stageWord)}
                      </strong>{" "}
                      stage
                    </div>
                  )}
                </CardTitle>
                <CardSubtitle className="feed-card-subtitle">
                  <strong>Updated</strong>{" "}
                  {Math.ceil(Math.random() * randomUpdatesLimit)} stages of{" "}
                  {phases[Math.floor(Math.random() * phases.length)]}
                </CardSubtitle>
                {update.subDescription && (
                  <CardText className="feed-card-description">
                    {update.subDescription.length > charLimit
                      ? update.subDescription.slice(0, charLimit).concat("...")
                      : update.subDescription}
                  </CardText>
                )}
                <div className="feed-card-footer">
                  <div className="feed-card-date">{update.date}</div>
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
        {updates.length !== 0 && hasMore && !willMount && (
          <div className="loading-text">Loading...</div>
        )}
        {((updates.length === 0 && !willMount) || !hasMore) && (
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
        <Link href="#more-features">
          <a className="featured-see-more">
            <strong>See More</strong>
          </a>
        </Link>
      </Container>
    </div>
  );
}
