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

export const getFollowingProjects = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models/userFollowingModels`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "GET_MODEL_ID_FAIL",
          error
        });
      });
  }
};

export const getCreatedProjects = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/models/userCreatedModels`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "GET_MODEL_ID_FAIL",
          error
        });
      });
  }
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
  enddate,
  description
) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/stages/${stageName}`;
  return axios.post(
    requestString,
    { startdate, enddate, description },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
};

export const getPhaseStakeholder = (model_id, phaseName) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/stakeholders`;
  return axios.get(requestString);
};

export const updatePhaseStakeholder = (model_id, phaseName, stakeholders) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/stakeholders`;
  return axios.post(
    requestString,
    { stakeholders },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
};

export const getPhaseChallenges = (model_id, phaseName) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/challenges`;
  return axios.get(requestString);
};

export const updatePhaseChallenges = (model_id, phaseName, challenges) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/challenges`;
  return axios.post(
    requestString,
    { challenges },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
};

export const getPhaseInsights = (model_id, phaseName) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/insights`;
  return axios.get(requestString);
};

export const updatePhaseInsights = (model_id, phaseName, insights) => {
  const requestString = `${BASE_URL}/models/${model_id}/${phaseName}/insights`;
  return axios.post(
    requestString,
    { insights },
    {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    }
  );
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

export const getUser = async () => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/users/userInfo`;
    try {
      return axios
        .get(requestString, {
          headers: {
            "Content-Type": "application/JSON",
            "x-access-token": localStorage.getItem("token")
          }
        })
        .catch(error => ({
          type: "SAVE_DESCRIPTION_FAIL",
          error
        }));
    } catch (err) {
      return err;
    }
  }
};

export const createUser = async newUser => {
  const validUser = await checkValidUser();
  if (validUser) {
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
  }
};

export const updateUser = async data => {
  const validUser = await checkValidUser();
  if (validUser) {
    const requestString = `${BASE_URL}/users/userInfo`;
    return axios
      .put(requestString, data, {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      })
      .catch(error => {
        ({
          type: "UPDATE_USER_FAIL",
          error
        });
      });
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

export const getFollowingProjectsIds = async () => {
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

export const addTemplate = data => {
  /**
   * Adds a template
   * Returns POST_TEMPLATE_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates`;
  return axios
    .post(requestString, data, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => {
      ({
        type: "POST_TEMPLATE_FAIL",
        error
      });
    });
};

export const deleteTemplate = templateID => {
  /**
   * Deletes a template
   * Returns DELETE_TEMPLATE_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${templateID}`;
  return axios
    .delete(requestString, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => {
      ({
        type: "DELETE_TEMPLATE_FAIL",
        error
      });
    });
};

export const getTemplates = () => {
  /**
   * Returns all templates
   * Returns GET_TEMPLATE_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates`;
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })
    .catch(error => {
      ({
        type: "GET_TEMPLATE_FAIL",
        error
      });
    });
};

export const getTemplateByID = templateID => {
  /**
   * Returns template given ID
   * Returns GET_TEMPLATE_ID_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${templateID}`;
  return axios
    .get(requestString, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => {
      ({
        type: "GET_TEMPLATE_ID_FAIL",
        error
      });
    });
};

export const saveTemplate = (data, Template_ID) => {
  /**
   * Edits a template
   * Returns UPDATE_TEMPLATE_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${Template_ID}`;
  return axios
    .put(requestString, data, {
      headers: {
        "Content-Type": "application/JSON",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .catch(error => {
      ({
        type: "UPDATE_TEMPLATE_FAIL",
        error
      });
    });
};

export const saveTemplateDraft = (Template_ID, draft) => {
  /**
   * Edits a template's draft
   * Returns UPDATE_TEMPLATE_DRAFT_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${Template_ID}/draft`;
  return axios
    .put(
      requestString,
      { draft },
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )

    .catch(error => {
      ({
        type: "SAVE_TEMPLATE_DRAFT_FAIL",
        error
      });
    });
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
  if (validUser) {
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
  }
};

export const saveTemplateName = (name, Template_ID) => {
  /**
   * Edits a template's name
   * Returns UPDATE_TEMPLATE_NAME_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${Template_ID}/name`;
  return axios
    .put(
      requestString,
      { name },
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
    .catch(error => {
      ({
        type: "UPDATE_TEMPLATE_NAME_FAIL",
        error
      });
    });
};

export const saveTemplatePhases = (phases, Template_ID) => {
  /**
   * Edits a template's phases
   * Returns UPDATE_TEMPLATE_PHASES_FAIL upon failure
   */
  const requestString = `${BASE_URL}/templates/${Template_ID}/phases`;
  return axios
    .put(
      requestString,
      { phases },
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
    .catch(error => {
      ({
        type: "UPDATE_TEMPLATE_PHASES_FAIL",
        error
      });
    });
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
    .post(
      requestString,
      {},
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
    .catch(error => ({
      type: "DUPLICATE_MODEL_FAIL",
      error
    }));
};

export const updateLastCheckedNotifDate = async () => {
  const validUser = await checkValidUser();
  if (!validUser) {
    return;
  }
  const requestString = `${BASE_URL}/users/userInfo/notifs`;
  return axios
    .put(
      requestString,
      { lastCheckedNotifs: Date.now() },
      {
        headers: {
          "Content-Type": "application/JSON",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
    .catch(error => ({
      type: "NOTIF_UPDATE_FAIL",
      error
    }));
};
