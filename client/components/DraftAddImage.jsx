import React, { useState } from "react";

import { addNewBlock } from "medium-draft";

export default function DraftAddImage(props) {
  const [input, setInput] = useState(null);

  const handleClick = () => input.click();

  const handleChange = e => {
    const { close, getEditorState, setEditorState } = props;
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const src = reader.result;
        const newState = addNewBlock(getEditorState(), "atomic:image", { src });
        setEditorState(newState);
      };
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
