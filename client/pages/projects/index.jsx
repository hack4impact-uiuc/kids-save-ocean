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

import $ from "jquery";

const DESCRIPTION_LENGTH = 200;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const populateProjects = async () => {
      const numProjects = 20;

      const models = await getModels();

      if (models == undefined) {
        // handling no data (projects) for now
        console.log("undefined");
      } else {
        setProjects(models.data.slice(0, numProjects));
      }
    };

    var getSelectedUNGoals = async () => {
      $(document).ready(function() {
        $("select.un-goals-list").change(function() {
          var selectedGoals = [];
          $.each($(".un-goals-list option:selected"), function() {
            selectedGoals.push($(this).val());
          });

          if (selectedGoals == undefined) {
            return undefined;
          }

          return selectedGoals;
        });
      });
    };

    var getSelectedCountry = async () => {
      $(document).ready(function() {
        $("select.country-list").change(function() {
          var selectedCountry = $(this)
            .children("option:selected")
            .val();

          if (selectedCountry == undefined) {
            return undefined;
          }

          return selectedCountry;
        });
      });
    };

    var getSelectedGrpSize = async () => {
      $(document).ready(function() {
        $("select.grp-sizes-list").change(function() {
          var selectedGrpSize = $(this)
            .children("option:selected")
            .val();

          if (selectedGrpSize == undefined) {
            return undefined;
          }

          return selectedGrpSize;
        });
      });
    };

    var getDifficulty = async () => {
      $(document).ready(function() {
        $("select.difficulty-list").change(function() {
          var selectedDifficulty = $(this)
            .children("option:selected")
            .val();

          if (selectedDifficulty == undefined) {
            return undefined;
          }

          return selectedDifficulty;
        });
      });
    };

    populateProjects();
    getSelectedUNGoals();
    getSelectedCountry();
    getSelectedGrpSize();
    getDifficulty();
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
