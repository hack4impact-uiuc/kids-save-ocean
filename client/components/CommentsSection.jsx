import React, { useState, useEffect, useCallback } from "react";

import { Col, Row } from "reactstrap";

import {
  postComment,
  postCommentThread,
  getComments,
} from "../utils/apiWrapper";

import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

import "../public/styles/commentSection.scss";

export default function CommentsSection(props) {
  const { projectId } = props;
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(fetchComments, [fetchComments]);

  const renderComments = (comments) =>
    comments.map((comment, index) => (
      <Row key={index}>
        <Comment
          comment={comment}
          postThread={(content) => postThread(content, index)}
        />
      </Row>
    ));

  const fetchComments = useCallback(() => {
    setFetching(true);
    getComments(projectId).then((response) => {
      try {
        const { comments } = response.data;
        setComments(comments);
        setFetching(false);
      } catch {
        setError(true);
      }
    });
  }, [projectId]);

  const post = (content) => {
    postComment(projectId, content)
      .then(fetchComments)
      .catch(() => setError(true));
  };

  const postThread = (content, index) => {
    postCommentThread(projectId, index, content)
      .then(fetchComments)
      .catch(() => setError(true));
  };

  return (
    <div>
      <h1 className="comment-header">Comments</h1>
      {error && (
        <p>
          An error was encountered - please contact Hack4Impact UIUC with
          details.
        </p>
      )}
      <Col>{renderComments(comments)}</Col>
      <hr />
      {localStorage.getItem("token") && !fetching && (
        <Row>
          <CommentEditor post={post} />
        </Row>
      )}
    </div>
  );
}
