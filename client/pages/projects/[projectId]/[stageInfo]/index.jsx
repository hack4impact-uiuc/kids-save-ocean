import { useEffect, useState } from "react";
import { Stage } from "../../../../components";
import { useRouter } from "next/router";
import mockData from "../../../../utils/mockData";

export default function StagePage() {
  const { projects } = mockData;

  const router = useRouter();
  const [stage, setStage] = useState(null);

  const { projectId, stageInfo } = router.query;

  useEffect(() => {
    if (projectId && stageInfo && projectId < projects.length) {
      let [phase, stageName] = stageInfo.split("-");
      stageName = stageName.replace("-", " ");
      setStage(
        projects[projectId].sections[phase].stages.find(
          stage => stage.name.toLowerCase() === stageName
        )
      );
    }
  }, [projectId, stageInfo]);

  return stage ? <Stage stage={stage}></Stage> : null;
}
