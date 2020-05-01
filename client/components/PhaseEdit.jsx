import React, { useState, useEffect } from 'react';

import {
  Row,
  Col
} from 'reactstrap'

import Stage from './Stage';
import AddStage from './AddStage';
import PhaseDetailEdit from './PhaseDetailEdit';

import {
  getPhaseStakeholder,
  updatePhaseStakeholder,
  getPhaseChallenges,
  updatePhaseChallenges,
  getPhaseInsights,
  updatePhaseInsights
} from '../utils/apiWrapper';

export default function PhaseEdit(props) {
  return (
    <div>
      <Row>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={props.projectId}
            phaseName={props.phaseName}
            detailName={"stakeholders"}
            getPhaseDetail={ () => getPhaseStakeholder(props.projectId, props.phaseName) }
            updatePhaseDetail={ (stakeholders) => updatePhaseStakeholder(props.projectId, props.phaseName, stakeholders) }
          />
        </Col>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={props.projectId}
            phaseName={props.phaseName}
            detailName={"challenges"}
            getPhaseDetail={ () => getPhaseChallenges(props.projectId, props.phaseName) }
            updatePhaseDetail={ (challenges) => updatePhaseChallenges(props.projectId, props.phaseName, challenges) }
          />
        </Col>
        <Col sm="4">
          <PhaseDetailEdit
            projectId={props.projectId}
            phaseName={props.phaseName}
            detailName={"insights"}
            getPhaseDetail={ () => getPhaseInsights(props.projectId, props.phaseName) }
            updatePhaseDetail={ (insights) => updatePhaseInsights(props.projectId, props.phaseName, insights) }
          />
        </Col>
      </Row>
      <div className="stages">
        {props.phaseObj?.stages.map(value => (
          <Stage
            readonly={false}
            stageName={value.name}
            phaseName={props.phaseName}
            id={props.projectId}
            key={`${props.phaseName}-${value.name}`}
          />
        ))}
        <AddStage
          addStage={(stageName, startdate, enddate) =>
            props.addStage(props.projectId, props.phaseName, stageName, startdate, enddate)
          }
        />
      </div>
      <hr className="header-row-ep" />
    </div>
  );
}