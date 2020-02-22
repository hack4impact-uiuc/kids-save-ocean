import axios from "axios";

const BASE_URL = "https://localhost:5000";

export const getModels = () => {
  /**
   * Returns all models
   * Returns GET_MODEL_FAIL upon failure
   */
  const requestString = `${BASE_URL}models`;
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