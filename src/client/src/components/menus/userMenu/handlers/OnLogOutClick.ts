import { msalInstance } from "../../../../index";

export const OnLogOutClick = () => {
  msalInstance.logoutRedirect();
};
