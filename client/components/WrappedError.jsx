import React, { useState, useCallback } from "react";

import { Alert } from "reactstrap";

import debounce from "lodash/debounce";

import "../public/styles/error.scss";

const WrappedError = WrappedComponent =>
  function ErrorComponent(props) {
    const [error, setError] = useState(undefined);

    const disappearTime = 3000;
    const debounceDisappear = () => setError(undefined);
    const disappearCallback = useCallback(
      debounce(debounceDisappear, disappearTime),
      []
    );

    const setMessage = message => {
      setError(message);
      disappearCallback();
    };

    return (
      <>
        <WrappedComponent {...props} setError={msg => setMessage(msg)} />
        <br />
        {error !== undefined && (
          <Alert className="error" color="danger">
            <div justify="center" align="middle">
              {error}
            </div>
          </Alert>
        )}
      </>
    );
  };

export default WrappedError;
