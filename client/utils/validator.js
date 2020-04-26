import Router from "next/router";
import { checkToken } from "./apiWrapper";

export const checkValidUser = async (redir = true) => {
  if (!localStorage.getItem("token")) {
    if (redir) {
      Router.replace("/login");
    }
    return false;
  }
  const resp = await checkToken();
  if (!resp.data.success) {
    localStorage.removeItem("token");
    if (redir) {
      Router.replace("/login");
    }
    return false;
  }
  return true;
};
