import React, { createRef, useState, useEffect } from "react";
import { Head, DraftAddImage } from "../components";
import { Row, Col } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor, createEditorState } from "medium-draft";

import { saveDescription, getDescription } from "../utils/apiWrapper";

import "../public/styles/medium-draft.scss";
import debounce from "lodash/debounce";

export default function Draft(props) {
  const [editorState, setEditorState] = useState(createEditorState());
  const [unsaved, setUnsaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prevContent, setPrevContent] = useState(null);

  const refsEditor = createRef();

  const debounceSave = React.useCallback(
    debounce(json => {
      const { id, phaseName, stageName } = props;
      saveDescription(id, phaseName, stageName, json);
      setUnsaved(false);
    }, 1000),
    []
  );

  const handleChange = newState => {
    if (!loading) {
      setEditorState(newState);

      const contentState = newState.getCurrentContent();
      const json = JSON.stringify(convertToRaw(contentState));
      if (json !== prevContent) {
        debounceSave(json);
        setUnsaved(true);
        setPrevContent(json);
      }
    }
  };

  useEffect(() => {
    refsEditor.current.focus();
    const { id, phaseName, stageName } = props;
    getDescription(id, phaseName, stageName)
      .then(data => {
        const description = data.data.description;
        setEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
        );
        setLoading(false);
        setPrevContent(description);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  return (
    <div>
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
      />

      <Row>
        <Col sm="9"></Col>
        <Col sm="3" style={{ color: "#aaa", "text-align": "right" }}>
          {loading ? "Loading..." : unsaved ? "Saving..." : "Saved"}
        </Col>
      </Row>
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
    </div>
  );
}
