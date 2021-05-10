import {
  SaveIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
} from "../../../../assets/icons";

const GetIcon = (type: string) => {
  switch (type) {
    case "Save":
      return <img src={SaveIcon} alt="save-icon" />;
    case "Open":
      return <img src={OpenProjectIconSmall} alt="open-icon" />;
    case "Create":
      return <img src={CreateProjectIcon} alt="open-icon" />;
    default:
      return null;
  }
};

export default GetIcon;
