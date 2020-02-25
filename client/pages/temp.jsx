import { Stage } from "../components";

export default function(props) {
  const stageInfo = {
    title: "Ideation",
    videoUrl: "../assets/coffee-video.mp4",
    description: "Ideation description",
    frameworks: ["framework1", "framework2"],
    interviews: ["interview1", "interview2"],
    stakeholders: ["stakeholder1", "stakeholder2"],
    resources: ["resource1", "resource2"],
    insights: ["insight1", "insight2"]
  };

  return <Stage info={stageInfo}></Stage>;
}
