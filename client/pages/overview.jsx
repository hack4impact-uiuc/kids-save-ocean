import { useEffect, useState } from "react";
import { Head } from "../components";
import { Chart } from "react-google-charts";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";

import mockData from "../utils/mockData";

import "../public/styles/overview.scss";

const mapGanttData = phase =>
  mockData[0][phase.toLowerCase()].stages.map(stage => [
    `${stage.name} (${phase})`,
    stage.name,
    phase,
    new Date(stage.startTime * 1000),
    new Date((stage.startTime + stage.duration) * 1000),
    null,
    Math.random() * 100,
    null
  ]);

const ganttData = {
  Inspiration: mapGanttData("Inspiration"),
  Ideation: mapGanttData("Ideation"),
  Implementation: mapGanttData("Implementation")
};

const TRACK_HEIGHT = 50;
const DESCRIPTION_LENGTH = 400;

export default function Overview(props) {
  const [width, setWidth] = useState(null);
  const [activePhase, setActivePhase] = useState("Inspiration");
  const [activeStage, setActiveStage] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  if (process.browser) {
    useEffect(() => setWidth(document.body.clientWidth), [
      document.body.clientWidth
    ]);
  }

  /* add once backend connected

  const [project, setProject] = useState(null);
  const { projectId } = router.query;
  useEffect(async () => {
    const project = await getProjectById(projectId);
    if (project) {
      setProject(project);
    }
  })
  */

  return (
    <>
      <Head title="Overview" /> {/* title={project?.name} */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>{activeStage?.name}</ModalHeader>
        <ModalBody>{`${activeStage?.description.slice(0, DESCRIPTION_LENGTH)}${
          activeStage?.description.length > DESCRIPTION_LENGTH ? "..." : ""
        }`}</ModalBody>
        <ModalFooter>
          <a>
            <Button color="primary">See more</Button>
          </a>
          <Button onClick={toggleModal} color="danger">
            Exit
          </Button>
        </ModalFooter>
      </Modal>
      <div className="gantt-container">
        <Nav tabs>
          {["Inspiration", "Ideation", "Implementation"].map(phase => (
            <NavItem key={phase}>
              <NavLink
                className={classnames(
                  {
                    active: activePhase === phase
                  },
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
              {
                type: "string",
                label: "Task ID"
              },
              {
                type: "string",
                label: "Task Name"
              },
              {
                type: "string",
                label: "Resource"
              },
              {
                type: "date",
                label: "Start Date"
              },
              {
                type: "date",
                label: "End Date"
              },
              {
                type: "number",
                label: "Duration"
              },
              {
                type: "number",
                label: "Percent Complete"
              },
              {
                type: "string",
                label: "Dependencies"
              }
            ],
            ...ganttData[activePhase]
          ]}
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const selection = chartWrapper.getChart().getSelection();
                if ((selection.length = 1)) {
                  setActiveStage(
                    mockData[0][activePhase.toLowerCase()].stages[
                      selection[0].row
                    ]
                  );
                  console.log(activeStage);
                  console.log(
                    mockData[0][activePhase.toLowerCase()].stages[
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
    </>
  );
}
