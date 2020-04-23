import React, { useState, useEffect, useCallback } from "react";

import { Col, Row } from "reactstrap";

import {
  postComment,
  postCommentThread,
  getComments
} from "../utils/apiWrapper";

import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

export default function CommentsSection(props) {
  const { projectId } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderComments = comments =>
    comments.map((comment, index) => (
      <Row key={index}>
        <Comment
          comment={comment}
          postThread={content => postThread(content, index)}
        />
      </Row>
    ));

  const fetchComments = useCallback(() => {
    getComments(projectId).then(response => {
      const { comments } = response.data;
      setComments(comments);
    });
  }, [projectId]);

  const post = content => {
    postComment(projectId, content).then(() => {
      fetchComments();
    });
  };

  const postThread = (content, index) => {
    postCommentThread(projectId, index, content).then(() => {
      fetchComments();
    });
  };

  return (
    <div>
      <Col>{renderComments(comments)}</Col>
      <Row>
        <CommentEditor post={content => post(content)} />
      </Row>
    </div>
  );
}
