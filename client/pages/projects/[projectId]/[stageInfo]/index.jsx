import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Head, Loader, Stage } from "../../../../components";
import { Button } from "reactstrap";

import "../../../../public/styles/stage.scss";

export default function StagePage() {
  const [stage, setStage] = useState(null);
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { projectId, stageInfo } = router.query;

  useEffect(() => {
    if (projectId && stageInfo) {
      setLoading(true);
      let [phase, stageName] = stageInfo.split("-");
      stageName = stageName.replace("-", " ");
      setStage(stageName);
      setPhase(phase);
      setLoading(false);
    }
  }, [projectId, stageInfo]);

  return (
    <div className="stage">
      <Head title={stage?.name} />
      {loading && <Loader />}
      {projectId && stage && phase && (
        <Stage read_only stageName={stage} phaseName={phase} id={projectId} />
      )}
      <div className="stage-horizontal-center">
        <Link href="/projects/[projectId]" as={`/projects/${projectId}`} passHref>
          <a>
            <Button className="button-return-project">Return</Button>
          </a>
        </Link>
      </div>
      
    </div>
  );
}
