import { Input, FormGroup, Label } from "reactstrap";
// import "../public/styles/stage.scss";
import "../public/styles/style.scss";
import "../public/styles/phase-stage.scss";
import { Draft } from "../components";

export default function(props) {
  return (
    <>
      <FormGroup className="title">
        <Label for="exampleText">
          <h5 className="header2-text">
            <strong>{props.props[0]}</strong>
          </h5>
        </Label>
        <Draft />
      </FormGroup>
    </>
  );
}
