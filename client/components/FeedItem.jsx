import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default function FeedItem(props) {
  const { update } = props;
  return (
    <Fragment key={update._id}>
      <Card className="feed-card">
        <CardBody className="feed-card-body">
          <CardTitle className="feed-card-title">
            <div className="feed-card-profile-pic"></div>
            {update.type === "project" ? (
              <div className="feed-card-title-text">
                <strong>{update.username}</strong> created{" "}
                <strong>{update.description}</strong>
              </div>
            ) : update.type === "stage" ? (
              <div className="feed-card-title-text">
                <strong>{update.username}</strong> updated their{" "}
                <strong>{update.description}</strong> stage
              </div>
            ) : (
              "Invalid type"
            )}
          </CardTitle>
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
              {update.numComments ? update.numComments : "0"}
              <img
                className="feed-card-comment-icon"
                src="/feed-images/comment-icon.svg"
                alt="comment"
              />
              {update.numUpvotes ? update.numUpvotes : "0"}
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
  );
}
