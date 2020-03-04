import { Stage } from "../../../../components";
import { useRouter } from "next/router";
import mockData from "../../../../utils/mockData";

export default function StagePage(props) {
  const router = useRouter();
  const { projectId, stage } = router.query;
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

  return <Stage data={mockData[0].sections.inspiration}></Stage>;
}
