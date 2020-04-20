import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";

import Dante from "Dante2";

export default function CommentEditor(props) {
  const [content, setContent] = useState(null);

  const submitComment = () => {
    props.post(JSON.stringify(content));
  };

  return (
    <div className="comment-editor">
      <Dante
        onChange={editor => setContent(editor.emitSerializedOutput())}
        widgets={[]}
      />
      <Button onClick={() => submitComment()}>Submit</Button>
    </div>
  );
}
