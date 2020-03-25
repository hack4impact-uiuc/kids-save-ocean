import React, { createRef, useState, useEffect } from "react";
import { Head, DraftAddImage } from "../components";
import { Container } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor, createEditorState } from "medium-draft";

import "../public/styles/medium-draft.scss";

export default function DraftPage() {
  const [editorState, setEditorState] = useState(createEditorState());

  const refsEditor = createRef();

  const handleChange = newState => setEditorState(newState);

  useEffect(() => {
    refsEditor.current.focus();
    const content = localStorage.getItem("content");
    if (content !== null) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, [refsEditor, setEditorState]);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const json = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("content", json);
  }, [editorState]);

  return (
    <div>
      <Head />
      <Container>
        <div className="page-title">
          <h1 className="header2-text" align="center">
            <strong>Draft Your Project! or some shit</strong>
          </h1>
        </div>
        <link
          rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        />

        <Editor
          ref={refsEditor}
          editorState={editorState}
          onChange={handleChange}
          sideButtons={[
            {
              title: "Image",
              component: DraftAddImage
            }
          ]}
        />
      </Container>
    </div>
  );
}
