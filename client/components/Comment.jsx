import React, { useState } from "react";

import Dante from "Dante2";
import { Button } from "reactstrap";

import CommentEditor from "./CommentEditor";

import "../public/styles/comments.scss";

export default function Comment(props) {
  const [replyOpen, setReplyOpen] = useState(false);

  const renderBlock = (author, createdAt, content) => {
    return (
      <div className="block">
        <div className="header">
          <p className="author">{author}</p>
          <p className="time">{createdAt}</p>
        </div>
        <div className="content">
          <Dante content={JSON.parse(content)} read_only={true} />
        </div>
      </div>
    );
  };

  const renderThread = thread => {
    let threadList = [];
    for (let comment of thread) {
      threadList.push(
        renderBlock(comment.authorName, comment.createdAt, comment.content)
      );
    }

    return threadList;
  };

  const postThread = content => {
    props.postThread(content);
    setReplyOpen(false);
  };

  return (
    <div className="comment">
      {renderBlock(
        props.comment.authorName,
        props.comment.createdAt,
        props.comment.content
      )}

      <div className="thread">{renderThread(props.comment.thread)}</div>

      {replyOpen ? (
        <CommentEditor post={content => postThread(content)} />
      ) : (
        <Button onClick={() => setReplyOpen(true)}>Reply</Button>
      )}
    </div>
  );
}
