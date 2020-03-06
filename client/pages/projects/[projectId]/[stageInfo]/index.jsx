import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Stage } from "../../../../components";
import { Button } from "reactstrap";
import mockData from "../../../../utils/mockData";

import "../../../../public/styles/stage.scss";

export default function StagePage() {
  const [stage, setStage] = useState(null);

  const router = useRouter();
  const { projectId, stageInfo } = router.query;
  const { projects } = mockData;

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

  return (
    <div className="stage">
      {stage && <Stage stage={stage}></Stage>}
      <Link href={`/projects/${projectId}`}>
        <Button color="danger">Return</Button>
      </Link>
    </div>
  );
}
