import React, { Component } from "react";
import { Head } from "../components";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Row, Col, Container } from "reactstrap";

import "../public/draft.scss";

class DraftPage extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  };
  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };
  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };
  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState, "CODE"));
  };
  render() {
    return (
      <>
        <Head />
        <Container>
          <Row className="header-row" justify="center" align="middle">
            <Col xs="1">
              <img
                className="header-img"
                src="/homepage-images/menu-icon.png"
              />
            </Col>
            <Col xs="1">
              <img className="header-img" src="/homepage-images/kso-icon.png" />
            </Col>
            <Col xs={{ size: 1, offset: 8 }}>
              <img
                className="header-img"
                src="/homepage-images/notification-icon.png"
              />
            </Col>
            <Col xs="1">
              <img
                className="header-img"
                src="/homepage-images/user-icon.png"
              />
            </Col>
          </Row>
          <div className="page-title">
            <h1 className="header2-text" align="center">
              <strong>Draft Your Project! or some shit</strong>
            </h1>
          </div>
          <button onClick={this.onBoldClick}>Bold</button>
          <button onClick={this.onItalicClick}>Italic</button>
          <button onClick={this.onUnderlineClick}>Underline</button>
          <button onClick={this.onToggleCode}>Code Block</button>
          <Editor
            className="editor"
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </Container>
      </>
    );
  }
}

export default DraftPage;
