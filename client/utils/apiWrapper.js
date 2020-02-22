import axios from "axios";

const BASE_URL = "https://localhost:5000";

export const getModels = () => {
  /**
   * Returns all models
   * Returns GET_MODEL_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models`;
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      return {
        type: "GET_MODEL_FAIL",
        error
      };
    });
};
// data type JSON
export const addModel = (data) => {
  /**
   * Adds a form
   * Returns POST_FORM_DATA_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models`;
  return axios
    .post(
      requestString,
      data,
      {
        headers: {
          'Content-Type': 'application/JSON',
        },
      },
    )
    .catch(error => {
      return {
        type: 'POST_MODEL_FAIL',
        error,
      };
    });
};
export const editModel = (data) => {
  /**
   * Edits a form
   * Returns PUT_FORM_DATA_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models/${Model_ID}`;
  return axios
    .put(
      requestString,
      data,
      {
        headers: {
          'Content-Type': 'application/JSON',
        },
      },
    )
    .catch(error => {
      return {
        type: 'UPDATE_MODEL_FAIL',
        error,
      };
    });
};
export const deleteForm = Model_ID => {
  /**
   * Deletes a form
   * Returns POST_FORM_DATA_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models/${Model_ID}`;
  return axios
    .delete(requestString, {
      headers: {
      },
    })
    .catch(error => {
      return {
        type: 'DELETE_MODEL_FAIL',
        error,
      };
    });
};
