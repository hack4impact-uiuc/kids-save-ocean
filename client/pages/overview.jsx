import { Chart } from "react-google-charts";
import mockData from "../utils/mockData";

const ganttData = mockData[0].stages.map(stage => [
  `${stage.name} (${stage.section})`,
  stage.name,
  stage.section,
  new Date(stage.startTime * 1000),
  new Date((stage.startTime + stage.duration) * 1000),
  null,
  Math.random() * 100,
  null
]);

export default function Overview(props) {
  return (
    <div className="gantt-container">
      <Chart
        className="gantt-chart"
        width="100%"
        height="400px"
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
          ...ganttData
        ]}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30
          }
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
