import { Input, FormGroup, Label } from "reactstrap";
import "../public/styles/stage.scss";
import "../public/styles/style.scss";
import "../public/styles/phase-stage.scss";
export default function(props) {
  console.log("props.value");
  console.log(props);
  return (
    <>
      <FormGroup className="title">
        <Label for="exampleText">
          <h5 classname="header2-text">
            <strong>{props.props[0]}</strong>
          </h5>
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
    </>
  );
}
