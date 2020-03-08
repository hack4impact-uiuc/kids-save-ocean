import {
  Button,
  Card,
  CardGroup,
  CardImg,
  Col,
  Container,
  Input,
  Row,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Jumbotron,
  Alert,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselCaption,
  CarouselItem,
  FormGroup,
  Label
} from "reactstrap";
import "../public/styles/stage.scss";
import "../public/styles/style.scss";
import { Head } from ".";
export default function(props) {
  console.log("props.value");
  console.log(props);
  return (
    <>
      <Head />
      <div>
        <FormGroup style={{ marginTop: "1%", width: "50%" }}>
          <Label for="exampleText">
            <h5 classname="header2-text">
              <strong>{props.props[0]}</strong>
            </h5>
          </Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
      </div>
    </>
  );
}
