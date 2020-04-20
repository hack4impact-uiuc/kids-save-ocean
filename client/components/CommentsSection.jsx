import React, { useState, useEffect } from "react";

import { Button, Col, Row } from "reactstrap";

import {
  postComment,
  postCommentThread,
  getComments
} from "../utils/apiWrapper";

import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

import Dante from "Dante2";

export default function CommentsSection(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const renderComments = comments => {
    let commentList = [];
    for (let [index, comment] of comments.entries()) {
      commentList.push(
        <Row>
          <Comment
            comment={comment}
            postThread={content => postThread(content, index)}
          />
        </Row>
      );
    }
    return commentList;
  };

  const fetchComments = () => {
    getComments(props.projectId).then(data => {
      const { comments } = data.data;
      setComments(comments);
    });
  };

  const post = content => {
    postComment(props.projectId, content).then(() => {
      fetchComments();
    });
  };

  const postThread = (content, index) => {
    postCommentThread(props.projectId, index, content).then(() => {
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
