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
  Alert
} from "reactstrap";

import "../../public/styles/projects.scss";
import "../../../api/public/schema/projectSchema";

import Fuse from "fuse.js";

const DESCRIPTION_LENGTH = 150;

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState(null);
  const [projects, setProjects] = useState(null);
  const [visAlert, setAlert] = useState(false);
  const [selectedUNGoals, setSelectedUNGoals] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGrpSize, setSelectedGrpSize] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [userInput, setUserInput] = useState("");

  let dropdownFilteredModels = [];
  let searchFilteredModels = [];

  const handleUNGoals = selectedUNGoals => {
    setSelectedUNGoals(selectedUNGoals);
  };

  const handleCountry = selectedCountry => {
    setSelectedCountry(selectedCountry);
  };

  const handleGrpSize = selectedGrpSize => {
    setSelectedGrpSize(selectedGrpSize);
  };

  const handleDifficulty = selectedDifficulty => {
    setSelectedDifficulty(selectedDifficulty);
  };

  const handleSearchChange = userInput => {
    setUserInput(userInput.target.value);
  };

  const getSearchBarText = () => {
    const text = document.getElementById("user-input").value;

    return text;
  };

  const options = {
    keys: ["name", "description"]
  };

  const populateAllProjects = async () => {
    const response = await getModels();
    setAllProjects(response.data);
    setProjects(response.data);
  };

  useEffect(() => {
    populateAllProjects();
  }, []);

  useEffect(() => {
    const populateDropDownFilteredProjects = () => {
      dropdownFilteredModels = [];

      const models = allProjects;

      let isMatchingSDGs = false;
      let isMatchingCountry = false;
      let isMatchingGrpSize = false;
      let isMatchingDifficulty = false;

      if (
        selectedUNGoals == null &&
        selectedCountry == null &&
        selectedGrpSize == null &&
        selectedDifficulty == null
      ) {
        return [];
      } else {
        let sdgSelectedNums = [];

        if (selectedUNGoals != null) {
          for (let i = 0; i < selectedUNGoals.length; i++) {
            sdgSelectedNums.push(parseInt(selectedUNGoals[i].value));
          }
        }

        for (let i = 0; i < models.length; i++) {
          if (selectedUNGoals == null) {
            isMatchingSDGs = true;
          } else if (
            selectedUNGoals != null &&
            selectedUNGoals.length <= models[i].sdg.length
          ) {
            const matches = models[i].sdg.filter(sdg =>
              sdgSelectedNums.includes(sdg)
            );

            isMatchingSDGs = matches.length === sdgSelectedNums.length;
          }

          if (
            selectedCountry == null ||
            models[i].country == selectedCountry.label
          ) {
            isMatchingCountry = true;
          }

          if (
            selectedGrpSize == null ||
            models[i].groupSize == selectedGrpSize.label
          ) {
            isMatchingGrpSize = true;
          }

          if (
            selectedDifficulty == null ||
            models[i].difficulty == selectedDifficulty.label.toLowerCase()
          ) {
            isMatchingDifficulty = true;
          }

          if (
            isMatchingSDGs &&
            isMatchingCountry &&
            isMatchingGrpSize &&
            isMatchingDifficulty
          ) {
            dropdownFilteredModels.push(models[i]);
          }

          isMatchingSDGs = false;
          isMatchingCountry = false;
          isMatchingGrpSize = false;
          isMatchingDifficulty = false;
        }

        if (dropdownFilteredModels.length === 0) {
          setAlert(true);
        }
        return dropdownFilteredModels;
      }
    };

    const populateSearchFilteredProjects = () => {
      searchFilteredModels = [];

      let textInput = getSearchBarText();

      if (textInput == null || textInput.length == 0) {
        return [];
      } else {
        let fuse = new Fuse(allProjects, options);
        searchFilteredModels = fuse.search(textInput);

        if (searchFilteredModels.length === 0) {
          setAlert(true);
        }

        return searchFilteredModels;
      }
    };

    const populateAllFilteredProjects = () => {
      dropdownFilteredModels = populateDropDownFilteredProjects();
      searchFilteredModels = populateSearchFilteredProjects();

      console.log(dropdownFilteredModels.length);
      console.log(searchFilteredModels.length);
      let tempArr = [];
      if (
        dropdownFilteredModels.length != 0 &&
        searchFilteredModels.length == 0
      ) {
        for (let i = 0; i < dropdownFilteredModels.length; i++) {
          tempArr.push(dropdownFilteredModels[i]);
        }
        setAlert(false);
        setProjects(tempArr);
      } else if (
        searchFilteredModels.length != 0 &&
        dropdownFilteredModels.length == 0
      ) {
        for (let i = 0; i < searchFilteredModels.length; i++) {
          tempArr.push(searchFilteredModels[i].item);
        }
        setAlert(false);
        setProjects(tempArr);
      } else {
        for (let i = 0; i < dropdownFilteredModels.length; i++) {
          for (let j = 0; j < searchFilteredModels.length; j++) {
            if (dropdownFilteredModels[i] == searchFilteredModels[j].item) {
              tempArr.push(searchFilteredModels[j].item);
            }
          }
        }
        setAlert(false);
        setProjects(tempArr);
      }
    };

    populateAllFilteredProjects();
  }, [
    selectedUNGoals,
    selectedCountry,
    selectedGrpSize,
    selectedDifficulty,
    userInput,
    visAlert
  ]);

  return (
    <>
      <Head title="Project Explorer" />
      <Container>
        {visAlert && (
          <Alert color="danger">
            <div justify="center" align="middle">
              No projects matching search
            </div>
          </Alert>
        )}

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
            isMulti
            className="country-list"
            options={countryData}
            placeholder="Search country"
            onChange={handleCountry}
            value={selectedCountry}
          />
          <Select
            isMulti
            className="grp-sizes-list"
            options={groupSizeData}
            placeholder="Select group size"
            onChange={handleGrpSize}
            value={selectedGrpSize}
          />
          <Select
            isMulti
            className="difficulty-list"
            options={levelData}
            placeholder="Select difficulty"
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
