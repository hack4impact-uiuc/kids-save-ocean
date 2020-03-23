import { useState } from "react";
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
          {tips &&
            tips.map(tip => (
              <span
                key={tip.name}
                className="tip"
                onClick={() => {
                  setActiveTip(tip);
                  toggleModal();
                }}
              >
                <i className={`fa ${icon} fa-lg`} aria-hidden="true"></i>
                {tip.name}
              </span>
            ))}
        </CardBody>
      </Card>
    </>
  );
}
