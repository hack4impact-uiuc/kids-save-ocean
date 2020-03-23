import React, { Component } from "react";
import { Head, Draft } from "../components";
import { Container } from "reactstrap";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor, createEditorState } from "medium-draft";

import "../public/styles/medium-draft.scss";

class DraftPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState()
    };

    this.onChange = editorState => {
      this.setState({ editorState: editorState });
    };

    this.refsEditor = React.createRef();
  }

  componentDidUpdate() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const json = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("content", json);
  }

  componentDidMount() {
    this.refsEditor.current.focus();

    const content = localStorage.getItem("content");
    console.log(content);

    if (content) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        )
      });
    }
  }

  render() {
    const { editorState } = this.state;
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
            ref={this.refsEditor}
            editorState={editorState}
            onChange={this.onChange}
            sideButtons={[
              {
                title: "Image",
                component: Draft
              }
            ]}
          />
        </Container>
      </div>
    );
  }
}

export default DraftPage;
