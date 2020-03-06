import { useEffect, useState } from "react";
import { Stage } from "../../../../components";
import { useRouter } from "next/router";
import mockData from "../../../../utils/mockData";

export default function StagePage() {
  const router = useRouter();
  const [stage, setStage] = useState(null);

  const { projectId, phaseStage } = router.query;

  useEffect(() => {
    if (projectId && phaseStage) {
      const [phase, stageName] = phaseStage.split("-");
      setStage(
        mockData[projectId][phase].stages.find(
          stage => stage.name.toLowerCase() === stageName
        )
      );
    }
  }, [projectId, phaseStage]);

  return stage ? <Stage stage={stage}></Stage> : null;
}
