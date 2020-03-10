import axios from "axios";
import fetch from "isomorphic-unfetch";

import { getCookie } from "./cookie";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "http://52.240.158.249:5000"; // leave this in, this is Arpan's url

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
    return fetch(`http://localhost:3000/register/`, {
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
    console.log(err.message);
  }
};

export const login = (emailInput, passwordInput) => {
  try {
    return fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    });
  } catch (err) {
    console.log(err);
  }
};

export const verify = () => {
  try {
    return fetch(`http://localhost:3000/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getCookie("token") }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSecurityQuestions = () => {
  try {
    return fetch("http://localhost:3000/getSecurityQuestions", {
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
    return fetch(`http://localhost:3000/addSecurityQuestionAnswer`, {
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
    console.log(err);
  }
};

export const getSecurityQuestionForUser = email => {
  try {
    return fetch(`http://localhost:3000/getSecurityQuestionForUser`, {
      method: "POST",
      body: JSON.stringify({
        email
      }),
      headers: { email: email, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.log(err);
  }
};

export const submitSecurityQuestionAnswer = (email, answer, questionIdx) => {
  try {
    return fetch(`http://localhost:3000/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        answer,
        questionIdx
      })
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (pin, email, password, answer) => {
  try {
    return fetch(`http://localhost:3000/passwordReset`, {
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
    console.log(err);
  }
};

export const changePassword = (currentPassword, newPassword) => {
  try {
    return fetch(`http://localhost:3000/changePassword`, {
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
    console.log(err);
  }
};

export const getUsersForRolesPage = () => {
  try {
    return fetch(`http://localhost:3000/roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google") ? true : false
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeRole = (userEmail, newRole, password) => {
  try {
    return fetch(`http://localhost:3000/roleschange`, {
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
    console.log(err);
  }
};

export const google = tokenId => {
  try {
    return fetch(`http://localhost:3000/google`, {
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
    console.log(err);
  }
};

export const verifyPIN = pin => {
  try {
    return fetch(`http://localhost:3000/verifyEmail`, {
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
    console.log(err);
  }
};

export const resendPIN = () => {
  try {
    return fetch(`http://localhost:3000/resendVerificationEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const userInfo = () => {
  try {
    return fetch(`http://localhost:3000/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google") ? true : false
      }
    });
  } catch (err) {
    console.log(err);
  }
};
