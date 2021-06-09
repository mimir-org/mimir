import {
  SaveIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
} from "../../../../assets/icons/common";

const GetIcon = (type: string) => {
  switch (type) {
    case "Save":
      return <img src={SaveIcon} alt="save" />;
    case "SaveFile":
      return <img src={SaveIcon} alt="save file" />;
    case "Open":
      return <img src={OpenProjectIconSmall} alt="open" />;
    case "Create":
      return <img src={CreateProjectIcon} alt="create" />;
    default:
      return null;
  }
};

export default GetIcon;
