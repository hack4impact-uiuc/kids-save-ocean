import React, { Component } from "react";
import { Head } from "../components";
import { Row, Col, Container } from "reactstrap";

import DraftAddImage from "../components/DraftAddImage.jsx";

// import "../public/draft.scss";
import "../public/medium-draft.scss";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import {
  Editor,
  createEditorState,

} from 'medium-draft';

class DraftPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(),
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    this.refsEditor = React.createRef();
  }

  // calcSerializedState() {
  //   const contentState = this.state.editorState.getCurrentContent();
  //   return JSON.stringify(convertToRaw(contentState));
  // }

  // loadState() {
  //   this.setState({
  //     editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
  //   });
  // }

  componentDidMount() {
    this.refsEditor.current.focus();
  }

  render() {
    return (
      <div>
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
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>

          <Editor
            ref={this.refsEditor}
            editorState={this.state.editorState}
            onChange={this.onChange}
            sideButtons={[{
              title: 'Image',
              component: DraftAddImage,
            }]} />
        </Container>
      </div>
    );
  }
}

export default DraftPage;
