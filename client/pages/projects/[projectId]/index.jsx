import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
import { getModelsByID } from "../../../utils/apiWrapper";

import "../../../public/styles/project.scss";

const DESCRIPTION_LENGTH = 400;
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

  const router = useRouter();
  const { projectId } = router.query;

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    if (process.browser) {
      setWidth(document.body.clientWidth);
    }
  }, [setWidth]);

  useEffect(() => {
    const loadModel = async id => {
      if (id) {
        const model = await getModelsByID(id);
        if (model && model.data.length === 1) {
          setProject(model.data[0]);
        }
      }
    };

    loadModel(projectId);
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
            <Link
              href={`/projects/${projectId}/${activePhase}-${activeStage.name
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <Button color="primary">See more</Button>
            </Link>
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
        </div>
      )}
    </>
  );
}
