import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, FormGroup, Label } from "reactstrap";
import Select from "react-select";

import WrappedMessage from "./WrappedMessage";

import "../public/styles/addstage.scss";
import { getTemplates } from "../utils/apiWrapper";

export default WrappedMessage(function AddStage({ addStage, phase, setError }) {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [stageName, setStageName] = useState("");
  const [templateNames, setTemplateNames] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const populateTemplates = async () => {
      const response = await getTemplates();

      setAllTemplates([]);
      setTemplateNames([]);
      setTemplate(null);

      response.data.map(template => {
        if (
          template.phases.includes(
            capitalize(phase)
          )
        ) {
          setAllTemplates(allTemplates => allTemplates.concat(template));
          setTemplateNames(templateNames =>
            templateNames.concat({
              label: template.name,
              value: templateNames.length
            })
          );
        }
      });
    };

    populateTemplates();
  }, [phase]);

  const capitalize = str => str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const submit = (stageName, startdate, enddate) => {
    if (stageName === "" || startdate === "" || enddate === "") {
      setError("Missing required fields");
      return;
    }

    template
      ? addStage(stageName, startdate, enddate, allTemplates[template.value])
      : addStage(stageName, startdate, enddate);
    setStartdate("");
    setEnddate("");
    setStageName("");
    setTemplate(null);
  };

  return (
    <Row className="add-stage">
      <Col sm="3">
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
        <FormGroup>
          <Label>Optional: Template</Label>
          <Select
            isClearable
            className="select-template"
            options={templateNames}
            placeholder="Blank"
            onChange={setTemplate}
            value={template}
          />
        </FormGroup>
      </Col>
      <Col sm="1">
        <Button
          className="button-add-stage"
          onClick={() => submit(stageName, startdate, enddate)}
          color="primary"
        >
          Add Stage
        </Button>
      </Col>
    </Row>
  );
});
