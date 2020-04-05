import React, { createRef, useState, useEffect, useCallback } from "react";
import { DraftAddImage } from "../components";
import { Row, Col } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor, createEditorState } from "medium-draft";

import Dante from "Dante2";

import { saveDescription, getDescription } from "../utils/apiWrapper";

import "../public/styles/medium-draft.scss";
import debounce from "lodash/debounce";

export default function Draft(props) {
  const [editorState, setEditorState] = useState(createEditorState());
  const [unsaved, setUnsaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevContent, setPrevContent] = useState(null);
  const [editorContent, setEditorContent] = useState(null);

  const refsEditor = createRef();

  const saveInterval = 1000;
  const debounceSave = json => {
    const { id, phaseName, stageName } = props;
    saveDescription(id, phaseName, stageName, json);
    setUnsaved(false);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  const handleChange = (editor) => {
    const content = editor.emitSerializedOutput();
    const json = JSON.stringify(content);
    console.log(content.blocks);
    uploadImagesAndFixUrls(content.blocks);
    if (json !== prevContent) {
      saveCallback(json);
      setUnsaved(true);
      setPrevContent(json);
    }
  };

  const  uploadImagesAndFixUrls = async (blocks) => {
    for (const block of blocks) {
      if (block.type !== 'image') {
        continue;
      }

      const {url} = block.data;

      if (!url.startsWith('blob:')) {
        continue;
      }

      const blob = await fetch(url).then(r => r.blob());
      console.log(blob);
      return;

      const uploadFormData = new FormData();
      uploadFormData.append('file', blob);

      const uploadRes = await fetch(`/post/${postId}/image`, {
        method: 'POST',
        body: uploadFormData,
      });

      switch (uploadRes.status) {
        case 200: // OK
          const {url: uploadedUrl} = await uploadRes.json();
          block.data.url = uploadedUrl;
          break;
        case 500: // INTERNAL_SERVER_ERROR
          throw new Error();
      }
    }
  }

  const status = () => {
    if (loading) {
      return "Loading...";
    } else if (unsaved) {
      return "Saving...";
    }
    return "Saved";
  };

  useEffect(() => {
    // console.log(refsEditor);
    const { id, phaseName, stageName } = props;
    getDescription(id, phaseName, stageName)
      .then(data => {
        const description = data.data.description;
        const json = JSON.parse(description);
        if ('blocks' in json) {
          setEditorContent(json);
          setPrevContent(description);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
      

      {!loading &&
        <Dante
          content={editorContent}
          onChange={editor => handleChange(editor)}/>
      }
    </div>
  );
}


      // <Editor
      //   ref={refsEditor}
      //   editorState={editorState}
      //   onChange={handleChange}
      //   sideButtons={[
      //     {
      //       title: "Image",
      //       component: DraftAddImage
      //     }
      //   ]}
      // />