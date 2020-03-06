import { Head, Tips } from "./index";
import { Container, Card, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUser } from "@fortawesome/free-solid-svg-icons";

import "../public/styles/stage-component.scss";

export default function Stage(props) {
  const { stage } = props;

  return (
    <>
      <Head />
      <Container>
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
        {/* <Tips
          key="stakeholders"
          title="Stakeholders"
          tips={data.stakeholders}
        />
        <Tips key="challenges" title="Challenges" tips={data.challenges} />
        <Tips key="insights" title="Insights" tips={data.insights} /> */}

        <div className="stage-cols">
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Stakeholders</CardTitle>

              <span>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                Stakeholder 1
              </span>
              <span>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                Stakeholder 2
              </span>
            </CardBody>
          </Card>
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Resources</CardTitle>

              <span>
                <i className="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 1
              </span>
              <span>
                <i className="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 2
              </span>
            </CardBody>
          </Card>
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Insights</CardTitle>
              <span>
                <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 1
              </span>
              <span>
                <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 2
              </span>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
}
