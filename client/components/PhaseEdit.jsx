import React from "react";

import { Row, Col } from "reactstrap";

import Stage from "./Stage";
import AddStage from "./AddStage";
import PhaseDetailEdit from "./PhaseDetailEdit";

import {
  getPhaseStakeholder,
  updatePhaseStakeholder,
  getPhaseChallenges,
  updatePhaseChallenges,
  getPhaseInsights,
  updatePhaseInsights
} from "../utils/apiWrapper";

export default function PhaseEdit(props) {
  const { projectId, phaseName, phaseObj, addStage } = props;
  return (
    <div>
      <Row>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={projectId}
            phaseName={phaseName}
            detailName={"stakeholders"}
            getPhaseDetail={() => getPhaseStakeholder(projectId, phaseName)}
            updatePhaseDetail={stakeholders =>
              updatePhaseStakeholder(projectId, phaseName, stakeholders)
            }
          />
        </Col>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={projectId}
            phaseName={phaseName}
            detailName={"challenges"}
            getPhaseDetail={() => getPhaseChallenges(projectId, phaseName)}
            updatePhaseDetail={challenges =>
              updatePhaseChallenges(projectId, phaseName, challenges)
            }
          />
        </Col>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={projectId}
            phaseName={phaseName}
            detailName={"insights"}
            getPhaseDetail={() => getPhaseInsights(projectId, phaseName)}
            updatePhaseDetail={insights =>
              updatePhaseInsights(projectId, phaseName, insights)
            }
          />
        </Col>
      </Row>
      <Row>
        <div className="col-12 stages">
          {phaseObj?.stages.map(value => (
            <Stage
              readonly={false}
              stageName={value.name}
              phaseName={phaseName}
              id={projectId}
              key={`${phaseName}-${value.name}`}
            />
          ))}
          <AddStage
            phase={phaseName}
            addStage={(stageName, startdate, enddate, template = null) => {
              addStage(
                projectId,
                phaseName,
                stageName,
                startdate,
                enddate,
                template
              );
            }}
          />
        </div>
        <hr className="header-row-ep" />
      </Row>
    </div>
  );
}
