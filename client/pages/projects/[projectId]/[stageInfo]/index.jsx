import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Head } from "../../../../components";
import { Button } from "reactstrap";
import { getModelsByID } from "../../../../utils/apiWrapper";

import "../../../../public/styles/stage.scss";

export default function StagePage() {
  const [stage, setStage] = useState(null);

  const router = useRouter();
  const { projectId, stageInfo } = router.query;

  useEffect(() => {
    if (projectId && stageInfo) {
      let [phase, stageName] = stageInfo.split("-");
      stageName = stageName.replace("-", " ");

      const loadModel = async (id, phase) => {
        const model = await getModelsByID(id);
        if (model && model.data.length === 1) {
          setStage(
            model.data[0].phases[phase].stages.find(
              stage => stage.name.toLowerCase() === stageName
            )
          );
        }
      };

      loadModel(projectId, phase, stageName);
    }
  }, [projectId, stageInfo]);

  return (
    <div className="stage">
      {stage && (
        <>
          <Head title={stage.name} />
          <h1 className="stage-title">{stage.name}</h1>
          {stage.videoUrl && (
            <div className="stage-video">
              {/* 
                TODO: add YouTube iframe
               */}
            </div>
          )}
          <div className="stage-description">
            <p>{stage.description}</p>
          </div>
        </>
      )}
      <Link href="projects/[projectId]" as={`projects/${projectId}`}>
        <Button color="danger">Return</Button>
      </Link>
    </div>
  );
}
