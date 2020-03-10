import { Col, Row } from "reactstrap";
import "../public/styles/navbar.scss";

export default function NavBar() {
  return (
    <Row className="header-row" justify="center" align="middle">
      <Col xs="1">
        <img className="header-img" src="/homepage-images/menu-icon.png" />
      </Col>
      <Col xs="1">
        <img className="header-img" src="/homepage-images/kso-icon.png" />
      </Col>
      <Col xs={{ size: 1, offset: 8 }}>
        <img
          className="header-img"
          src="/homepage-images/notification-icon.png"
        />
      </Col>
      <Col xs="1">
        <img className="header-img" src="/homepage-images/user-icon.png" />
      </Col>
    </Row>
  );
}