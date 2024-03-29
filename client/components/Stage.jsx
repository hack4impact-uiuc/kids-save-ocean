import React from "react";
import { Button, Label } from "reactstrap";
import { Draft } from "../components";

import "../public/styles/phase-stage.scss";

export default function Stage(props) {
  const { id, phaseName, stageName, read_only, handleDelete } = props;

  return (
    <div id={`${phaseName}-${stageName}`} className="title">
      <Label>
        <h6 className="header2-text">
          <strong>{stageName}</strong>
        </h6>
      </Label>
      {!read_only && (
        <Button
          className="delete-stage-button"
          color="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      <Draft
        id={id}
        phaseName={phaseName}
        stageName={stageName}
        read_only={read_only}
      />
    </div>
  );
}
