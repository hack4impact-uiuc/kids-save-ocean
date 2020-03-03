import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getModels = (sdg_query = null) => {
  /**
   * Returns all models
   * Returns GET_MODEL_FAIL upon failure
   */
  let requestString = ``;
  if (sdg_query) {
    requestString = `${BASE_URL}/models?sdg=${sdg_query}`;
  } else {
    requestString = `${BASE_URL}/models`;
  }
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      ({
        type: "GET_MODEL_FAIL",
        error
      });
    });
};
export const getModelsByID = Model_ID => {
  /**
   * Returns model given ID
   * Returns GET_MODEL_ID_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models/${Model_ID}`;
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      ({
        type: "GET_MODEL_ID_FAIL",
        error
      });
    });
};

export const addModel = data => {
  /**
   * Adds a model
   * Returns POST_MODEL_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models`;
  return axios
    .post(requestString, data, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      ({
        type: "POST_MODEL_FAIL",
        error
      });
    });
};
export const editModel = (data, Model_ID) => {
  /**
   * Edits a model
   * Returns UPDATE_MODEL_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models/${Model_ID}`;
  return axios
    .put(requestString, data, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      ({
        type: "UPDATE_MODEL_FAIL",
        error
      });
    });
};
export const deleteForm = Model_ID => {
  /**
   * Deletes a model
   * Returns DELETE_MODEL_FAIL upon failure
   */
  const requestString = `${BASE_URL}/models/${Model_ID}`;
  return axios
    .delete(requestString, {
      headers: {}
    })
    .catch(error => {
      ({
        type: "DELETE_MODEL_FAIL",
        error
      });
    });
};
