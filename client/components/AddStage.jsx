import React, { useState } from "react";
import { Button, Col, Input, Row, FormGroup, Label } from "reactstrap";

import WrappedError from "./WrappedError";

import "../public/styles/addstage.scss";

export default WrappedError(function AddStage(props) {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [stageName, setStageName] = useState("");

  const submit = (stageName, startdate, enddate) => {
    if (stageName === "" || startdate === "" || enddate === "") {
      props.setError("Missing required fields");
      return;
    }

    props.addStage(stageName, startdate, enddate);
    setStartdate("");
    setEnddate("");
    setStageName("");
  };

  return (
    <Row className="header-row-ep">
      <Col sm="4">
        <FormGroup>
          <Label>Stage Name</Label>
          <Input
            className="form-input"
            placeholder="Enter a stage name"
            onChange={e => setStageName(e.target.value)}
            value={stageName}
          />
        </FormGroup>
      </Col>
      <Col sm="3">
        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            className="form-input"
            onChange={e => setStartdate(e.target.value)}
            value={startdate}
          />
        </FormGroup>
      </Col>
      <Col sm="3">
        <FormGroup>
          <Label>End Date</Label>
          <Input
            type="date"
            className="form-input"
            onChange={e => setEnddate(e.target.value)}
            value={enddate}
          />
        </FormGroup>
      </Col>
      <Col sm="2">
        <Button
          className="button-add-stage"
          onClick={() => submit(stageName, startdate, enddate)}
        >
          Add Stage
        </Button>
      </Col>
    </Row>
  );
});
