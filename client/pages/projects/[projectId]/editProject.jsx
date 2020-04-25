import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Col,
  Input,
  Button,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Container,
  Alert
} from "reactstrap";
import {
  getModelsByID,
  canEdit,
  addModelStage,
  deleteForm
} from "../../../utils/apiWrapper";
import {
  Head,
  Stage,
  Loader,
  AddStage,
  WrappedError
} from "../../../components";
import "../../../public/styles/editProject.scss";

export default WrappedError(function EditProjectPage(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState(false);

  const router = useRouter();
  const { projectId } = router.query;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleTitleChange = projTitle => {
    setProjTitle(projTitle.target.value);
  };

  const handleDescriptionChange = description => {
    setDescription(description.target.value);
  };

  const handleGrpSizeChange = grpSize => {
    setGrpSize(grpSize);
  };

  const deleteProject = id => {
    deleteForm(id);
  };

  const loadProject = useCallback(async () => {
    const project = await getModelsByID(projectId);
    setProject(project.data);
    setLoading(false);
  }, [projectId]);

  const addStage = (projectId, phaseName, stageName, start, end) => {
    addModelStage(projectId, phaseName, stageName, start, end)
      .then(() => {
        loadProject();
      })
      .catch(() => props.setError("Failed to add stage"));
  };

  useEffect(() => {
    const loadOwner = projectId => {
      canEdit(projectId)
        .then(() => {
          setIsOwner(true);
          loadProject();
        })
        .catch(() => {
          setLoading(false);
        });
    };

    if (projectId !== undefined) {
      loadOwner(projectId);
    }
  }, [projectId, loadProject]);

  const renderPhaseEdit = (phase, phaseName, stages) => {
    return (
      <Col>
        <Row className="other-row">
          <h2 className="header2-text-ep-other">
            {" "}
            <strong> {phaseName} </strong>{" "}
          </h2>
        </Row>
        <hr className="divider-stage" />
        <div className="stages">
          {stages.map((value, idx) => (
            <Stage
              readonly={false}
              stageName={value.name}
              phaseName={phase}
              id={projectId}
              key={idx}
            />
          ))}
          <AddStage
            addStage={(stageName, startdate, enddate) =>
              addStage(projectId, phase, stageName, startdate, enddate)
            }
          />
        </div>
        <hr className="header-row-ep" />
      </Col>
    );
  };

  const renderProjectEdit = (project, dropdownOpen) => (
    <div>
      <Head title={project?.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col className="home-block-col">
              <Row className="home-block-1-ep">
                <h1 className="proj-title">
                  <strong>Edit Project</strong>
                </h1>
                <div className="div-1-ep">
                  <h4 className="proj-title-h">Project Title</h4>
                  <input
                    type="text"
                    className="form-control"
                    className="editor-top"
                    size="50"
                    value={projTitle}
                    onChange={handleTitleChange}
                  ></input>
                  <h4 className="num-ppl-h">How many people?</h4>
                  <Select
                    isClearable
                    className="grp-sizes-list"
                    options={groupSizeData}
                    placeholder="Change group size"
                    value={grpSize}
                    onChange={handleGrpSizeChange}
                  />
                  <h4 className="proj-descrip-h">Project Description</h4>
                  <textarea
                    className="form-control"
                    className="editor-top"
                    rows="4"
                    cols="105"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                  <Button className="save-top-btn" onClick={saveTopChanges}>
                    Save Changes
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="other-row">
            <Button className="inspiration-btn">Inspiration</Button>
            <Button className="ideation-btn">Ideation</Button>
            <Button className="implementation-btn">Implementation</Button>
            <Button className="delete-btn" onClick={deleteProject}>
              <a href="/projects">Delete Project</a>
            </Button>
          </Row>
          {renderPhaseEdit("inspiration", "Inspiration", project?.phases.inspiration.stages)}
          {renderPhaseEdit("ideation", "Ideation", project?.phases.ideation.stages)}
          {renderPhaseEdit("implementation", "Implementation", project?.phases.implementation.stages)}
          <Link href="/projects/[projectId]" as={`/projects/${projectId}`} passHref>
            <a>
              <Button className="button-return-project">Return to Project Page</Button>
            </a>
          </Link>
        </>
      )}
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
});
