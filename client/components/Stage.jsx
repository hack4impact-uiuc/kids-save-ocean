import React, { Component } from "react";
import Head from "./Head";

import "../public/stage-component.scss";

export default function(props) {
  const {
    title,
    descripton,
    frameworks,
    interviews,
    stakeholders,
    resources,
    insights
  } = props;

  return (
    <>
      <Head />
      <h1 className="stage-title">{title}</h1>
    </>
  );
}
