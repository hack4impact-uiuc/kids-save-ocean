import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Draft } from "../components";

import "../public/styles/phase-stage.scss";
import "../public/styles/stage.scss";

export default function Stage(props) {
  const { id, phaseName, stageName, readonly } = props;

  return (
    <div className="stage">
      <FormGroup className="title">
        <Label for="exampleText">
          <h5 className="header2-text">
            <strong>{stageName}</strong>
          </h5>
        </Label>
        <Draft id={id} phaseName={phaseName} stageName={stageName} readonly={readonly} />
      </FormGroup>
    </div>
  );
}
