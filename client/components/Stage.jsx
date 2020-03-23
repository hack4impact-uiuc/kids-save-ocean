import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Draft } from "../components";

import "../public/styles/phase-stage.scss";

export default function Stage(props) {
  const { description, id, phaseName, stageName } = props;

  return (
    <>
      <FormGroup className="title">
        <Label for="exampleText">
          <h5 className="header2-text">
            <strong>{description}</strong>
          </h5>
        </Label>
        <Draft id={id} phaseName={phaseName} stageName={stageName} />
      </FormGroup>
    </>
  );
}
