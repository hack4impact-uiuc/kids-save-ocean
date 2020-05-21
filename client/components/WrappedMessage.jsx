import React, { useState, useCallback } from "react";

import { Alert } from "reactstrap";

import debounce from "lodash/debounce";

import "../public/styles/wrappedmessage.scss";

const WrappedMessage = WrappedComponent =>
  function ErrorComponent(props) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const disappearTime = 3000;
    const debounceDisappear = () => {
      setError(null);
      setSuccess(null);
    };
    const disappearCallback = useCallback(
      debounce(debounceDisappear, disappearTime),
      []
    );

    const setErrorMessage = message => {
      setSuccess(null);
      setError(message);
      disappearCallback();
    };

    const setSuccessMessage = message => {
      setError(null);
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
        {(success || error) && <br />}
        {error && (
          <Alert className="message" color="danger">
            <div justify="center" align="middle">
              {error}
            </div>
          </Alert>
        )}
        {success && (
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
