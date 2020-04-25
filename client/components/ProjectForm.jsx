import React, { useState, useEffect } from "react";
import Router from "next/router";
import { addModel } from "../utils/apiWrapper";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  Row
} from "reactstrap";
import Select from "react-select";
import UNGoalData from "../utils/goals";
import countryData from "../utils/countries";
import groupSizeData from "../utils/groups";
import levelData from "../utils/levels";

import "../public/styles/projectForm.scss";

export default function ProjectForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);
  const [sdg, setSDGs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isModalActivated === true) {
      toggleModal();
    }
  }, [props]);

  const handleStart = async e => {
    e.preventDefault();
    if (
      sdg.length === 0 ||
      !difficulty ||
      !country ||
      !groupSize ||
      name === "" ||
      description === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    const sdgs = [];
    sdg.map(single => {
      let temp = parseInt(single.value);
      sdgs.push(temp);
    });
    const project = {
      name,
      description,
      country: country.value,
      groupSize: groupSize.value,
      difficulty: difficulty.value,
      sdg: sdgs
    };
    await addModel(project);
    Router.push("/editProject");
  };
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        returnFocusAfterClose={false}
        className="project-form-modal"
      >
        <Form>
          <div className="header-modal-text">Create a Project</div>
          {error && (
            <Alert color="danger">
              You have not filled out one or more fields. Please fill out all
              shown fields and resubmit.
            </Alert>
          )}
          <FormGroup>
            <Label for="projectTitle" className="form-label">
              Project Title
            </Label>
            <Input
              type="text"
              // valid={true}
              // invalid={true}
              className="project-title-input"
              value={name}
              id="project-title-input"
              placeholder="My Project"
              onChange={e => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="projectDesc" className="form-label">
              Description
            </Label>
            <Input
              type="text"
              // valid={true}
              // invalid={true}
              className="project-desc-input"
              value={description}
              id="project-desc-input"
              placeholder="A unique project that is effective."
              onChange={e => setDescription(e.target.value)}
              required
            />
          </FormGroup>

          <Row form>
            <Col className="left-col">
              <FormGroup>
                <Label for="projectGroupSize" className="form-label">
                  Group Size
                </Label>
                <Select
                  isClearable
                  className="project-groupsize-input"
                  options={groupSizeData}
                  placeholder="Select group size"
                  onChange={setGroupSize}
                  value={groupSize}
                />
              </FormGroup>
            </Col>
            <Col className="right-col">
              <FormGroup>
                <Label for="projectDifficulty" className="form-label">
                  Difficulty
                </Label>
                <Select
                  isClearable
                  className="project-groupsize-input"
                  options={levelData}
                  placeholder="Select difficulty"
                  onChange={setDifficulty}
                  value={difficulty}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col className="left-col">
              <FormGroup>
                <Label for="projectSDGs" className="form-label">
                  SDGs
                </Label>
                <Select
                  isMulti
                  className="project-groupsize-input"
                  options={UNGoalData}
                  placeholder="Select UN Goals"
                  onChange={setSDGs}
                  value={sdg}
                />
              </FormGroup>
            </Col>
            <Col className="right-col">
              <FormGroup>
                <Label for="projectDifficulty" className="form-label">
                  Country
                </Label>
                <Select
                  isClearable
                  className="project-groupsize-input"
                  options={countryData}
                  placeholder="Select country"
                  onChange={setCountry}
                  value={country}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <Row>
          <Button
            onClick={handleStart}
            className="button-modal"
            color="#ffcc66"
          >
            <strong>Start</strong>
          </Button>
        </Row>
      </Modal>
    </div>
  );
}
