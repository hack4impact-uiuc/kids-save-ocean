import React, { Component } from "react";

import { addNewBlock } from "medium-draft";

export default class Draft extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    const { close, getEditorState, setEditorState } = this.props;

    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const src = reader.result;
        const newState = addNewBlock(getEditorState(), "atomic:image", { src });
        setEditorState(newState);
      };
    }
    close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        onClick={this.onClick}
        title="Add an Image"
      >
        <i className="fa fa-image" />
        <input
          type="file"
          accept="image/*"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </button>
    );
  }
}
