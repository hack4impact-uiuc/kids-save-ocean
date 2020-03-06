import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Gantt, Head, TipCard } from "../../../components";
import {
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
import mockData from "../../../utils/mockData";

import "../../../public/styles/project.scss";

const DESCRIPTION_LENGTH = 400;

const capitalize = str =>
  str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default function ProjectPage() {
  const [width, setWidth] = useState(null);
  const [activePhase, setActivePhase] = useState("inspiration");
  const [activeStage, setActiveStage] = useState(null);
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState(null);
  const [ganttData, setGanttData] = useState(null);

  const router = useRouter();
  const { projectId } = router.query;
  const { projects } = mockData;

  const toggleModal = () => setModal(!modal);

  if (process.browser) {
    useEffect(() => setWidth(document.body.clientWidth), [
      document.body.clientWidth
    ]);
  }

  useEffect(() => {
    if (projectId < projects.length) {
      setProject(projects[projectId]);
    }
  }, [projectId]);

  const mapGanttData = phase =>
    project.sections[phase.toLowerCase()]?.stages.map(stage => [
      `${stage.name}-${phase}-${stage.description}`,
      stage.name,
      capitalize(phase),
      new Date(stage.startdate),
      new Date(stage.enddate),
      null,
      Math.random() * 100,
      null
    ]);

  useEffect(() => {
    if (project) {
      setGanttData({
        inspiration: mapGanttData("inspiration"),
        ideation: mapGanttData("ideation"),
        implementation: mapGanttData("implementation")
      });
    }
  }, [project]);

  return (
    <>
      <Head title={project?.name} />
      {activeStage && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader>{activeStage.name}</ModalHeader>
          <ModalBody>{`${activeStage.description.slice(0, DESCRIPTION_LENGTH)}${
            activeStage.description.length > DESCRIPTION_LENGTH ? "..." : ""
          }`}</ModalBody>
          <ModalFooter>
            <a>
              <Button
                color="primary"
                href={`/projects/${projectId}/${activePhase}-${activeStage.name
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                See more
              </Button>
            </a>
            <Button onClick={toggleModal} color="danger">
              Exit
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {project && (
        <div className="project">
          <h1 className="project-info">{project.name}</h1>
          <p className="project-info">{project.description}</p>
          <hr />
          <Nav tabs justified>
            {Object.keys(project.sections).map(phase => (
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
              {Object.keys(project.sections).map(phase => (
                <TabPane key={phase} tabId={phase}>
                  <Gantt
                    data={ganttData[phase]}
                    trackHeight={60}
                    width={width}
                    selectCallback={selection => {
                      setActiveStage(
                        project.sections[activePhase].stages[selection[0].row]
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
              tips={project.sections[activePhase]?.stakeholders}
              icon="fa-user-circle-o"
            />
            <TipCard
              title="Challenges"
              tips={project.sections[activePhase]?.challenges}
              icon="fa-tag"
            />
            <TipCard
              title="Insights"
              tips={project.sections[activePhase]?.insights}
              icon="fa-lightbulb-o"
            />
          </div>
        </div>
      )}
    </>
  );
}
