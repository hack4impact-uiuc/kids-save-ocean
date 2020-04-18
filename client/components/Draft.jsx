import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";

import Dante from "Dante2";

import { saveDescription, getDescription } from "../utils/apiWrapper";

import "../public/styles/medium-draft.scss";
import debounce from "lodash/debounce";

import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storageRef = firebase.storage().ref();

export default function Draft(props) {
  const [unsaved, setUnsaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevContent, setPrevContent] = useState(null);
  const [editorContent, setEditorContent] = useState(null);

  const saveInterval = 1000;
  const debounceSave = json => {
    const { id, phaseName, stageName } = props;
    saveDescription(id, phaseName, stageName, json);
    setUnsaved(false);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  const { id, phaseName, stageName } = props;

  const handleChange = editor => {
    setUnsaved(true);
    const content = editor.emitSerializedOutput();
    console.log(content);
    uploadImagesAndFixUrls(content).then(() => {
      const json = JSON.stringify(content);
      if (json !== prevContent) {
        saveCallback(json);
        setPrevContent(json);
      } else {
        setUnsaved(false);
      }
    });
  };

  const uploadImagesAndFixUrls = async content => {
    for (const block of content.blocks) {
      if (block.type !== "image") {
        continue;
      }

      const { url } = block.data;
      if (!url.startsWith("blob:")) {
        continue;
      }

      const blob = await fetch(url).then(r => r.blob());
      const imageRef = storageRef.child(
        `${props.modelId}/${props.phaseName}/${props.stageName}/${block.key}`
      );

      await imageRef.put(blob).then(async function(snapshot) {
        await snapshot.ref.getDownloadURL().then(function(url) {
          block.data.url = url;
        });
      });
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
    getDescription(id, phaseName, stageName)
      .then(data => {
        const description = data.data.description;
        const json = JSON.parse(description);
        if ("blocks" in json) {
          setEditorContent(json);
          setPrevContent(description);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, phaseName, stageName]);

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

      {!loading && (
        <Dante
          content={editorContent}
          onChange={editor => handleChange(editor)}
        />
      )}
    </div>
  );
}
