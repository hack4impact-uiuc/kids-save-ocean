import React, { Component } from "react";
import Head from "./Head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../public/stage-component.scss";

export default function(props) {
  const { info } = props;

  return (
    <>
      <Head />
      <h1 className="stage-title">{info.title}</h1>
      <div className="stage-video">
        <video height="400px" controls>
          <source src={info.videoUrl}></source>
        </video>
      </div>
      <div className="stage-content">
        <p>{info.description}</p>
      </div>
      <div className="stage-content">
        <h2 className="stage-title">Create Frameworks</h2>
        <p>{info.frameworks}</p>
      </div>
      <div className="stage-content">
        <h2 className="stage-title">Interviews</h2>
        <p>{info.interviews}</p>
      </div>
    </>
  );
}
