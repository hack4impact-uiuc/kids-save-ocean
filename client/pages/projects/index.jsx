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
  CardImg,
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

  const [selectedUNGoals, setSelectedUNGoals] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGrpSize, setSelectedGrpSize] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [userInput, setUserInput] = useState(null);

  var dropdownFilteredModels = [];
  var searchFilteredModels = [];

  const handleUNGoals = selectedUNGoals => {
    if (selectedUNGoals) {
      setSelectedUNGoals(selectedUNGoals);
    }
  };

  const handleCountry = selectedCountry => {
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  };

  const handleGrpSize = selectedGrpSize => {
    if (selectedGrpSize) {
      setSelectedGrpSize(selectedGrpSize);
    }
  };

  const handleDifficulty = selectedDifficulty => {
    if (selectedDifficulty) {
      setSelectedDifficulty(selectedDifficulty);
    }
  };

  const handleSearchChange = userInput => {
    if (userInput) {
      setUserInput(userInput.target.value);
    }
  };

  var getSearchBarText = async () => {
    var text = await document.getElementById("user-input").value;

    return text;
  };

  const options = {
    keys: ["name", "description"]
  };

  const populateAllProjects = async () => {
    const numberOfProjects = 20;

    const allModels = await getModels();
    setProjects(allModels.data.slice(numberOfProjects));
  };

  useEffect(() => {
    populateAllProjects();
  }, []);

  useEffect(() => {
    const populateDropDownFilteredProjects = async () => {
      dropdownFilteredModels = [];

      const models = await getModels();

      var isMatchingSDG = false;
      var isMatchingCountry = false;
      var isMatchingGrpSize = false;
      var isMatchingDifficulty = false;

      if (
        selectedUNGoals == null &&
        selectedCountry == null &&
        selectedGrpSize == null &&
        selectedDifficulty == null
      ) {
        return 0;
      } else {
        for (var i = 0; i < models.length; i++) {
          for (var j = 0; j < selectedUNGoals.length; j++) {
            if (
              selectedUNGoals == null ||
              models[i].sdg.value == selectedUNGoals[j].value
            ) {
              isMatchingSDG = true;
            }

            if (
              selectedCountry == null ||
              models[i].country.value == selectedCountry.value
            ) {
              isMatchingCountry = true;
            }

            if (
              selectedGrpSize == null ||
              models[i].groupSize.value == selectedGrpSize.value
            ) {
              isMatchingGrpSize = true;
            }

            if (
              selectedDifficulty == null ||
              models[i].difficulty.value == selectedDifficulty.value
            ) {
              isMatchingDifficulty = true;
            }

            if (
              isMatchingSDG &&
              isMatchingCountry &&
              isMatchingGrpSize &&
              isMatchingDifficulty
            ) {
              dropdownFilteredModels.push(models[i]);
            }

            isMatchingSDG = false;
            isMatchingCountry = false;
            isMatchingGrpSize = false;
            isMatchingDifficulty = false;
          }
        }

        return 1;
      }
    };

    const populateSearchFilteredProjects = async () => {
      searchFilteredModels = [];

      const models = await getModels();

      var textInput = getSearchBarText();

      if (textInput == null || textInput.length == 0) {
        return 0;
      } else {
        let fuse = new Fuse(models.data, options);
        searchFilteredModels = fuse.search(textInput);
      }

      return 1;
    };

    const populateAllFilteredProjects = async () => {
      var filteredModels = [];

      const numProjects = 20;
      var numberOfProjects = numProjects;

      populateDropDownFilteredProjects();
      populateSearchFilteredProjects();

      var dropdownFilteredModels = populateDropDownFilteredProjects;
      var searchFilteredModels = populateSearchFilteredProjects;

      if (
        populateDropDownFilteredProjects() == 0 &&
        populateSearchFilteredProjects() == 0
      ) {
        populateAllProjects();
      } else if (
        dropdownFilteredModels.length == 0 &&
        searchFilteredModels.length == 0
      ) {
        console.log("No projects meet these categories / search.");
      } else if (populateSearchFilteredProjects() == 0) {
        filteredModels = dropdownFilteredModels;

        if (filteredModels.length < numProjects) {
          numberOfProjects = filteredModels.length;
        }

        setProjects(filteredModels.data.slice(numberOfProjects));
      } else if (populateDropDownFilteredProjects() == 0) {
        filteredModels = searchFilteredModels;

        if (filteredModels.length < numProjects) {
          numberOfProjects = filteredModels.length;
        }

        setProjects(filteredModels.data.slice(numberOfProjects));
      } else {
        for (var i = 0; i < dropdownFilteredModels.length; i++) {
          for (var j = 0; j < searchFilteredModels.length; j++) {
            if (
              dropdownFilteredModels[i].value == searchFilteredModels[j].value
            ) {
              filteredModels.push(searchFilteredModels[j]);
            }
          }
        }

        if (filteredModels.length < numProjects) {
          numberOfProjects = filteredModels.length;
        }

        setProjects(filteredModels.data.slice(numberOfProjects));
      }
    };

    populateAllFilteredProjects();
  }, [
    selectedUNGoals,
    selectedCountry,
    selectedGrpSize,
    selectedDifficulty,
    userInput
  ]);

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
            onChange={handleSearchChange}
            value={userInput}
          />
        </div>
        <div className="dropdowns">
          <Select
            isMulti
            className="un-goals-list"
            options={UNGoalData}
            placeholder="Select UN Goals"
            onChange={handleUNGoals}
            value={selectedUNGoals}
          />
          <Select
            className="country-list"
            options={countryData}
            placeholder="Search country"
            isClearable
            onChange={handleCountry}
            value={selectedCountry}
          />
          <Select
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            isClearable
            onChange={handleGrpSize}
            value={selectedGrpSize}
          />
          <Select
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
            isClearable
            onChange={handleDifficulty}
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
                          <CardImg
                            className="project-card-img"
                            top
                            width="100%"
                            alt="Project img"
                          ></CardImg>
                          <CardText width="100%" height="100%">
                            <div className="project-card-name">
                              {project.name}
                            </div>
                            <br />
                            <div className="project-card-descrip">
                              {`${project.description.slice(
                                0,
                                DESCRIPTION_LENGTH
                              )}${project.description.length >
                                DESCRIPTION_LENGTH && "..."}`}
                            </div>
                            <br />
                            <div className="project-likes">Likes: </div>
                            <div className="project-comments">Comments: </div>
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
