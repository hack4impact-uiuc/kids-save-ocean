import React, { useState } from "react";

import { Button } from "reactstrap";

import Dante from "Dante2";
import "../public/styles/commentEditor.scss";

export default function CommentEditor(props) {
  const [content, setContent] = useState(null);

  const submitComment = () => {
    props.post(JSON.stringify(content));
  };

  return (
    <div className="comment-editor">
      <h1 className="comment-header">Comments</h1>
      <Dante
        onChange={editor => setContent(editor.emitSerializedOutput())}
        widgets={[]}
      />
      <Button className="comment-btn" onClick={submitComment}>
        Submit
      </Button>
    </div>
  );
}
