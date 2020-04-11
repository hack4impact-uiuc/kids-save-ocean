import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import sdgs from "../utils/goals";

import "../public/styles/projectForm.scss";

export default function ProjectForm() {
  const [sdg, setSdg] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <Button className="button-design" type="primary" onClick={toggleModal}>
        Create
      </Button>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        className="project-form-modal"
      >
        <ModalHeader>
          <h3 className="header-modal-text">Create a Project</h3>
        </ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label for="project-title">Project Title</Label>
              <Input
                className="form-input"
                id="project-title"
                placeholder="Add a title..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="project-description">Description</Label>
              <Input
                className="form-input-description"
                id="project-description"
                placeholder="Add a description..."
                rowSpan="10px"
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="project-date">Date</Label>
                  <Input
                    className="form-input"
                    id="project-date"
                    placeholder="MM/DD/YYYY"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="project-sdg">SDG</Label>
                  <Input
                    className="select-sdg"
                    id="project-sdg"
                    type="select"
                    value={sdg}
                    onChange={e => setSdg(e.target.value)}
                  >
                    {sdgs.map(option => (
                      <option
                        label={option.label}
                        value={option.value}
                        key={option.key}
                      />
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="project-country">Country</Label>
              <Input
                className="form-input"
                id="project-country"
                placeholder="United States"
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              className="button-modal"
              type="primary"
              onClick={toggleModal}
            >
              <strong>Exit</strong>
            </Button>
            <Button className="button-modal" type="submit">
              <strong>Start</strong>
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
