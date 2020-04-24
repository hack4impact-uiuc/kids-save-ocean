import React, { useState, useCallback } from 'react';

import { Alert } from 'reactstrap';

import debounce from "lodash/debounce";

const WrappedError = WrappedComponent => {
  return function ErrorComponent(props) {
    const [error, setError] = useState(undefined);

    const disappearTime = 3000;
    const debounceDisappear = () => setError(undefined);
    const disappearCallback = useCallback(debounce(debounceDisappear, disappearTime), []);

    const setMessage = message => {
      console.log(message);
      setError(message);
      disappearCallback();
    };

    return (
      <>
        <WrappedComponent
          {...props}
          setError={msg => setMessage(msg)}
        />
        <br/>
        {error !== undefined &&
          <Alert color="danger">
            <div justify="center" align="middle">
              {error}
            </div>
          </Alert>
        }
      </>
    );
  }
}

export default WrappedError;