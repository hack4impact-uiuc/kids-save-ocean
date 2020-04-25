import Router from "next/router";
import { checkToken } from "./apiWrapper";

export const checkValidUser = async () => {
  if (!localStorage.getItem("token")) {
    Router.replace("/login");
    return false;
  } else {
    const resp = await checkToken();
    if (!resp.data.success) {
      localStorage.removeItem("token");
      Router.replace("/login");
      return false;
    }
  }
  return true;
};
