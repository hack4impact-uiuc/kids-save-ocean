import { Input, FormGroup, Label } from "reactstrap";
import "../public/styles/phase-stage.scss";
import { Draft } from "../components";

export default function(props) {
  return (
    <>
      <FormGroup className="title">
        <Label for="exampleText">
          <h5 className="header2-text">
            <strong>{props.description}</strong>
          </h5>
        </Label>
        <Draft
          id={props.id}
          phaseName={props.phaseName}
          stageName={props.stageName}
        />
      </FormGroup>
    </>
  );
}
