import React, { useState, useEffect, useCallback } from 'react';
import debounce from "lodash/debounce";

import {
  Button,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';

import "../public/styles/phaseEdit.scss";

const capitalize = str =>
  str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default function PhaseDetailEdit(props) {
  const { detailName, updatePhaseDetail } = props;

  const [details, setDetails] = useState([]);
  const [saved, setSaved] = useState(true);

  const saveInterval = 1000;
  const debounceSave = (detail) => {
    updatePhaseDetail(detail);
    setSaved(true);
  };
  const saveCallback = useCallback(debounce(debounceSave, saveInterval), []);

  useEffect(() => {
    const { getPhaseDetail, detailName } = props;
    getPhaseDetail()
      .then(response => {
        const details = response.data[detailName];
        if (details !== undefined) {
          setDetails(details);
        }
      });
  }, [props]);

  const deepCopy = (original) => original.map(o => Object.assign({}, o));

  const handleChange = (update, index) => {
    let updated = deepCopy(details);
    updated[index] = {...updated[index], ...update};
    setDetails(updated);
    setSaved(false);
    saveCallback(updated);
  };

  const handleAdd = () => {
    let updated = deepCopy(details);
    updated.push({ name: "", description: "" });
    setDetails(updated);
    setSaved(false);
    saveCallback(updated);
  };

  const handleDelete = (index) => {
    let updated = deepCopy(details);
    updated.splice(index, 1);
    setDetails(updated);
    setSaved(false);
    saveCallback(updated);
  };

  const status = () => {
    if (saved) {
      return "Saved";
    }
    return "Saving...";
  };

  return (
    <Card className="phaseEdit">
      <CardBody>
        <div className="d-flex justify-content-between">
          <CardTitle>{capitalize(detailName)}</CardTitle>
          <div className="status">
            {status()}
          </div>
        </div>
        {details?.map((detail, index) => (
          <div className="edit-detail">
            <div className="d-flex justify-content-between">
              <input
                type="text"
                className="form-control"
                value={detail.name}
                onChange={ e => handleChange({ name: e.target.value }, index) }
              ></input>
              <Button
                color="danger"
                onClick={ () => handleDelete(index) }
              >
                Delete
              </Button>
            </div>
            <textarea
              className="form-control"
              rows="3"
              value={detail.description}
              onChange={ e => handleChange({ description: e.target.value }, index) }
            ></textarea>
            <br/>
          </div>
        ))}
        <Button
          color="primary"
          className="add-detail"
          onClick={() =>
            handleAdd(details)
          }
        >
          Add {capitalize(detailName)}
        </Button>
      </CardBody>
    </Card>
  );
}