import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Head, Loader } from "../../../../components";
import { Button } from "reactstrap";
import { getModelsByID } from "../../../../utils/apiWrapper";

import "../../../../public/styles/stage.scss";

export default function StagePage() {
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { projectId, stageInfo } = router.query;

  useEffect(() => {
    if (projectId && stageInfo) {
      setLoading(true);
      let [phase, stageName] = stageInfo.split("-");
      stageName = stageName.replace("-", " ");

      const loadModel = async (id, phase) => {
        const model = await getModelsByID(id);
        if (model) {
          setStage(
            model.data.phases[phase].stages.find(
              stage => stage.name.toLowerCase() === stageName
            )
          );
        }
      };

      loadModel(projectId, phase, stageName);
      setLoading(false);
    }
  }, [projectId, stageInfo]);

  return (
    <>
      <Head title={stage?.name} />
      <div className="stage">
        {loading && <Loader />}
        {stage && (
          <>
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
        <Link
          href="/projects/[projectId]"
          as={`/projects/${projectId}`}
          passHref
        >
          <a>
            <Button color="danger">Return</Button>
          </a>
        </Link>
      </div>
    </>
  );
}
