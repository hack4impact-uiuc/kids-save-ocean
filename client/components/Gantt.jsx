import { Chart } from "react-google-charts";

export default function Gantt(props) {
  const { data, trackHeight, width, selectCallback } = props;

  return (
    <Chart
      height={`${data.length * trackHeight + 50}px`}
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
        ...data
      ]}
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const selection = chartWrapper.getChart().getSelection();
            if ((selection.length = 1)) {
              selectCallback(selection);
            }
          }
        }
      ]}
      options={{
        gantt: {
          trackHeight
        }
      }}
    />
  );
}
