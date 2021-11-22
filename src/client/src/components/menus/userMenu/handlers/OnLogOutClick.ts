import { msalInstance } from "../../../../index";

const OnLogOutClick = () => {
  msalInstance.logoutRedirect();
};

export default OnLogOutClick;
