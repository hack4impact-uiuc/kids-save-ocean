import React, { useState, useEffect } from "react";

import {
  Button, 
  Col,
  Row
} from "reactstrap";

import { postComment, getComments } from '../utils/apiWrapper';

import Comment from './Comment';
import CommentEditor from './CommentEditor';

import Dante from "Dante2";

export default function CommentsSection(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const renderComments = (comments) => {
    let commentList = [];
    for (let comment of comments) {
      commentList.push(
        <Row>
          <Comment comment={comment}/>
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

  const post = (content) => {
    postComment(props.projectId, "uid", content).then(() => {
      fetchComments();
    });
  };

  return(
    <div>
      <Row>
        <CommentEditor
          post={ (content) => post(content) }
        />
      </Row>
      <Col>
        {renderComments(comments)}
      </Col>
    </div>
  );
}