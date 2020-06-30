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
      <Dante
        onChange={(editor) => setContent(editor.emitSerializedOutput())}
        widgets={[]}
      />
      <Button className="comment-btn" onClick={submitComment}>
        Post Comment
      </Button>
    </div>
  );
}
