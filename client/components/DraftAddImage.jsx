import React, { useState } from "react";

import { addNewBlock } from "medium-draft";

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

export default function DraftAddImage(props) {
  const [input, setInput] = useState(null);

  const handleClick = () => input.click();

  const handleChange = e => {
    const { close, getEditorState, setEditorState } = props;
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      const imageRef = storageRef.child(
        `${props.modelId}/${props.phaseName}/${props.stageName}/${file.name}`
      );

      imageRef.put(file).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(url) {
          const newState = addNewBlock(getEditorState(), "atomic:image", {
            src: url
          });
          setEditorState(newState);
        });
      });
    }
    close();
  };

  return (
    <button
      className="md-sb-button md-sb-img-button"
      type="button"
      onClick={handleClick}
      title="Add an Image"
    >
      <i className="fa fa-image" />
      <input
        type="file"
        accept="image/*"
        ref={c => setInput(c)}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </button>
  );
}
