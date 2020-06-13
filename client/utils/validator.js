import Router from "next/router";
import { checkToken, getUser } from "./apiWrapper";

const UNAUTHORIZED = 403;

export const checkValidUser = async (redir = true) => {
  if (!localStorage.getItem("token")) {
    if (redir) {
      Router.replace("/login");
    }
    return false;
  }
  const resp = await checkToken();
  if (resp.status === UNAUTHORIZED) {
    localStorage.removeItem("token");
    if (redir) {
      Router.replace("/login");
    }
    return false;
  }
  return true;
};

export const checkIsAdmin = async () => {
  if (!localStorage.getItem("token")) {
    return false;
  }

  const userResp = await getUser();
  return userResp.data.user.admin;
};
