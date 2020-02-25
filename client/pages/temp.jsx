import { Stage } from "../components";

export default function(props) {
  const stageInfo = {
    title: "Implementation",
    videoUrl: "../assets/coffee-video.mp4",
    description: "Ideation description",
    frameworks: "frameworks",
    interviews: "interviews",
    stakeholders: ["stakeholder1", "stakeholder2"],
    resources: ["resource1", "resource2"],
    insights: ["insight1", "insight2"]
  };

  return <Stage info={stageInfo}></Stage>;
}
