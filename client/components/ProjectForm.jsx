import React, { useState } from "react";
// import Modal from "react-modal";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import Select from "react-select";
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

const options = [
  { value: "No Poverty", label: "No Poverty" },
  { value: "Quality Education", label: "Quality Education" }
];

export default function ProjectForm() {
  const [sdg, setSdg] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <Button className="button-design" type="primary" onClick={toggleModal}>
        <strong>Get Started</strong>
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
        <ModalBody>
          <Row className="modal-row">
            <Col>
              <form className="modal-form">
                <label>
                  Project Title
                  <Input className="form-input" placeholder="Input text..." />
                </label>
              </form>
            </Col>
          </Row>
          <Row className="modal-row">
            <Col>
              <form className="modal-form">
                <label>
                  Description
                  <Input
                    className="form-input-description"
                    placeholder="Input text..."
                    rowSpan="10px"
                  />
                </label>
              </form>
            </Col>
          </Row>
          <Row className="modal-row">
            <Col>
              <form className="modal-form">
                <label>
                  Date
                  <Input className="form-input" placeholder="MM/DD/YYYY" />
                </label>
              </form>
            </Col>
            <Col>
              <form className="modal-form">
                <label className="label-sdg">
                  SDG
                  <Select
                    className="select-sdg"
                    onChange={() => setSdg(sdg)}
                    value={sdg}
                    options={options}
                  />
                </label>
              </form>
            </Col>
          </Row>
          <Row className="modal-row">
            <Col>
              <form className="modal-form">
                <label>Country</label>
                <Input className="form-input" placeholder="United States" />
              </form>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button className="button-design-2" type="primary">
            <strong>Exit</strong>
          </Button>
          <Button className="button-design-2" type="primary">
            <strong>Start</strong>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
