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
import "../../../api/public/schema/projectSchema";

import $ from "jquery";
import Fuse from "fuse.js";

const DESCRIPTION_LENGTH = 200;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const populateProjects = async () => {
      var numProjects = 20;

      const models = await getModels();
      var filteredModels = [];

      const UNGoals = await getSelectedUNGoals();
      const country = await getSelectedCountry();
      const grpSize = await getSelectedGrpSize();
      const difficulty = await getDifficulty();

      var isMatchingSDG = false;
      var isMatchingCountry = false;
      var isMatchingGrpSize = false;
      var isMatchingDifficulty = false;

      for (var i = 0; i < models.length; i++) {
        for (var j = 0; j < UNGoals.length; j++) {
          if (UNGoals == undefined || models[i].sdg == UNGoals[j]) {
            isMatchingSDG = true;
          }

          if (country == undefined || models[i].country == country) {
            isMatchingCountry = true;
          }

          if (grpSize == undefined || models[i].groupSize == grpSize) {
            isMatchingGrpSize = true;
          }

          if (country == undefined || models[i].difficulty == difficulty) {
            isMatchingDifficulty = true;
          }

          if (
            isMatchingSDG &&
            isMatchingCountry &&
            isMatchingGrpSize &&
            isMatchingDifficulty
          ) {
            filteredModels.push(models[i]);
          }

          isMatchingSDG = false;
          isMatchingCountry = false;
          isMatchingGrpSize = false;
          isMatchingDifficulty = false;
        }
      }

      var userInput = await getSearchBarText();

      // to remove
      console.log(userInput);

      let options = {
        minMatchCharLength: 5,
        keys: ["name", "description"]
      };

      // handling no data (projects)
      if (filteredModels.length == 0) {
        // to remove
        console.log("undefined");
        return;
      }

      if (filteredModels.length < numProjects) {
        numProjects = filteredModels.length;
      }

      if (userInput.length == 0) {
        setProjects(filteredModels.data.slice(0, numProjects));
      } else {
        let fuse = new Fuse(filteredModels.data, options);
        let result = fuse.search(userInput);
      }

      setProjects(result.slice(0, numProjects));
    };

    var getSearchBarText = async () => {
      var text = await document.getElementById("user-input").value;

      return text;
    };

    var getSelectedUNGoals = async () => {
      $(document).ready(function() {
        $("select.un-goals-list").change(function() {
          var selectedGoals = [];
          $.each($(".un-goals-list option:selected"), function() {
            selectedGoals.push($(this).val().value);
          });

          if (selectedGoals.length == 0) {
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
  }, []);

  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        <div className="search-bar">
          <Input
            type="text"
            className="input"
            id="user-input"
            placeholder="Find a project"
          />
        </div>
        <div className="dropdowns">
          <Select
            isMulti
            className="un-goals-list"
            options={UNGoalData}
            placeholder="Select UN Goals"
            // onChange={this.}
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
            isClearable
            // onChange={this.handleChange()}
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            isClearable
            // onChange={this.handleChange()}
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
            isClearable
            // onChange={this.handleChange()}
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
