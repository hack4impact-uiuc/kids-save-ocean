import React, { Component } from "react";
import Head from "./Head";

import "../public/stage-component.scss";

export default function(props) {
  const { info } = props;

  return (
    <>
      <Head />
      <h1 className="stage-title">{info.title}</h1>
      <video className="stage-video" controls>
        <source src={info.videoUrl}></source>
      </video>
    </>
  );
}
