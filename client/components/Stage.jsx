import React from "react";
import { Label } from "reactstrap";
import { Draft } from "../components";

import "../public/styles/phase-stage.scss";

export default function Stage(props) {
  const { id, phaseName, stageName, read_only } = props;

  return (
    <>
      <div className="title">
        <Label>
          <h6 className="header2-text">
            <strong>{stageName}</strong>
          </h6>
        </Label>
        <Draft
          id={id}
          phaseName={phaseName}
          stageName={stageName}
          read_only={read_only}
        />
      </div>
    </>
  );
}
