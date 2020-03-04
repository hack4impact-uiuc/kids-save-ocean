import { Head, Tips } from "./index";
import { Container, Card, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUser } from "@fortawesome/free-solid-svg-icons";

import "../public/styles/stage-component.scss";

export default function Stage(props) {
  const { data } = props;

  return (
    <>
      <Head />
      <Container>
        <h1 className="page-title">Inspiration</h1>
        {data.videoUrl && (
          <div className="stage-video">
            <video height="400px" controls>
              <source src={data.videoUrl}></source>
            </video>
          </div>
        )}
        <div className="stage-description">
          <p>{data.description}</p>
        </div>
        <Tips title="Stakeholders" tips={data.stakeholders} />
        <Tips title="Challenges" tips={data.challenges} />
        <Tips title="Insights" tips={data.insights} />

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
                <i class="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 1
              </span>
              <span>
                <i class="fa fa-tag fa-lg" aria-hidden="true"></i>
                Resource 2
              </span>
            </CardBody>
          </Card>
          <Card className="stage-card">
            <CardBody>
              <CardTitle>Insights</CardTitle>
              <span>
                <i class="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 1
              </span>
              <span>
                <i class="fa fa-lightbulb-o fa-lg" aria-hidden="true"></i>
                Insight 2
              </span>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
}
