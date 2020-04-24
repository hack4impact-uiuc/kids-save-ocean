import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import Dante from "Dante2";

import { saveTemplateDraft, getTemplateByID } from "../utils/apiWrapper";

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

export default function TemplateDraft(props) {
  const [unsaved, setUnsaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevContent, setPrevContent] = useState(null);
  const [editorContent, setEditorContent] = useState(null);

  const saveInterval = 1000;
  const debounceSave = json => {
    const { id } = props; // get/save draft props (id, name, phases)
    console.log("saving...");
    saveTemplateDraft(id, json); // save draft function
    console.log("saved");
    setUnsaved(false);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  const { id } = props;
  const handleChange = editor => {
    setUnsaved(true);
    const content = editor.emitSerializedOutput();
    uploadImagesAndFixUrls(content).then(() => {
      const json = JSON.stringify(content);
      if (json !== prevContent) {
        saveCallback(json); // save draft function
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
      const imageRef = storageRef.child(`${props.id}/${block.key}`); // imageref idk?

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
    console.log("getting template");
    // getDescription(id, phaseName, stageName)
    getTemplateByID(id) // get draft function
      .then(template => {
        console.log(template);
        const draft = template.data.draft;
        const json = JSON.parse(draft);
        if ("blocks" in json) {
          setEditorContent(json);
          setPrevContent(draft);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]); // dependencies for get draft function

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
