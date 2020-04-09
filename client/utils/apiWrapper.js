import axios from "axios";
import fetch from "isomorphic-unfetch";
import { getCookie } from "./cookie";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5000/api";
// const BASE_URL = process.env.BACKEND_URL ?? "http://52.240.158.249:5000/api"; // leave this in, this is Arpan's url

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

export const register = (emailInput, passwordInput, questionIdx, answer) => {
  try {
    return fetch(`${BASE_URL}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        questionIdx,
        securityQuestionAnswer: answer,
        role: "guest",
        answer
      })
    });
  } catch (err) {
    return err;
  }
};

export const login = (emailInput, passwordInput) => {
  try {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    });
  } catch (err) {
    return err;
  }
};

export const verify = () => {
  try {
    return fetch(`${BASE_URL}/auth/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getCookie("token") }
    });
  } catch (err) {
    return err;
  }
};

export const getSecurityQuestions = () => {
  try {
    return fetch(`${BASE_URL}/auth/getSecurityQuestions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      }
    });
  } catch (err) {
    return err;
  }
};

export const setSecurityQuestion = (questionIdx, answer, password) => {
  try {
    return fetch(`${BASE_URL}/auth/addSecurityQuestionAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        questionIdx,
        answer,
        password
      })
    });
  } catch (err) {
    return err;
  }
};

export const getSecurityQuestionForUser = email => {
  try {
    return fetch(`${BASE_URL}/auth/securityQuestionForUser`, {
      method: "POST",
      body: JSON.stringify({
        email
      }),
      headers: { email: email, "Content-Type": "application/json" }
    });
  } catch (err) {
    return err;
  }
};

export const submitSecurityQuestionAnswer = (email, answer, questionIdx) => {
  try {
    return fetch(`${BASE_URL}/auth/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        answer,
        questionIdx
      })
    });
  } catch (err) {
    return err;
  }
};

export const resetPassword = (pin, email, password, answer) => {
  try {
    return fetch(`${BASE_URL}/auth/passwordReset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin,
        email,
        password,
        answer
      })
    });
  } catch (err) {
    return err;
  }
};

export const changePassword = (currentPassword, newPassword) => {
  try {
    return fetch(`${BASE_URL}/auth/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
  } catch (err) {
    return err;
  }
};

export const getUsersForRolesPage = () => {
  try {
    return fetch(`${BASE_URL}/auth/roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google") ? true : false
      }
    });
  } catch (err) {
    return err;
  }
};

export const changeRole = (userEmail, newRole, password) => {
  try {
    return fetch(`${BASE_URL}/auth/roleschange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google") ? true : false
      },
      body: JSON.stringify({
        userEmail,
        newRole,
        password
      })
    });
  } catch (err) {
    return err;
  }
};

export const google = tokenId => {
  try {
    return fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: tokenId
      })
    });
  } catch (err) {
    return err;
  }
};

export const verifyPIN = pin => {
  try {
    return fetch(`${BASE_URL}/auth/verifyEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        pin
      })
    });
  } catch (err) {
    return err;
  }
};

export const resendPIN = () => {
  try {
    return fetch(`${BASE_URL}/auth/resendVerificationEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      }
    });
  } catch (err) {
    return err;
  }
};

export const userInfo = () => {
  try {
    return fetch(`${BASE_URL}/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google") ? true : false
      }
    });
  } catch (err) {
    return err;
  }
};

export const saveDescription = (
  model_id,
  phaseName,
  stageName,
  description
) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/${stageName}/description`;
  return axios
    .post(
      requestString,
      { description },
      {
        headers: {
          "Content-Type": "application/JSON"
        }
      }
    )
    .catch(error => ({
      type: "SAVE_DESCRIPTION_FAIL",
      error
    }));
};

export const getDescription = (model_id, phaseName, stageName) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/${stageName}/description`;
  return axios.get(requestString).catch(error => ({
    type: "GET_DESCRIPTION_FAIL",
    error
  }));
};

export const postUpvote = (model_id, userId) => {
  const requestString = `${BASE_URL}/upvotes`;
  return axios
    .post(
      requestString,
      { upvoteLocation: model_id, userId: userId },
      {
        headers: {
          "Content-Type": "application/JSON"
        }
      }
    )
    .catch(error => ({
      type: "SAVE_UPVOTE_FAIL",
      error
    }));
};

export const getUpvote = model_id => {
  const requestString = `${BASE_URL}/upvotes/${model_id}`;
  return axios.get(requestString).catch(error => ({
    type: "GET_UPVOTE_FAIL",
    error
  }));
};
