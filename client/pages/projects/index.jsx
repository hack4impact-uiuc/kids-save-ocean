import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Head } from "../../components";
import Select from "react-select";
import countryData from "../../utils/countries";
import UNGoalData from "../../utils/goals";
import groupSizeData from "../../utils/groups";
import levelData from "../../utils/levels";
import { getModels } from "../../utils/apiWrapper";
import {
  Card,
  CardGroup,
  CardText,
  Col,
  Container,
  Input,
  Row,
  CardBody
} from "reactstrap";

import "../../public/styles/projects.scss";

const DESCRIPTION_LENGTH = 200;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const populateProjects = async () => {
      const numProjects = 20;

      const models = await getModels();
      setProjects(models.data.slice(0, numProjects));
    };

    populateProjects();
  }, []);

  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <div className="search-bar">
          <Input type="text" className="input" placeholder="Find a project" />
        </div>
        <div className="dropdowns">
          <Select
            isMulti
            className="un-goals-list"
            options={UNGoalData}
            placeholder="Select UN Goals"
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
            isClearable
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            isClearable
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
            isClearable
          />
        </div>
        <div className="project-cards">
          <Row>
            {projects &&
              projects.map(project => (
                <Col key={project._id} className="project-col">
                  <CardGroup>
                    <Link
                      href="/projects/[projectId]"
                      as={`/projects/${project._id}`}
                      passHref
                    >
                      <a>
                        <Card className="project-card">
                          <CardText width="100%" height="100%">
                            <div className="project-card-name">
                              {project.name}
                            </div>
                            <br />
                            {`${project.description.slice(
                              0,
                              DESCRIPTION_LENGTH
                            )}${project.description.length >
                              DESCRIPTION_LENGTH && "..."}`}
                          </CardText>
                        </Card>
                      </a>
                    </Link>
                  </CardGroup>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
      <div className="padding"></div>
    </>
  );
}
