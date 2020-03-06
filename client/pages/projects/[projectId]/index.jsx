import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Head } from "../../../components";
import { Chart } from "react-google-charts";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";

import mockData from "../../../utils/mockData";

import "../../../public/styles/overview.scss";
import "../../../public/styles/stage-component.scss";

const TRACK_HEIGHT = 50;
const DESCRIPTION_LENGTH = 400;

export default function Overview() {
  const [width, setWidth] = useState(null);
  const [activePhase, setActivePhase] = useState("Inspiration");
  const [activeStage, setActiveStage] = useState(null);
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState(null);
  const [ganttData, setGanttData] = useState(null);
  const router = useRouter();
  const { projectId } = router.query;

  const toggleModal = () => setModal(!modal);

  if (process.browser) {
    useEffect(() => setWidth(document.body.clientWidth), [
      document.body.clientWidth
    ]);
  }

  useEffect(() => setProject(mockData[projectId]), [projectId]);

  useEffect(() => {
    if (project) {
      const mapGanttData = phase =>
        project[phase.toLowerCase()].stages.map(stage => [
          `${stage.name} (${phase})`,
          stage.name,
          phase,
          new Date(stage.startTime * 1000),
          new Date((stage.startTime + stage.duration) * 1000),
          null,
          Math.random() * 100,
          null
        ]);

      setGanttData({
        Inspiration: mapGanttData("Inspiration"),
        Ideation: mapGanttData("Ideation"),
        Implementation: mapGanttData("Implementation")
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
                href={`/projects/${projectId}/${activePhase.toLowerCase()}-${activeStage.name.toLowerCase()}`}
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

      {ganttData && (
        <div className="gantt-container">
          <Nav tabs>
            {["Inspiration", "Ideation", "Implementation"].map(phase => (
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
                  {phase}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

          <Chart
            className="gantt-chart"
            height={`${ganttData[activePhase].length * TRACK_HEIGHT + 50}px`}
            width={`${width * 0.8}px`}
            chartType="Gantt"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: "string", label: "Task ID" },
                { type: "string", label: "Task Name" },
                { type: "string", label: "Resource" },
                { type: "date", label: "Start Date" },
                { type: "date", label: "End Date" },
                { type: "number", label: "Duration" },
                { type: "number", label: "Percent Complete" },
                { type: "string", label: "Dependencies" }
              ],
              ...ganttData[activePhase]
            ]}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const selection = chartWrapper.getChart().getSelection();
                  console.log(selection);
                  console.log(project);
                  if ((selection.length = 1)) {
                    setActiveStage(
                      project[activePhase.toLowerCase()].stages[
                        selection[0].row
                      ]
                    );
                    toggleModal();
                  }
                }
              }
            ]}
            options={{
              gantt: {
                trackHeight: TRACK_HEIGHT
              }
            }}
          />
        </div>
      )}

      {project && (
        <div className="stage-cols">
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Stakeholders</CardTitle>

              <span>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                Stakeholder 1
              </span>
              <span>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                Stakeholder 2
              </span>
            </CardBody>
          </Card>
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Resources</CardTitle>

              <span>
                <i className="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 1
              </span>
              <span>
                <i className="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 2
              </span>
            </CardBody>
          </Card>
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Insights</CardTitle>
              <span>
                <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 1
              </span>
              <span>
                <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 2
              </span>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
