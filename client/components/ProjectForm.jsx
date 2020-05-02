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
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [selected_sdgs, setSDGs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [typedTitle, setTypedTitle] = useState(false);
  const [typedDesc, setTypedDesc] = useState(false);

  const minTitleLength = 3;
  const maxTitleLength = 50;
  const maxDescLength = 350;
  const isCentered = true;
  useEffect(() => {
    if (props.isModalActivated === true) {
      toggleModal();
    }
  }, [props]);

  const handleStart = async e => {
    e.preventDefault();
    if (
      isTitleInvalid(projectTitle) ||
      projectTitle === "" ||
      selected_sdgs === [] ||
      !groupSize ||
      !country ||
      isDescriptionInvalid(description)
    ) {
      setErrorMessage(
        "You have not correctly filled out one or more fields. Please complete all shown fields and resubmit form."
      );
      setError(true);
    } else {
      setError(false);
      let final_difficulty = difficulty;
      let final_description = description;
      if (!difficulty) {
        final_difficulty = "";
      } else {
        final_difficulty = difficulty.value;
      }
      if (!description) {
        final_description = "";
      }
      const final_sdgs = [];
      final_sdgs.map(sdg => {
        let temp = parseInt(sdg.value);
        final_sdgs.push(temp);
      });
      const project = {
        name: projectTitle,
        description: final_description,
        country: country.value,
        groupSize: groupSize.value,
        difficulty: final_difficulty,
        sdg: final_sdgs
      };
      console.log(project);
      let resp = await addModel(project);
      if (resp) {
        toggleModal();
        Router.push("/editProject");
      }
    }
  };

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const isTitleValid = title => {
    if (title.length < minTitleLength || title.length > maxTitleLength) {
      return false;
    }
    return true;
  };

  const isTitleInvalid = title => {
    if (title.length === 0) {
      if (typedTitle) {
        return true;
      }
    } else if (title.length < minTitleLength || title.length > maxTitleLength) {
      if (!typedTitle) {
        setTypedTitle(true);
      }
      return true;
    }
    return false;
  };

  const isDescriptionValid = desc => {
    if (desc.length === 0) {
      if (!typedDesc) {
        return false;
      }
    } else if (desc.length > maxDescLength) {
      return false;
    }
    return true;
  };

  const isDescriptionInvalid = desc => {
    if (!typedDesc && desc.length > 0) {
      setTypedDesc(true);
    }
    if (desc.length > maxDescLength) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        className="project-form-modal"
        centered={isCentered}
        returnFocusAfterClose={false}
      >
        <Form>
          <div className="header-modal-text">Create a Project</div>
          {error && <Alert color="danger">{errorMessage}</Alert>}
          <FormGroup>
            <Label for="projectTitle" className="form-required-label">
              Project Title
            </Label>
            <Input
              type="text"
              className="project-title-input"
              value={projectTitle}
              valid={isTitleValid(projectTitle)}
              invalid={isTitleInvalid(projectTitle)}
              id="project-title-input"
              placeholder="Very Cool Project"
              onChange={e => setProjectTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="projectSDGs" className="form-required-label">
              SDGs
            </Label>
            <Select
              isMulti
              className="project-select"
              options={UNGoalData}
              placeholder="Select UN Goals"
              onChange={setSDGs}
              value={selected_sdgs}
            />
          </FormGroup>
          <Row form>
            <Col className="left-col">
              <FormGroup>
                <Label for="projectGroupSize" className="form-required-label">
                  Group Size
                </Label>
                <Select
                  isClearable
                  className="project-select"
                  options={groupSizeData}
                  placeholder="Select group size"
                  onChange={setGroupSize}
                  value={groupSize}
                />
              </FormGroup>
            </Col>
            <Col className="left-col">
              <FormGroup>
                <Label for="projectCountry" className="form-required-label">
                  Country
                </Label>
                <Select
                  isClearable
                  className="project-select"
                  options={countryData}
                  placeholder="Select country"
                  onChange={setCountry}
                  value={country}
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
                  className="project-select"
                  options={levelData}
                  placeholder="Select difficulty"
                  onChange={setDifficulty}
                  value={difficulty}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="desc-form">
            <Label for="projectDesc" className="form-label">
              Description
            </Label>
            <Input
              type="textarea"
              valid={isDescriptionValid(description)}
              invalid={isDescriptionInvalid(description)}
              className="project-desc-input"
              value={description}
              id="project-desc-input"
              placeholder="A very cool project."
              onChange={e => setDescription(e.target.value)}
              required
            />
          </FormGroup>
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
