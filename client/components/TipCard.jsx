import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "../public/styles/tipcard.scss";

export default function TipCard(props) {
  const [modal, setModal] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const { title, tips, icon } = props;

  const toggleModal = () => setModal(!modal);

  return (
    <>
      {activeTip && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader>{activeTip.name}</ModalHeader>
          <ModalBody>{activeTip.description}</ModalBody>
          <ModalFooter>
            <Button onClick={toggleModal} color="danger">
              Exit
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <Card className="tipcard">
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <div className="tips">
            {tips &&
              tips.map(tip => (
                <button
                  key={tip.name}
                  className="tip"
                  onClick={() => {
                    setActiveTip(tip);
                    toggleModal();
                  }}
                >
                  <i className={`fa ${icon} fa-lg`} aria-hidden="true"></i>
                  {tip.name}
                </button>
              ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
