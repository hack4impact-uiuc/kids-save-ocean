import React, { createRef, useState, useEffect, useCallback } from "react";
import { DraftAddImage } from "../components";
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

  const saveInterval = 1000;
  const debounceSave = json => {
    const { id, phaseName, stageName } = props;
    saveDescription(id, phaseName, stageName, json);
    setUnsaved(false);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  const { id, phaseName, stageName } = props;

  const handleChange = newState => {
    if (!loading) {
      setEditorState(newState);

      const contentState = newState.getCurrentContent();
      const json = JSON.stringify(convertToRaw(contentState));
      if (json !== prevContent) {
        saveCallback(json);
        setUnsaved(true);
        setPrevContent(json);
      }
    }
  };

  const status = () => {
    if (loading) {
      return "Loading...";
    } else if (unsaved) {
      return "Saving...";
    }
    return "Saved";
  };

  useEffect(() => {
    refsEditor.current.focus();
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
  }, [id, phaseName, stageName, refsEditor]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
      />

      <Row>
        <Col sm="9"></Col>
        <Col sm="3" className="draft-status">
          {status()}
        </Col>
      </Row>
      <Editor
        ref={refsEditor}
        editorState={editorState}
        onChange={handleChange}
        sideButtons={[
          {
            title: "Image",
            component: DraftAddImage,
            props: {
              modelId: id,
              phaseName: phaseName,
              stageName: stageName
            }
          }
        ]}
      />
    </div>
  );
}
