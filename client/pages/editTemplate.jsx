import React, { useEffect, useState } from "react";
import {
  checkAdminPrivilege,
  addTemplate,
  saveTemplateName,
  saveTemplatePhases,
  deleteTemplate,
  getTemplateByID,
  getTemplates,
} from "../utils/apiWrapper";
import { Head, TemplateDraft } from "../components";
import {
  Button,
  Row,
  Container,
  Alert,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Router from "next/router";
import "../public/styles/editTemplate.scss";

export default function EditTemplate() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [name, setName] = useState("");
  const [templateID, setTemplateID] = useState("");
  const [error, setError] = useState(false);
  const [templateDraft, setTemplateDraft] = useState("");
  const [templates, setTemplates] = useState([]);
  const [isInspiration, setInspiration] = useState(false);
  const [isIdeation, setIdeation] = useState(false);
  const [isImplementation, setImplementation] = useState(false);

  // var isTemplateBtnClicked = false;
  const phases = ["Inspiration", "Ideation", "Implementation"];
  const successStatus = 200;

  useEffect(() => {
    const getInitialDisplay = async () => {
      const currentTemplates = await getTemplates();
      setTemplates(currentTemplates);

      if (currentTemplates.data.length == 0) {
        setName("");
        setTemplateDraft("");
        setInspiration(false);
        setIdeation(false);
        setImplementation(false);
      } else {
        setTemplateID(currentTemplates.data[0]._id);

        const result = await getTemplateByID(currentTemplates.data[0]._id);

        console.log(currentTemplates.data[0]); //
        console.log(currentTemplates.data[0].draft); //
        console.log(currentTemplates.data[0].draft[2]); //

        if (result.data !== undefined && result) {
          if (result.data.name !== undefined) {
            setName(result.data.name);
          } else {
            setName("");
          }
          if (
            result.data.phases !== undefined &&
            result.data.phases !== null &&
            result.data.phases !== []
          ) {
            result.data.phases.map((phase) => {
              if (phase === phases[0]) {
                setInspiration(true);
              } else {
                setInspiration(false);
              }
              if (phase === phases[1]) {
                setIdeation(true);
              } else {
                setIdeation(false);
              }
              if (phase === phases[2]) {
                setImplementation(true);
              } else {
                setImplementation(false);
              }
            });
          } else {
            setInspiration(false);
            setIdeation(false);
            setImplementation(false);
          }
        }
      }
    };

    getInitialDisplay();
  }, []);

  useEffect(() => {
    const getUpdatedDisplay = async () => {
      const currentTemplates = await getTemplates();
      setTemplates(await getTemplates());

      if (currentTemplates.data.length == 0) {
        setName("");
        setInspiration(false);
        setIdeation(false);
        setImplementation(false);
      } else {
        // setTemplateID(templateID);
        const result = await getTemplateByID(templateID);

        if (result.data !== undefined && result) {
          if (result.data.name !== undefined) {
            setName(await result.data.name);
          } else {
            setName("");
          }
          if (
            result.data.phases !== undefined &&
            result.data.phases !== null &&
            result.data.phases !== []
          ) {
            result.data.phases.map((phase) => {
              if (phase === phases[0]) {
                setInspiration(true);
              } else {
                setInspiration(false);
              }
              if (phase === phases[1]) {
                setIdeation(true);
              } else {
                setIdeation(false);
              }
              if (phase === phases[2]) {
                setImplementation(true);
              } else {
                setImplementation(false);
              }
            });
          } else {
            setInspiration(false);
            setIdeation(false);
            setImplementation(false);
          }
        }
      }
    };

    getUpdatedDisplay();
  }, [templateID]);

  const handleID = (clickedTemplateID) => {
    setTemplateID(clickedTemplateID);
    // isTemplateBtnClicked = true;
  };

  const handleTemplateDraftChange = () => {};

  // useEffect(() => {
  //   const checkPriv = async () => {
  //     const raw_priv = await checkAdminPrivilege(templateID);
  //     const isAdmin = await raw_priv.json();
  //     if (isAdmin.status === successStatus) {
  //       setIsAdmin(true);
  //     } else {
  //       setIsAdmin(false);
  //       Router.push("/login");
  //     }
  //   };
  //   checkPriv();
  // }, []);

  const handleNewStage = async (e) => {
    e.preventDefault();
    // for future: check admin before creating
    // if (isAdmin) {
    const emptyTemplate = {
      name: "",
      draft: "",
      phases: [],
    };
    const addResult = await addTemplate(emptyTemplate);
    console.log(addResult);
    // check if successful, if so, move to the new template page
    // }
    const currentTemplates = await getTemplates();
    setTemplates(currentTemplates);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // for future: check admin before deleting
    // if (isAdmin) {
    const deleteResult = await deleteTemplate(templateID);
    // check if successful, if so, refresh page
    // }
    const currentTemplates = await getTemplates();
    setTemplates(currentTemplates);
  };

  const handleClose = async () => {
    setName("");
    setInspiration(false);
    setIdeation(false);
    setImplementation(false);
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();

    if (!name || (!isInspiration && !isIdeation && !isImplementation)) {
      setError(true);
      return;
    }

    setError(false);

    let selectedPhases = [];

    if (isInspiration) {
      selectedPhases.push(phases[0]);
    }

    if (isIdeation) {
      selectedPhases.push(phases[1]);
    }

    if (isImplementation) {
      selectedPhases.push(phases[2]);
    }

    console.log(name);
    console.log(selectedPhases);

    let result = {
      name,
    };
    const nameResult = await saveTemplateName(result, templateID);
    let phaseResult = {
      phases: selectedPhases,
    };

    console.log(result);
    console.log(phaseResult);

    const phasesResult = await saveTemplatePhases(phaseResult, templateID);

    console.log(nameResult);
    console.log(phasesResult);

    Router.push("/editTemplate#saved");
    // check if name and phase results are successful, if so, refresh page, otherwise give alert
  };

  return (
    <div>
      {isAdmin && (
        <div className="edit-template-div">
          <Head title="" />
          <div className="header-template">Templates</div>
          <Container className="template-sidebar">
            <Row>
              <Button
                onClick={handleNewStage}
                className="add-stage"
                color="white"
              >
                Add New Stage
              </Button>
            </Row>
            <Row>
              {templates.data &&
                templates.data.map((template) => (
                  <Button
                    className="stage-button"
                    color="white"
                    onClick={(e) => handleID(template._id)}
                  >
                    {template.name}
                  </Button>
                ))}
            </Row>
          </Container>
          <Container className="main-template-container">
            {error && (
              <Alert color="danger">
                You have not filled out one or more fields. Please fill out all
                shown fields and resave.
              </Alert>
            )}
            <Form>
              <Input
                type="text"
                className="main-template-title"
                value={name}
                id="template-title"
                placeholder="Stage Title"
                onChange={(e) => setName(e.target.value)}
                required
              ></Input>
              <Row className="main-template-subtitle">Template</Row>
              <Container className="draft-container">
                <TemplateDraft
                  id={templateID}
                  onChange={handleTemplateDraftChange}
                />
              </Container>
              <div className="stages-txt">Which stages?</div>
              <div className="format-checkboxes">
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isInspiration}
                      onChange={(e) => setInspiration(!isInspiration)}
                    />{" "}
                    Inspiration
                  </Label>
                </FormGroup>
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isIdeation}
                      onChange={(e) => setIdeation(!isIdeation)}
                    />{" "}
                    Ideation
                  </Label>
                </FormGroup>
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isImplementation}
                      onChange={(e) => setImplementation(!isImplementation)}
                    />
                    Implementation
                  </Label>
                </FormGroup>
              </div>
              <Row>
                <div className="bottom-buttons">
                  <Button
                    onClick={handleDelete}
                    className="btn-1"
                    color="danger"
                  >
                    Delete
                  </Button>
                  <Button onClick={handleClose} className="btn-2" color="light">
                    Close
                  </Button>
                  <Button
                    onClick={handleSaveAll}
                    className="btn-3"
                    color="primary"
                  >
                    Save Change
                  </Button>
                </div>
              </Row>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
}
