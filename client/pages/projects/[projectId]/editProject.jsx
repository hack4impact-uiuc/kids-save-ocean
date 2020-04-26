import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Select from "react-select";
import classnames from "classnames";

import {
  Col,
  Button,
  Row,
  Container,
  Alert,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {
  getModelsByID,
  canEdit,
  addModelStage,
  deleteForm,
  updateProject
} from "../../../utils/apiWrapper";
import {
  Head,
  Stage,
  Loader,
  AddStage,
  WrappedMessage
} from "../../../components";
import groupSizeData from "../../../utils/groups";

import "../../../public/styles/editProject.scss";

const capitalize = str =>
  str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default WrappedMessage(function EditProjectPage(props) {
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState("inspiration");

  const [projTitle, setProjTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grpSize, setGrpSize] = useState(false);

  const router = useRouter();
  const { projectId } = router.query;

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

  const saveTopChanges = (name, description, groupSize) => {
    updateProject(projectId, name, description, groupSize.label)
      .then(() => props.setSuccess("Successfully updated"))
      .catch(() => props.setError("Failed to update project"));
  };

  const loadProject = useCallback(async () => {
    const project = await getModelsByID(projectId);
    setProject(project.data);
    setLoading(false);
    setProjTitle(project.data.name);
    setDescription(project.data.description);

    const groupSizeVal = groupSizeData.find(
      x => x.label === project.data.groupSize
    );
    setGrpSize(groupSizeVal);
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

  const renderPhaseEdit = phase => (
    <Col>
      <div className="stages">
        {project?.phases[phase].stages.map(value => (
          <Stage
            readonly={false}
            stageName={value.name}
            phaseName={phase}
            id={projectId}
            key={`${phase}-${value.name}`}
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

  const renderProjectEdit = project => (
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
                    className="form-control editor-top"
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
                    className="form-control editor-top"
                    rows="4"
                    cols="105"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                  <Row className="justify-content-around">
                    <Button
                      color="primary"
                      className="save-top-btn"
                      onClick={() =>
                        saveTopChanges(projTitle, description, grpSize)
                      }
                    >
                      Save Changes
                    </Button>
                    <Link href="/projects" as="/projects" passHref>
                      <a>
                        <Button
                          color="danger"
                          className="delete-btn"
                          onClick={deleteProject}
                        >
                          Delete Project
                        </Button>
                      </a>
                    </Link>
                  </Row>
                </div>
              </Row>
            </Col>
          </Row>
          <div className="phase-edit-section">
            <Nav tabs justified>
              {Object.keys(project?.phases).map(phase => (
                <NavItem key={phase}>
                  <NavLink
                    className={classnames(
                      { active: activePhase === phase },
                      "tab"
                    )}
                    onClick={() => {
                      setActivePhase(phase);
                    }}
                  >
                    {capitalize(phase)}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <br />
            {renderPhaseEdit(activePhase)}
          </div>
          <Link
            href="/projects/[projectId]"
            as={`/projects/${projectId}`}
            passHref
          >
            <a>
              <Button className="button-return-project">
                Return to Project Page
              </Button>
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

        {!loading && isOwner && renderProjectEdit(project)}
      </Container>
    </>
  );
});
