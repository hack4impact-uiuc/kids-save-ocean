import React from "react";
import { Chart } from "react-google-charts";

export default function Gantt(props) {
  const { data, trackHeight, width, selectCallback } = props;
  const bottomHeight = 50;
  const widthAdjust = 0.8;

  return (
    <Chart
      height={`${data.length * trackHeight + bottomHeight}px`}
      width={`${width * widthAdjust}px`}
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
        ...data
      ]}
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const selection = chartWrapper.getChart().getSelection();
            if (selection.length === 1) {
              selectCallback(selection);
            }
          }
        }
      ]}
      options={{
        gantt: {
          trackHeight,
          labelStyle: {
            fontName: "Open Sans",
            fontSize: 16
          }
        }
      }}
    />
  );
}
