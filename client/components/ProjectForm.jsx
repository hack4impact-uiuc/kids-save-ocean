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
  Row,
} from "reactstrap";
import sdgs from "../utils/goals";

import "../public/styles/home.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    height: "65%",
  },
};

export default function ProjectForm(props) {
  const [sdg, setSdg] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <Button className="button-design-3" type="primary" onClick={toggleModal}>
        Create
      </Button>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        style={customStyles}
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
                    onChange={(e) => setSdg(e.target.value)}
                  >
                    {sdgs.map((option) => (
                      <option
                        label={option.label}
                        value={option.value}
                        key={option.value}
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
              className="button-design-2"
              type="primary"
              onClick={toggleModal}
            >
              <strong>Exit</strong>
            </Button>
            <Button className="button-design-2" type="submit">
              <strong>Start</strong>
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
