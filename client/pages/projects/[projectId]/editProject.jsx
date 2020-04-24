import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Input,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Container,
  Alert
} from "reactstrap";
import { getModelsByID, canEdit } from "../../../utils/apiWrapper";
import { Head, Stage } from "../../../components";
import "../../../public/styles/editProject.scss";

export default function EditProjectPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { projectId } = router.query;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const loadProject = async projectId => {
      const project = await getModelsByID(projectId);
      setProject(project.data);
      setLoading(false);
    };

    const loadOwner = projectId => {
      canEdit(projectId)
        .then(resp => {
          console.log(resp);
          setIsOwner(true);
          loadProject(projectId);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    if (projectId !== undefined) {
      loadOwner(projectId);
    }
  }, [projectId]);

  const renderProjectEdit = (project, dropdownOpen) => (
    <div>
      <Row>
        <Col className="home-block-col">
          <Row className="home-block-1-ep">
            <div className="div-1-ep">
              <h1 className="header2-text-ep-other">
                <strong>{project?.name}</strong>
              </h1>
              <h3 className="header3">{project?.description}</h3>

              <Dropdown
                className="dropdown"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle caret>Choose SDG's</DropdownToggle>
                <DropdownMenu>
                  <FormGroup check>
                    <Row>
                      <Label className="label" for="exampleCheck" check>
                        No Poverty
                      </Label>
                      <Input
                        className="input"
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                    </Row>
                    <Row>
                      <Label className="label" for="exampleCheck" check>
                        {" "}
                        Zero Hunger
                      </Label>
                      <Input
                        className="input"
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                    </Row>
                    <Row>
                      <Label className="label" for="exampleCheck" check>
                        {" "}
                        Good Health & Well-Being
                      </Label>
                      <Input
                        className="input"
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                    </Row>
                    <Row>
                      <Label className="label" for="exampleCheck" check>
                        Quality Education
                      </Label>
                      <Input
                        className="input"
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                    </Row>
                    <Row>
                      <Label className="label" for="exampleCheck" check>
                        {" "}
                        Gender Equality
                      </Label>
                      <Input
                        className="input"
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                    </Row>
                  </FormGroup>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Row>
        </Col>
      </Row>
      <Col>
        <Row className="other-row">
          <h2 className="header2-text-ep-other">
            {" "}
            <strong> Inspiration </strong>{" "}
          </h2>
        </Row>
        <Row className="inspo-des">
          <h4 className="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button className="button-add">Add Stage</Button>
        </Row>
        <hr className="divider-stage" />
        <div className="stages">
          {project?.phases.inspiration.stages.map((value, idx) => (
            <Stage
              readonly={false}
              stageName={value.name}
              phaseName={"inspiration"}
              id={project?._id}
              key={idx}
            />
          ))}
        </div>
        <hr className="header-row-ep" />
      </Col>
      <Col>
        <Row className="other-row">
          <h2 className="header2-text-ep-other">
            {" "}
            <strong> Ideation </strong>{" "}
          </h2>
        </Row>
        <Row className="other-row">
          <h4 className="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button className="button-add">Add Stage</Button>
        </Row>
        <hr className="divider-stage" />
        <div className="stages">
          {project?.phases.ideation.stages.map((value, idx) => (
            <Stage
              readonly={false}
              stageName={value.name}
              phaseName={"ideation"}
              id={project?._id}
              key={idx}
            />
          ))}
        </div>
        <hr className="header-row-ep" />
      </Col>
      <Col>
        <Row className="other-row">
          <h2 className="header2-text-ep-other">
            {" "}
            <strong> Implementation </strong>{" "}
          </h2>
        </Row>
        <Row className="other-row">
          <h4 className="header2-text-ep-other">
            Morbi sit amet rutrum leo. Maecenas molestie, odio eu condimentum
            elementum, enim ante posuere ante, nec suscipit tellus erat quis mi.
            Suspendisse vehicula finibus leo, ut molestie lacus eleifend non.
            Phasellus non risus nibh. In hac habitasse platea dictumst.
          </h4>
        </Row>
        <Row className="header-row-ep">
          <Button className="button-add">Add Stage</Button>
        </Row>
        <hr className="divider-stage" />
        <div className="stages">
          {project?.phases.implementation.stages.map((value, idx) => (
            <Stage
              readonly={false}
              stageName={value.name}
              phaseName={"implementation"}
              id={project?._id}
              key={idx}
            />
          ))}
        </div>
        <hr className="header-row-ep" />
      </Col>
    </div>
  );

  return (
    <>
      <Head title={project?.name} />
      <Container>
        {!loading && !isOwner && (
          <Alert color="danger">
            <div justify="center" align="middle">
              You cannot edit this project
            </div>
          </Alert>
        )}

        {!loading && isOwner && renderProjectEdit(project, dropdownOpen)}
      </Container>
    </>
  );
}
