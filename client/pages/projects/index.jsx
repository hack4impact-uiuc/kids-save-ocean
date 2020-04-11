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

import Fuse from "fuse.js";

const DESCRIPTION_LENGTH = 200;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  var updatedSelectedUNGoals = [];
  var updatedSelectedCountry;
  var updatedSelectedGrpSize;
  var updatedSelectedDifficulty;

  const handleUNGoals = selectedUNGoals => {
    updatedSelectedUNGoals = [];

    if (selectedUNGoals == undefined) {
      updatedSelectedUNGoals = null;
    } else {
      this.setState({ selectedUNGoals });
      updatedSelectedUNGoals = selectedUNGoals;
    }
  };

  const handleCountry = selectedCountry => {
    if (selectedCountry == undefined) {
      updatedSelectedCountry = null;
      return;
    }

    this.setState({ selectedCountry });
    updatedSelectedCountry = selectedCountry;
  };

  const handleGrpSize = selectedGrpSize => {
    if (selectedGrpSize == undefined) {
      updatedSelectedGrpSize = null;
      return;
    }

    this.setState({ selectedGrpSize });
    updatedSelectedGrpSize = selectedGrpSize;
  };

  const handleDifficulty = selectedDifficulty => {
    if (selectedDifficulty == undefined) {
      updatedSelectedDifficulty = null;
      return;
    }

    this.setState({ selectedDifficulty });
    updatedSelectedDifficulty = selectedDifficulty;
  };

  useEffect(() => {
    const populateProjects = async () => {
      var numProjects = 20;

      const models = await getModels();
      var filteredModels = [];

      var isMatchingSDG = false;
      var isMatchingCountry = false;
      var isMatchingGrpSize = false;
      var isMatchingDifficulty = false;

      for (var i = 0; i < models.length; i++) {
        for (var j = 0; j < updatedSelectedUNGoals.length; j++) {
          if (
            updatedSelectedUNGoals == null ||
            models[i].sdg == updatedSelectedUNGoals[j]
          ) {
            isMatchingSDG = true;
          }

          if (
            updatedSelectedCountry == null ||
            models[i].country == updatedSelectedCountry
          ) {
            isMatchingCountry = true;
          }

          if (
            updatedSelectedGrpSize == null ||
            models[i].groupSize == updatedSelectedGrpSize
          ) {
            isMatchingGrpSize = true;
          }

          if (
            updatedSelectedDifficulty == null ||
            models[i].difficulty == updatedSelectedDifficulty
          ) {
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
        console.log("no projects have these specific fields");
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
            onChange={handleUNGoals()}
            value={selectedUNGoals}
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
            isClearable
            onChange={handleCountry()}
            value={selectedCountry}
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            isClearable
            onChange={handleGrpSize()}
            value={selectedGrpSize}
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
            isClearable
            onChange={handleDifficulty()}
            value={selectedDifficulty}
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
