import React, { useState, useCallback } from "react";

import { Alert } from "reactstrap";

import debounce from "lodash/debounce";

import "../public/styles/wrappedmessage.scss";

const WrappedMessage = WrappedComponent =>
  function ErrorComponent(props) {
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    const disappearTime = 3000;
    const debounceDisappear = () => {
      setError(undefined);
      setSuccess(undefined);
    };
    const disappearCallback = useCallback(
      debounce(debounceDisappear, disappearTime),
      []
    );

    const setErrorMessage = message => {
      setSuccess(undefined);
      setError(message);
      disappearCallback();
    };

    const setSuccessMessage = message => {
      setError(undefined);
      setSuccess(message);
      disappearCallback();
    };

    return (
      <>
        <WrappedComponent
          {...props}
          setError={msg => setErrorMessage(msg)}
          setSuccess={msg => setSuccessMessage(msg)}
        />
        <br />
        {error !== undefined && (
          <Alert className="message" color="danger">
            <div justify="center" align="middle">
              {error}
            </div>
          </Alert>
        )}
        {success !== undefined && (
          <Alert className="message" color="success">
            <div justify="center" align="middle">
              {success}
            </div>
          </Alert>
        )}
      </>
    );
  };

export default WrappedMessage;
