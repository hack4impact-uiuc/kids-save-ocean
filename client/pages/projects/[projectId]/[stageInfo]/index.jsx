import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Head, Stage } from "../../../../components";
import { Button } from "reactstrap";
import { getModelsByID } from "../../../../utils/apiWrapper";

import "../../../../public/styles/stage.scss";

export default function StagePage() {
  const [stage, setStage] = useState(null);
  const [phase, setPhase] = useState(null);

  const router = useRouter();
  const { projectId, stageInfo } = router.query;

  useEffect(() => {
    if (projectId && stageInfo) {
      let [phase, stageName] = stageInfo.split("-");
      stageName = stageName.replace("-", " ");
      setStage(stageName);
      setPhase(phase);
    }
  }, [projectId, stageInfo]);

  return (
    <div>
      {(projectId && stage && phase) &&
        <Stage
          read_only
          stageName={stage}
          phaseName={phase}
          id={projectId}
        />
      }
      <Link href="/projects/[projectId]" as={`/projects/${projectId}`} passHref>
        <a>
          <Button color="danger">Return</Button>
        </a>
      </Link>
    </div>
  );
}
