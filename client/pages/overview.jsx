import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import mockData from "../utils/mockData";

import "../public/styles/overview.scss";

const inspirationData = mockData[0].inspiration.stages.map(stage => [
  `${stage.name} (Inspiration)`,
  stage.name,
  "Inspiration",
  new Date(stage.startTime * 1000),
  new Date((stage.startTime + stage.duration) * 1000),
  null,
  Math.random() * 100,
  null
]);

const ideationData = mockData[0].ideation.stages.map(stage => [
  `${stage.name} (Ideation)`,
  stage.name,
  "Ideation",
  new Date(stage.startTime * 1000),
  new Date((stage.startTime + stage.duration) * 1000),
  null,
  Math.random() * 100,
  null
]);

const implementationData = mockData[0].implementation.stages.map(stage => [
  `${stage.name} (Implementation)`,
  stage.name,
  "Implementation",
  new Date(stage.startTime * 1000),
  new Date((stage.startTime + stage.duration) * 1000),
  null,
  Math.random() * 100,
  null
]);

export default function Overview(props) {
  // console.log(`${document.body.clientWidth * 2.4}px`);
  const [width, setWidth] = useState(null);
  if (process.browser) {
    useEffect(() => setWidth(document.children[0].clientWidth), [
      document.children[0].clientWidth
    ]);
  }
  return (
    <div className="gantt-container">
      <Chart
        className="gantt-chart"
        height={`${(inspirationData.length +
          ideationData.length +
          implementationData.length) *
          30 +
          50}px`}
        width={`${width * 2.4}px`}
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
          ...inspirationData,
          ...ideationData,
          ...implementationData
        ]}
        options={{
          gantt: {
            trackHeight: 30
          }
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
