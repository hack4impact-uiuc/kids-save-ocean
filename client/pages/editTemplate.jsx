import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Alert } from "reactstrap";
import { Editor, EditorState, ContentState } from "draft-js";
import Select from "react-select";
import { Head, Draft } from "../components";
import "../public/styles/editTemplates.scss";

export default function EditTemplatePage() {
  return (
    <>
      <form>
        <Head title="" />
        <Container>
          <Row>
            <Col>
              <Row>
                <h1 className="template-h">
                  <strong>Templates</strong>
                </h1>
              </Row>
              <Row>
                <h4 className="stage-num">Stage One</h4>
              </Row>
              <Row>
                <div className="template-h2">Template</div>
              </Row>
              <Row></Row>
              <Row>
                <div className="template-h2">Which stages?</div>
              </Row>
              <Row>
                <div>
                  <input
                    class="form-check-input"
                    className="stage"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label
                    class="form-check-label"
                    className="inspiration"
                    for="exampleRadios1"
                  >
                    Inspiration
                  </label>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    className="stage"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label
                    class="form-check-label"
                    className="ideation"
                    for="exampleRadios1"
                  >
                    Ideation
                  </label>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    className="stage"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label
                    class="form-check-label"
                    className="implementation"
                    for="exampleRadios1"
                  >
                    Implementation
                  </label>
                </div>
              </Row>
              <Row>
                <Button className="btn-1" color="danger">
                  Delete
                </Button>
                <Button className="btn-2" color="light">
                  Close
                </Button>
                <Button className="btn-3" color="primary">
                  Save Change
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
}
