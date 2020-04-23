import React, { useState } from "react";

import Dante from "Dante2";
import { Button } from "reactstrap";

import CommentEditor from "./CommentEditor";

import "../public/styles/comments.scss";

export default function Comment(props) {
  const { comment, postThread } = props;
  const [replyOpen, setReplyOpen] = useState(false);

  const renderBlock = (author, createdAt, content) => (
    <div className="block">
      <div className="header">
        <p className="author">{author}</p>
        <p className="time">{createdAt}</p>
      </div>
      <div className="content">
        <Dante content={JSON.parse(content)} read_only />
      </div>
    </div>
  );

  const renderThread = thread =>
    thread.map(comment =>
      renderBlock(comment.authorName, comment.createdAt, comment.content)
    );

  const postThreadHelper = content => {
    postThread(content);
    setReplyOpen(false);
  };

  return (
    <div className="comment">
      {renderBlock(comment.authorName, comment.createdAt, comment.content)}

      <div className="thread">{renderThread(comment.thread)}</div>

      {replyOpen ? (
        <CommentEditor post={content => postThreadHelper(content)} />
      ) : (
        <Button onClick={() => setReplyOpen(true)}>Reply</Button>
      )}
    </div>
  );
}
