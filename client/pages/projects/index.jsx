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
  Row
} from "reactstrap";

import "../../public/styles/projects.scss";

const DESCRIPTION_LENGTH = 200;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const populateProjects = async () => {
      const numProjects = 21;

      const models = await getModels();
      setProjects(models.data.slice(numProjects));
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
          <Row className="project-row">
            {projects &&
              projects.map(proj => (
                <Col key={proj._id} className="project-col">
                  <CardGroup>
                    <Link
                      href="projects/[projectId].jsx"
                      as={`projects/${proj._id}`}
                    >
                      <Card className="project-card">
                        <CardText top width="100%" height="100%">
                          <h3>{proj.name}</h3>
                          <br />
                          <p>{`${proj.description.slice(
                            0,
                            DESCRIPTION_LENGTH
                          )}${proj.description.length > DESCRIPTION_LENGTH &&
                            "..."}`}</p>
                        </CardText>
                      </Card>
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
