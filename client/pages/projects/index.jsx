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

  const getSearchBarText = () => {
    const text = document.getElementById("user-input").value;

    return text;
  };

  var showModal = () => {
    document.getElementById("pop-up-modal").modal("show");
  };

  const options = {
    keys: ["name", "description"]
  };

  const populateAllProjects = async () => {
    const allModels = await getModels();
    setProjects(allModels.data);
  };

  useEffect(() => {
    populateAllProjects();
  }, []);

  useEffect(() => {
    const populateDropDownFilteredProjects = async () => {
      dropdownFilteredModels = [];

      const models = projects;

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

        if (selectedUNGoals != null) {
          for (let i = 0; i < selectedUNGoals.length; i++) {
            sdgSelectedNums.push(parseInt(selectedUNGoals[i].value));
          }
        }

        for (var i = 0; i < models.length; i++) {
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

        return dropdownFilteredModels;
      }
    };

    const populateSearchFilteredProjects = async () => {
      searchFilteredModels = [];

      const models = projects;

      var textInput = getSearchBarText();

      if (textInput == null || textInput.length == 0) {
        return [];
      } else {
        let fuse = new Fuse(models, options);
        searchFilteredModels = fuse.search(textInput);

        return searchFilteredModels;
      }
    };

    const populateAllFilteredProjects = async () => {
      dropdownFilteredModels = await populateDropDownFilteredProjects();
      searchFilteredModels = await populateSearchFilteredProjects();

      if (
        getSearchBarText() == null &&
        selectedUNGoals == null &&
        selectedCountry == null &&
        selectedGrpSize == null &&
        selectedDifficulty == null
      ) {
        await populateAllProjects();
      } else if (
        dropdownFilteredModels.length == 0 &&
        searchFilteredModels.length == 0
      ) {
        await populateAllProjects();
        showModal();
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
        <div
          className="modal"
          class="modal fade"
          id="pop-up-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Alert!
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                No projects meet these categories / search. Please modify your
                search / filters.
              </div>
            </div>
          </div>
        </div>
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
