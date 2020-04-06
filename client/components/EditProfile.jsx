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

import "../public/styles/home.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    height: "65%"
  }
};

export default function ProjectForm() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <Button className="button-design" type="primary" onClick={toggleModal}>
        <strong>Edit Profile</strong>
      </Button>
      <Modal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        style={customStyles}
        className="project-form-modal"
      >
        <ModalHeader>
          <h3 className="header-modal-text">Edit Profile</h3>
        </ModalHeader>
        <Row
          className="profile-header"
          type="flex"
          justify="center"
          xs="2"
          height="1000px"
        >
          <img
            src="/Users/ashwinsaxena/Hack4Impact/kids-save-ocean/client/public/homepage-images/stock-ocean.jpg"
            alt="Profile pic"
          />
        </Row>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                className="form-input"
                id="name"
                placeholder="Ashank Behara"
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                className="form-input"
                id="username"
                placeholder="ashank1010101"
                rowSpan="10px"
              />
            </FormGroup>
            <FormGroup>
              <Label for="about-me">Bio</Label>
              <Input
                className="form-input-description"
                id="about-me"
                placeholder="My name is ashank1010101"
                rowSpan="10px"
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    className="form-input"
                    id="project-date"
                    placeholder="ashank1010101@yahoo.com"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Birthday">Birthday</Label>
                  <Input
                    className="form-input"
                    id="project-date"
                    placeholder="01/01/2000"
                  />
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
              <strong>Cancel</strong>
            </Button>
            <Button className="button-design-2" type="submit">
              <strong>Save Profile</strong>
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
