import React, { useEffect, useState } from "react";
import {
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
import "../public/styles/editTemplate.scss";

export default function EditTemplate() {
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [templateID, setTemplateID] = useState("");
  const [error, setError] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isInspiration, setInspiration] = useState(false);
  const [isIdeation, setIdeation] = useState(false);
  const [isImplementation, setImplementation] = useState(false);

  const phases = ["Inspiration", "Ideation", "Implementation"];
  const inspirationIndex = 0;
  const ideationIndex = 1;
  const implementationIndex = 2;

  useEffect(() => {
    const setDisplay = async () => {
      const currentTemplates = await getTemplates();
      setTemplates(currentTemplates);

      if (currentTemplates.data.length === 0) {
        setName("");
        setInspiration(false);
        setIdeation(false);
        setImplementation(false);
      } else {
        let result;

        if (!mounted) {
          setTemplateID(currentTemplates.data[0]._id);
          setMounted(true);

          result = await getTemplateByID(currentTemplates.data[0]._id);
        } else {
          result = await getTemplateByID(templateID);
        }

        if (result && result.data !== undefined) {
          if (result.data.name !== undefined) {
            setName(result.data.name);
          } else {
            setName("");
          }
          if (result.data.phases !== undefined) {
            setInspiration(
              result.data.phases.includes(phases[inspirationIndex])
            );
            setIdeation(result.data.phases.includes(phases[ideationIndex]));
            setImplementation(
              result.data.phases.includes(phases[implementationIndex])
            );
          } else {
            setInspiration(false);
            setIdeation(false);
            setImplementation(false);
          }
        }
      }
    };

    setDisplay();
  }, [templateID, mounted]);

  const handleNewStage = async () => {
    const emptyTemplate = {
      name: "",
      draft: "",
      phases: [],
    };
    await addTemplate(emptyTemplate);
    const currentTemplates = await getTemplates();
    setTemplates(currentTemplates);
  };

  const handleDelete = async () => {
    await deleteTemplate(templateID);
    const currentTemplates = await getTemplates();
    setTemplates(currentTemplates);
  };

  const handleClose = () => {
    setName("");
    setInspiration(false);
    setIdeation(false);
    setImplementation(false);
  };

  const handleSaveAll = () => {
    if (!name || (!isInspiration && !isIdeation && !isImplementation)) {
      setError(true);
      return;
    }

    setError(false);

    let selectedPhases = [];

    if (isInspiration) {
      selectedPhases.push(phases[inspirationIndex]);
    }

    if (isIdeation) {
      selectedPhases.push(phases[ideationIndex]);
    }

    if (isImplementation) {
      selectedPhases.push(phases[implementationIndex]);
    }
    saveTemplateName(name, templateID);
    saveTemplatePhases(selectedPhases, templateID);
  };

  return (
    <div>
      {
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
                    key={template._id}
                    className="stage-button"
                    color="white"
                    onClick={() => setTemplateID(template._id)}
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
                <TemplateDraft id={templateID} />
              </Container>
              <div className="stages-txt">Which stages?</div>
              <div className="format-checkboxes">
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isInspiration}
                      onChange={() => setInspiration(!isInspiration)}
                    />{" "}
                    Inspiration
                  </Label>
                </FormGroup>
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isIdeation}
                      onChange={() => setIdeation(!isIdeation)}
                    />{" "}
                    Ideation
                  </Label>
                </FormGroup>
                <FormGroup check inline className="stage-chk">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={isImplementation}
                      onChange={() => setImplementation(!isImplementation)}
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
      }
    </div>
  );
}
