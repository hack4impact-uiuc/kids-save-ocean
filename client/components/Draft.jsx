import React, { useState, useEffect, useCallback } from "react";

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
  const debounceSave = (json, text) => {
    const { id, phaseName, stageName } = props;
    const cutoff = 300;
    const abbrv =
      text.length > cutoff ? `${text.substring(0, cutoff)}...` : text;
    saveDescription(id, phaseName, stageName, json, abbrv);
    setUnsaved(false);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  const { id, phaseName, stageName, read_only } = props;

  const handleChange = editor => {
    if (read_only) {
      return;
    }
    setUnsaved(true);
    const content = editor.emitSerializedOutput();

    const editorState = editor.getEditorState();
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);

    const text = block.getText();

    uploadImagesAndFixUrls(content).then(() => {
      const json = JSON.stringify(content);
      if (json !== prevContent) {
        saveCallback(json, text);
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
        }
        setPrevContent(description);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, phaseName, stageName]);

  const renderDraft = () => {
    if (loading) {
      return undefined;
    }

    if (read_only && editorContent === null) {
      return <p>{prevContent}</p>;
    }

    return (
      <Dante
        read_only={read_only}
        content={editorContent}
        onChange={editor => handleChange(editor)}
      />
    );
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
      />

      {!read_only && (
        <div className="d-flex justify-content-end draft-status">
          {status()}
        </div>
      )}

      {renderDraft()}

      <hr />
    </div>
  );
}
