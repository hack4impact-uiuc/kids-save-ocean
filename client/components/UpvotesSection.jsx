import React, { useState, useEffect, useCallback } from "react";

import { Row } from "reactstrap";

import { postUpvote, getUpvotes } from "../utils/apiWrapper";
import "../public/styles/upvotes.scss";

export default function UpvotesSection(props) {
  const { projectId } = props;
  const [upvotes, setUpvotes] = useState(0);
  const [error, setError] = useState(false);

  useEffect(fetchUpvotes, [fetchUpvotes]);

  const fetchUpvotes = useCallback(() => {
    getUpvotes(projectId).then((response) => {
      try {
        const { upvotes } = response.data;
        setUpvotes(upvotes);
      } catch {
        setError(true);
      }
    });
  }, [projectId]);

  const upvote = () => {
    postUpvote(projectId).then(fetchUpvotes);
  };

  const errorMessage = (
    <p>
      An error was encountered - please contact Hack4Impact UIUC with details.
    </p>
  );

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
          {error ? errorMessage : upvotes}
        </span>
      ) : (
        <span className="disabled">
          <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
          {error ? errorMessage : upvotes}
        </span>
      )}
    </Row>
  );
}
