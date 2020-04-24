import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Dante from "Dante2";

import { Gantt, Head, TipCard, CommentsSection } from "../../../components";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import {
  getModelsByID,
  duplicateModel,
  getFollowingProjects,
  followProject,
  unfollowProject,
  canEdit
} from "../../../utils/apiWrapper";

import "../../../public/styles/project.scss";

// const DESCRIPTION_LENGTH = 400;
const HUNDRED = 100;

const capitalize = str =>
  str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default function ProjectPage() {
  const [width, setWidth] = useState(null);
  const [activePhase, setActivePhase] = useState("inspiration");
  const [activeStage, setActiveStage] = useState(null);
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState(null);
  const [ganttData, setGanttData] = useState(null);
  const [error, setError] = useState("");
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();
  const { projectId } = router.query;

  const toggleModal = () => setModal(!modal);

  const followProj = async () => {
    setFollowing(true);
    const resp = await followProject(projectId);
    const res = await resp.json();
    if (!res.success) {
      setFollowing(false);
      setError(res.message);
    }
  };

  const unfollowProj = async () => {
    setFollowing(false);
    const resp = await unfollowProject(projectId);
    const res = await resp.json();
    if (!res.success) {
      setFollowing(true);
      setError(res.message);
    }
  };

  useEffect(() => {
    if (process.browser) {
      setWidth(document.body.clientWidth);
    }
  }, [setWidth]);

  useEffect(() => {
    const loadModel = async id => {
      if (id) {
        const model = await getModelsByID(id);
        if (model) {
          setProject(model.data);
        }
      }
      if (localStorage.getItem("token")) {
        setLoading(true);
        const resp = await getFollowingProjects();
        const res = await resp.json();
        if (projectId && res.data.includes(projectId)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
        setLoading(false);
      }
    };

    const loadOwner = projectId => {
      canEdit(projectId)
        .then(() => {
          setIsOwner(true);
        })
        .catch(() => {
          setIsOwner(false);
        });
    };

    loadModel(projectId);
    loadOwner(projectId);
  }, [projectId]);

  useEffect(() => {
    const mapGanttData = phase =>
      project.phases[phase.toLowerCase()]?.stages.map(stage => [
        `${stage.name}-${phase}-${stage.description}`,
        stage.name,
        capitalize(phase),
        new Date(stage.startdate),
        new Date(stage.enddate),
        null,
        Math.random() * HUNDRED,
        null
      ]);

    if (project) {
      setGanttData({
        inspiration: mapGanttData("inspiration"),
        ideation: mapGanttData("ideation"),
        implementation: mapGanttData("implementation")
      });
    }
  }, [project]);

  const renderLoader = () => (
    <>
      <div className="loading-container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </>
  );

  return (
    <>
      <Head title={project?.name} />
      {loading ? (
        renderLoader()
      ) : (
        <>
          {error && <Alert color="danger">{error}</Alert>}
          {activeStage && (
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader>{activeStage.name}</ModalHeader>
              <ModalBody>
                <Dante
                  read_only
                  content={JSON.parse(activeStage.description)}
                />
              </ModalBody>
              <ModalFooter>
                <Link
                  href="/projects/[projectId]/[stageInfo]"
                  as={`/projects/${projectId}/${activePhase}-${activeStage.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  passHref
                >
                  <a>
                    <Button color="primary">See more</Button>
                  </a>
                </Link>
                <Button onClick={toggleModal} color="danger">
                  Exit
                </Button>
              </ModalFooter>
            </Modal>
          )}
          {project && (
            <div className="project">
              <div className="project-header">
                <h1 className="project-info">{project.name}</h1>
                {localStorage.getItem("token") && (
                  <>
                    {following ? (
                      <Button className="follow-btn" onClick={unfollowProj}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button className="follow-btn" onClick={followProj}>
                        Follow
                      </Button>
                    )}
                  </>
                )}
                {isOwner ? (
                  <Link
                    href="/projects/[projectId]/editProject"
                    as={`/projects/${projectId}/editProject`}
                    passHref
                  >
                    <Button>Edit</Button>
                  </Link>
                ) : (
                  <Button onClick={() => duplicateModel(project._id)}>
                    Build off this project
                  </Button>
                )}
              </div>
              <p className="project-info">{project.description}</p>
              <hr />
              <Nav tabs justified>
                {Object.keys(project.phases).map(phase => (
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
              {ganttData && (
                <TabContent activeTab={activePhase}>
                  {Object.keys(project.phases).map(phase => (
                    <TabPane key={phase} tabId={phase}>
                      <Gantt
                        data={ganttData[phase]}
                        trackHeight={60}
                        width={width}
                        selectCallback={selection => {
                          setActiveStage(
                            project.phases[activePhase].stages[selection[0].row]
                          );
                          toggleModal();
                        }}
                      />
                    </TabPane>
                  ))}
                </TabContent>
              )}
              <div className="tipcard-cols">
                <TipCard
                  title="Stakeholders"
                  tips={project.phases[activePhase]?.stakeholders}
                  icon="fa-user-circle-o"
                />
                <TipCard
                  title="Challenges"
                  tips={project.phases[activePhase]?.challenges}
                  icon="fa-tag"
                />
                <TipCard
                  title="Insights"
                  tips={project.phases[activePhase]?.insights}
                  icon="fa-lightbulb-o"
                />
              </div>

              <CommentsSection projectId={projectId} />
            </div>
          )}
        </>
      )}
    </>
  );
}
