import React, { useState, useEffect, useCallback } from "react";

import { Row } from "reactstrap";

import { postUpvote, getUpvotes } from "../utils/apiWrapper";
import "../public/styles/upvotes.scss";

export default function UpvotesSection(props) {
  const { projectId } = props;
  const [upvotes, setUpvotes] = useState(0);

  useEffect(fetchUpvotes, [fetchUpvotes]);

  const fetchUpvotes = useCallback(() => {
    getUpvotes(projectId).then((response) => {
      const { upvotes } = response.data;
      setUpvotes(upvotes);
    });
  }, [projectId]);

  const upvote = () => {
    postUpvote(projectId).then(fetchUpvotes);
  };

  return (
    <Row className="justify-content-start">
      {localStorage.getItem("token") ? (
        <span>
          <i
            className="fa fa-thumbs-o-up fa-2x"
            aria-hidden="true"
            type="button"
            onClick={upvote}
          ></i>
          {upvotes}
        </span>
      ) : (
        <span className="disabled">
          <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
          {upvotes}
        </span>
      )}
    </Row>
  );
}
