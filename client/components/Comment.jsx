import React from "react";

import Dante from "Dante2";

export default function Comment(props) {
  const renderThread = thread => {
    let threadList = [];
    for (let comment of thread) {
      threadList.push(
        <div>
          <h5>{comment.authorId}</h5>
          <br />
          <p>{comment.createdAt}</p>
          <br />

          <Dante content={JSON.parse(comment.content)} read_only={true} />
        </div>
      );
    }

    return threadList;
  };

  return (
    <div>
      <h5>{props.comment.authorId}</h5>
      <br />
      <p>{props.comment.createdAt}</p>
      <br />

      <Dante content={JSON.parse(props.comment.content)} read_only={true} />

      <br />
      {renderThread(props.comment.thread)}
    </div>
  );
}
