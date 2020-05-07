import axios from "axios";
import fetch from "isomorphic-unfetch";
import { checkValidUser } from "./validator";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5000/api";
// const BASE_URL = process.env.BACKEND_URL ?? "http://52.240.158.249:5000/api"; // leave this in, this is Arpan's url

export const getModels = (sdg_query, searchPage = null) => {
  /**
   * Returns all models
   * Returns GET_MODEL_FAIL upon failure
   */
  let requestString = ``;
  if (sdg_query) {
    requestString = `${BASE_URL}/models?sdg=${sdg_query}`;
  } else if (searchPage) {
    requestString = `${BASE_URL}/models?searchPage=true`;
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
export const getUpdates = async (numUpdates, currentIndex) => {
  /**
   * Returns min(available updates, numUpdates) projects with ID greater than last_id query
   * Returns GET_UPDATES_FAIL upon failure
   */
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/user/updates/${numUpdates}/${currentIndex}`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "GET_UPDATES_FAIL",
          error
        });
      });
  }
};
export const addModel = async data => {
  /**
   * Adds a model
   * Returns POST_MODEL_FAIL upon failure
   */
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models`;
    return axios
      .post(requestString, data, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "POST_MODEL_FAIL",
          error
        });
      });
  }
};

export const updateProject = (model_id, name, description, groupSize) => {
  const requestString = `${BASE_URL}/models/${model_id}`;
  return axios.post(
    requestString,
    { name, description, groupSize },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
};

export const addModelStage = (
  model_id,
  phaseName,
  stageName,
  startdate,
  enddate
) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/${stageName}`;
  return axios.post(
    requestString,
    { startdate, enddate },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
};

export const editModel = async (data, Model_ID) => {
  /**
   * Edits a model
   * Returns UPDATE_MODEL_FAIL upon failure
   */
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models/${Model_ID}`;
    return axios
      .put(requestString, data, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "UPDATE_MODEL_FAIL",
          error
        });
      });
  }
};
export const deleteForm = async Model_ID => {
  /**
   * Deletes a model
   * Returns DELETE_MODEL_FAIL upon failure
   */
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models/${Model_ID}`;
    return axios
      .delete(requestString, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "DELETE_MODEL_FAIL",
          error
        });
      });
  }
};

export const register = (
  emailInput,
  passwordInput,
  questionIdx,
  answer,
  role
) => {
  try {
    return fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        questionIdx,
        securityQuestionAnswer: answer,
        role
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
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      }
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
        token: localStorage.getItem("token")
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
        token: localStorage.getItem("token")
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
        token: localStorage.getItem("token")
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
        token: localStorage.getItem("token"),
        google: localStorage.getItem("google") ? true : false
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
        token: localStorage.getItem("token"),
        google: localStorage.getItem("google") ? true : false
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
        token: localStorage.getItem("token")
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
        token: localStorage.getItem("token")
      }
    });
  } catch (err) {
    return err;
  }
};

export const userInfo = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/auth/getUser`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON",
          token: localStorage.getItem("token"),
          google: localStorage.getItem("google") ? true : false
        }
      })
      .catch(error => {
        ({
          type: "GET_USER_FAIL",
          error
        });
      });
  }
};

export const canEdit = model_id => {
  const requestString = `${BASE_URL}/models/${model_id}/canEdit`;
  return axios.get(requestString, {
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  });
};

export const saveDescription = async (
  model_id,
  phaseName,
  stageName,
  description,
  subDescription
) => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/${stageName}/description`;
    console.log(requestString);
    return axios
      .put(
        requestString,
        { description, subDescription },
        {
          headers: {
            "Content-Type": "application/JSON",
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
      .catch(error => ({
        type: "SAVE_DESCRIPTION_FAIL",
        error
      }));
  }
};

export const getDescription = (model_id, phaseName, stageName) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/${stageName}/description`;
  return axios.get(requestString).catch(error => ({
    type: "GET_DESCRIPTION_FAIL",
    error
  }));
};

export const getUser = () => {
  try {
    return fetch(`${BASE_URL}/users/userInfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    });
  } catch (err) {
    return err;
  }
};

export const createUser = newUser => {
  try {
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
  } catch (err) {
    return err;
  }
};

export const updateUser = async updatedUser => {
  const validUser = await checkValidUser();
  if (validUser) {
    try {
      return (
        fetch(`${BASE_URL}/users/userInfo`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          },
          body: JSON.stringify(updatedUser)
        }
      );
    } catch (err) {
      return err;
    }
  }
};

export const deleteUser = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    try {
      return fetch(`${BASE_URL}/users/userInfo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      });
    } catch (err) {
      return err;
    }
  }
};

export const getFollowingProjects = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    try {
      return fetch(`${BASE_URL}/users/followingProjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      });
    } catch (err) {
      return err;
    }
  }
};

export const followProject = async projId => {
  const validUser = await checkValidUser();
  if (validUser) {
    try {
      return fetch(`${BASE_URL}/users/followingProjects`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ projId })
      });
    } catch (err) {
      return err;
    }
  }
};

export const unfollowProject = async projId => {
  const validUser = await checkValidUser();
  if (validUser) {
    try {
      return fetch(`${BASE_URL}/users/followingProjects`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ projId })
      });
    } catch (err) {
      return err;
    }
  }
};

export const postComment = async (model_id, commentBody) => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/comment`;
    return axios
      .post(
        requestString,
        {
          commentLocation: model_id,
          comment: commentBody
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
      .catch(error => ({
        type: "SAVE_COMMENT_FAIL",
        error
      }));
  }
};

export const postCommentThread = async (model_id, parentIndex, commentBody) => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/comment/thread`;
    return axios
      .post(
        requestString,
        {
          commentLocation: `${model_id}`,
          commentIndex: parentIndex,
          comment: commentBody
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
      .catch(error => ({
        type: "SAVE_COMMENT_FAIL",
        error
      }));
  }
};

export const getComments = model_id => {
  const requestString = `${BASE_URL}/comment/${model_id}`;
  return axios.get(requestString).catch(error => ({
    type: "GET_COMMENT_FAIL",
    error
  }));
};

export const getCommentCount = model_id => {
  const requestString = `${BASE_URL}/comment/${model_id}/count`;
  return axios.get(requestString).catch(error => ({
    type: "GET_COMMENT_FAIL",
    error
  }));
};

export const postUpvote = async model_id => {
  const validUser = await checkValidUser();
  if (!validUser) {
    return;
  }
  const requestString = `${BASE_URL}/upvote`;
  return axios
    .post(
      requestString,
      { upvoteLocation: model_id },
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
    .catch(error => ({
      type: "SAVE_UPVOTE_FAIL",
      error
    }));
};

export const getUpvotes = model_id => {
  const requestString = `${BASE_URL}/upvote/${model_id}`;
  return axios.get(requestString).catch(error => ({
    type: "GET_UPVOTE_FAIL",
    error
  }));
};

export const checkToken = () => {
  const requestString = `${BASE_URL}/auth/checkToken`;
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => error.response);
};

export const duplicateModel = model_id => {
  const requestString = `${BASE_URL}/duplicate/${model_id}`;
  return axios
    .post(requestString, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => ({
      type: "DUPLICATE_MODEL_FAIL",
      error
    }));
};
