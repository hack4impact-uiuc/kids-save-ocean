import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from "reactstrap";
import { getUpdates, getUser } from "../utils/apiWrapper";
import { Head, InfiniteScroller, Loader, FeedItem } from "../components";
import "../public/styles/feed.scss";

export default function Feed() {
  const maxUpdatesAtOnce = 20;
  const maxUpdatesTotal = 100;
  const randomUpdatesLimit = 10;
  const numFeatures = 12;
  const timeout = 1500;

  const [nextIdx, setNextIdx] = useState(0);
  const [willMount, setWillMount] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [updates, setUpdates] = useState([]);
  const [isFetching, setIsFetching] = InfiniteScroller();
  const [user, setUser] = useState({});
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState([]);
  const phases = ["Inspiration", "Ideation", "Implementation"];

  useEffect(() => {
    const loadUserInfo = async () => {
      const profile = await getUser();
      const resp = await profile.json();
      if (resp) {
        setUser(resp.data);
      } else {
        setError(true);
      }
    };
    loadUserInfo();
  }, []);

  useEffect(() => {
    const indices = [...Array(numFeatures).keys()];
    const featuredProjs = indices.map(function (index) {
      return (
        <Card key={index} className="featured-card">
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
      );
    });
    setFeatures(featuredProjs);
  }, []);

  useEffect(() => {
    const loadUpdates = async () => {
      if (!hasMore || (!isFetching && !willMount)) {
        return;
      }
      const nextUpdatesRes = await getUpdates(maxUpdatesAtOnce, nextIdx);
      try {
        const nextUpdates = nextUpdatesRes.data.data.updates;
        setTimeout(() => {
          if (nextUpdatesRes === undefined || nextUpdates.length === 0) {
            setWillMount(false);
            return;
          }
          if (
            nextUpdates.length < maxUpdatesAtOnce ||
            updates.length + maxUpdatesAtOnce >= maxUpdatesTotal
          ) {
            setHasMore(false);
          }
          setNextIdx(nextUpdates.length);
          nextUpdates.map((update) => {
            const dateObj = new Date(parseInt(update.date));
            update.date = dateObj.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            });
            update.numStagesUpdated = Math.floor(
              Math.random() * randomUpdatesLimit
            );
            update.stageUpdated =
              phases[Math.floor(Math.random() * phases.length)];
            update.numComments = Math.floor(
              Math.random() * randomUpdatesLimit * randomUpdatesLimit
            );
            update.numUpvotes = Math.floor(
              Math.random() *
                randomUpdatesLimit *
                randomUpdatesLimit *
                randomUpdatesLimit
            );
            setUpdates((prevState) => [...prevState, update]);
          });
          setWillMount(false);
          setIsFetching(false);
        }, timeout);
      } catch {
        setError(true);
      }
    };
    loadUpdates();
  }, [isFetching, hasMore, willMount]);

  return (
    <div className="feed-page-div">
      <Head />
      <Container className="user-sidebar">
        <Card className="user-card">
          <div className="user-profile-pic"></div>
          <CardTitle className="user-profile-name">
            <strong>@{user ? user.username : "Ashwin S."}</strong>
          </CardTitle>
          <CardSubtitle className="follow-counters">
            <div className="follower-count">
              <strong>
                {user.followingUsers ? user.followingUsers.length : "300"}
              </strong>{" "}
              followers
            </div>
            <div className="following-count">
              <strong>{user.followers ? user.followers.length : "300"}</strong>{" "}
              following
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
              <strong>
                {user.followingProjects ? user.followingProjects.length : "76"}
              </strong>
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
              <strong>
                {user.createdProjects ? user.createdProjects.length : "13"}
              </strong>
            </div>
          </div>
        </Card>
      </Container>
      <Container className="feed-wrapper">
        {willMount && <Loader />}
        {error && (
          <p>
            An error was encountered - please contact Hack4Impact UIUC with
            details.
          </p>
        )}
        {updates.map((update) => (
          <FeedItem key={update._id} update={update} />
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
        {features}
        <Link href="#more-features">
          <a className="featured-see-more">
            <strong>See More</strong>
          </a>
        </Link>
      </Container>
    </div>
  );
}
