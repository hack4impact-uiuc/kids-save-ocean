import Router from "next/router"
import { checkToken } from "./apiWrapper";

export const checkValidUser = async () => {
    if (!localStorage.getItem("token")) {
        Router.replace("/login");
    } else {
        const resp = await checkToken();
        if (!resp.data.success) {
            Router.replace("/login");
        }
    }
}