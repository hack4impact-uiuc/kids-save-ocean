import Head from "./Head";

import "../public/styles/stage-component.scss";

export default function Stage(props) {
  const { stage } = props;

  return (
    <>
      <Head />
      <h1 className="page-title">{stage.name}</h1>
      {stage.videoUrl && (
        <div className="stage-video">
          <video height="400px" controls>
            <source src={stage.videoUrl}></source>
          </video>
        </div>
      )}
      <div className="stage-description">
        <p>{stage.description}</p>
      </div>
    </>
  );
}
