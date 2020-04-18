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

const DESCRIPTION_LENGTH = 150;

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  const [selectedUNGoals, setSelectedUNGoals] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGrpSize, setSelectedGrpSize] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [userInput, setUserInput] = useState("");

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

  var getSearchBarText = () => {
    var text = document.getElementById("user-input").value;

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

      var isMatchingSDGs = false;
      var isMatchingCountry = false;
      var isMatchingGrpSize = false;
      var isMatchingDifficulty = false;

      if (
        selectedUNGoals == null &&
        selectedCountry == null &&
        selectedGrpSize == null &&
        selectedDifficulty == null
      ) {
        return [];
      } else {
        let sdgSelectedNums = [];
        for (let i = 0; i < selectedUNGoals.length; i++) {
          sdgSelectedNums.push(parseInt(selectedUNGoals[i].value));
        }
        console.log(sdgSelectedNums);
        for (var i = 0; i < models.data.length; i++) {
          if (selectedUNGoals.length <= models.data[i].sdg.length) {
            console.log(models.data[i].sdg);
            const matches = models.data[i].sdg.filter(sdg => sdgSelectedNums.includes(sdg));
            console.log(matches);
            
            isMatchingSDGs = matches.length === sdgSelectedNums.length;
            console.log(isMatchingSDGs);
          }

          if (
            selectedCountry == null ||
            models.data[i].country == selectedCountry.label
          ) {
            isMatchingCountry = true;
          }

          if (
            selectedGrpSize == null ||
            models.data[i].groupSize == selectedGrpSize.label
          ) {
            isMatchingGrpSize = true;
          }

          if (
            selectedDifficulty == null ||
            models.data[i].difficulty == selectedDifficulty.label.toLowerCase()
          ) {
            isMatchingDifficulty = true;
          }

          if (
            isMatchingSDGs &&
            isMatchingCountry &&
            isMatchingGrpSize &&
            isMatchingDifficulty
          ) {
            dropdownFilteredModels.push(models.data[i]);
          }

          isMatchingSDGs = false;
          isMatchingCountry = false;
          isMatchingGrpSize = false;
          isMatchingDifficulty = false;
        }

        console.log(models.data[1]); // line 160 should be good
        console.log(dropdownFilteredModels.length); // empty

        return dropdownFilteredModels;
      }
    };

    const populateSearchFilteredProjects = async () => {
      searchFilteredModels = [];

      const models = await getModels();

      var textInput = getSearchBarText();

      if (textInput == null || textInput.length == 0) {
        return [];
      } else {
        let fuse = new Fuse(models.data, options);
        searchFilteredModels = fuse.search(textInput);

        return searchFilteredModels;
      }
    };

    const populateAllFilteredProjects = async () => {
      dropdownFilteredModels = await populateDropDownFilteredProjects();
      searchFilteredModels = await populateSearchFilteredProjects();

      if (
        dropdownFilteredModels.length == 0 &&
        searchFilteredModels.length == 0
      ) {
        console.log("No projects meet these categories / search.");
        await populateAllProjects();
      } else if (dropdownFilteredModels.length != 0) {
        let tempArr = [];

        for (var i = 0; i < dropdownFilteredModels.length; i++) {
          tempArr.push(dropdownFilteredModels[i]);
        }

        setProjects(tempArr);
      } else if (searchFilteredModels.length != 0) {
        let tempArr = [];

        for (var i = 0; i < searchFilteredModels.length; i++) {
          tempArr.push(searchFilteredModels[i].item);
        }

        setProjects(tempArr);
      } else {
        let tempArr = [];

        for (var i = 0; i < dropdownFilteredModels.length; i++) {
          for (var j = 0; j < searchFilteredModels.length; j++) {
            if (dropdownFilteredModels[i] == searchFilteredModels[j]) {
              tempArr.push(searchFilteredModels[j].item);
            }
          }
        }

        setProjects(tempArr);
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
                            alt="Project image"
                          ></CardImg>
                          <CardText width="100%" height="100%">
                            <div className="project-card-name">
                              {project.name}
                            </div>
                            <br />
                            <div className="project-card-description">
                              {`${project.description.slice(
                                0,
                                DESCRIPTION_LENGTH
                              )}${project.description.length >
                                DESCRIPTION_LENGTH && "..."}`}
                            </div>
                            <br />
                            <Row>
                              <Col>
                                <div className="prof-pic"></div>
                              </Col>
                              <Col>
                                <div className="username"></div>
                              </Col>
                              <Col>
                                <div className="project-likes">Likes: </div>
                              </Col>
                              <Col>
                                <div className="project-comments">
                                  Comments:
                                </div>
                              </Col>
                            </Row>
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
