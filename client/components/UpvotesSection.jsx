import React, { useState, useEffect, useCallback } from "react";

import { Row, Button } from "reactstrap";

import { postUpvote, getUpvotes } from "../utils/apiWrapper";

export default function UpvotesSection(props) {
  const { projectId } = props;
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    fetchUpvotes();
  }, [fetchUpvotes]);

  const fetchUpvotes = useCallback(() => {
    getUpvotes(projectId).then(response => {
      const { upvotes } = response.data;
      setUpvotes(upvotes);
    });
  }, [projectId]);

  const upvote = () => {
    postUpvote(projectId).then(() => {
      fetchUpvotes();
    });
  };

  return (
    <Row className="justify-content-start">
      <p>{`Upvotes: ${upvotes}`}</p>
      <Button onClick={upvote}>Upvote</Button>
    </Row>
  );
}
