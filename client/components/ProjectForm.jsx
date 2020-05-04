import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import Router from "next/router";
import { Loader } from "../components";
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
  Row,
  Tooltip,
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
  const [success, setSuccess] = useState(false);
  const [selected_sdgs, setSDGs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [typedTitle, setTypedTitle] = useState(false);
  const [typedDesc, setTypedDesc] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasPressedSubmit, setPressedSubmit] = useState(false);
  const minTitleLength = 3;
  const maxTitleLength = 50;
  const maxDescLength = 350;
  const isCentered = true;

  const sdgStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: 45,
      backgroundColor: "white",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        // color: isDisabled
        //   ? '#ccc'
        //   : isSelected
        //   ? chroma.contrast(color, 'white') > 2
        //     ? 'white'
        //     : 'black'
        //   : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.2).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    if (props.isModalActivated === true) {
      toggleModal();
    }
  }, [props]);

  const handleStart = async (e) => {
    setIsWaiting(true);
    setErrorMessage("Validating project...");
    e.preventDefault();
    if (
      isTitleInvalid(projectTitle) ||
      projectTitle === "" ||
      selected_sdgs === [] ||
      !groupSize ||
      !country ||
      isDescriptionInvalid(description)
    ) {
      setTimeout(() => {
        setIsWaiting(false);
        setErrorMessage(
          "You have not correctly filled out one or more fields. Please complete all required fields and resubmit form."
        );
        setError(false);
        setError(true);
        setPressedSubmit(true);
      }, 1000);
    } else {
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
      final_sdgs.map((sdg) => {
        let temp = parseInt(sdg.value);
        final_sdgs.push(temp);
      });
      const project = {
        name: projectTitle,
        description: final_description,
        country: country.value,
        groupSize: groupSize.value,
        difficulty: final_difficulty,
        sdg: final_sdgs,
        phases: {
          inspiration: { stages: [] },
          ideation: { stages: [] },
          implementation: { stages: [] },
        },
      };
      let resp = await addModel(project);

      if (resp) {
        setTimeout(() => {
          setIsWaiting(false);
          setError(false);
          setSuccess(true);
          setPressedSubmit(true);
        }, 1000);
        setTimeout(() => {
          toggleModal();
          Router.push(`/projects/${resp.data.data._id}`);
        }, 1500);
      } else {
        setTimeout(() => {
          setIsWaiting(false);
          setError(true);
          setPressedSubmit(true);
          setErrorMessage(
            "Project was not submitted due to bad data. Please try again later. If the issue persists, please contact us!"
          );
        }, 1500);
      }
    }
  };

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const isTitleValid = (title) => {
    if (title.length < minTitleLength || title.length > maxTitleLength) {
      return false;
    }
    return true;
  };

  const isTitleInvalid = (title) => {
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

  const isDescriptionValid = (desc) => {
    if (desc.length === 0) {
      if (!typedDesc) {
        return false;
      }
    } else if (desc.length > maxDescLength) {
      return false;
    }
    return true;
  };

  const isDescriptionInvalid = (desc) => {
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
        // scrollable={true}
      >
        <Form>
          <div className="header-modal-text">Create a Project</div>
          {error && hasPressedSubmit && (
            <Alert color="danger" className="invalid-alert">
              <div className="error-message">{errorMessage}</div>
            </Alert>
          )}
          {success && !isWaiting && (
            <Alert color="success" className="invalid-alert">
              <div className="error-message">Successfully created project!</div>
            </Alert>
          )}
          {isWaiting && !hasPressedSubmit && (
            <div className="validating-div">Validating project...</div>
          )}
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
              placeholder="Must be between 3 and 50 characters long"
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Row className="sdg-row">
              <Label for="projectSDGs" className="sdg-required-label">
                SDGs
              </Label>
              <a
                href="https://sustainabledevelopment.un.org/sdgs"
                className="sdg-link"
              >
                <svg className="info-icon" id="tooltip-id">
                  <path d="M6.3 5.69a.942.942 0 01-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 01-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"></path>
                </svg>
              </a>
              <Tooltip
                placement="left"
                isOpen={tooltipOpen}
                target="tooltip-id"
                toggle={toggleTooltip}
                innerClassName="tooltip-sdg"
                arrowClassName="tooltip-sdg-arrow"
              >
                Need help choosing SDGs? Click the info button!
              </Tooltip>
            </Row>

            <Select
              isMulti
              className="project-select"
              options={UNGoalData}
              styles={sdgStyles}
              placeholder="Select one or more SDGs..."
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
                  // placeholder="Select group size"
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
                  // placeholder="Select country"
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
                  placeholder="N/A"
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
              placeholder="Optional..."
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          {description && (
            <div className="char-count">
              Characters left: {maxDescLength - description.length}
            </div>
          )}
          {!description && (
            <div className="char-count">Characters left: {maxDescLength}</div>
          )}
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
