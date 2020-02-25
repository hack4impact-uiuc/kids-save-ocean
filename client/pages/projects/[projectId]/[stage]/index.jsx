import { Stage } from "../../../../components";

export default function(props) {
  const { projectId, stage } = this.props.router.query;
  const stageInfo = {
    title: "Ideation",
    videoUrl: "https://www.youtube.com/watch?v=bBBtNQnebGQ",
    description: "Ideation description",
    frameworks: ["framework1", "framework2"],
    interviews: ["interview1", "interview2"],
    stakeholders: ["stakeholder1", "stakeholder2"],
    resources: ["resource1", "resource2"],
    insights: ["insight1", "insight2"]
  };

  return <Stage info={stageInfo}></Stage>;
}
