import React, { useEffect, useState } from "react";
import { Editor, EditorState, ContentState } from "draft-js";
import "../public/styles/templates.scss";

export default function TemplatesPage() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row>
              <h1>
                <strong>Templates</strong>
              </h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
