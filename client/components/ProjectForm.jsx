import React from "react";
import Modal from "react-modal";
import {
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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

const MyComponent = () => <Select options={options} />;

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#root");

export default function ProjectForm() {
  var subtitle;
  var sdg;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function selectSDG(sdg_chosen) {
    sdg = sdg_chosen;
  }

  return (
    <div>
      <Button className="button-design" type="primary" onClick={openModal}>
        <strong>Get Started</strong>
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Row className="modal-row">
          <Col xs="1"></Col>
          <Col>
            <h3 className="header-modal-text">Create a Project</h3>
          </Col>
          <Col xs="1">
            <button onClick={closeModal}>X</button>
          </Col>
        </Row>
        <Row className="modal-row">
          <Col>
            <form className="modal-form">
              <label>Project Title</label>
              <Input className="form-input" placeholder="Input text..." />
            </form>
          </Col>
        </Row>
        <Row className="modal-row">
          <Col>
            <form className="modal-form">
              <label>Description</label>
              <Input
                className="form-input-description"
                placeholder="Input text..."
                rowSpan="10px"
              />
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
                  onChange={selectSDG(sdg)}
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
        <Row className="bottom-row">
          <Col align="center">
            <Button className="button-design-2" type="primary">
              <strong>Start</strong>
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
