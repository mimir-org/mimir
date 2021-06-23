import {
  SaveIcon,
  CreateProjectIcon,
  OpenProjectIconSmall,
  ImportLibrary,
  ImportProject,
  ExportLibrary,
  ExportProject,
} from "../../../../assets/icons/common";

const GetIcon = (type: string) => {
  switch (type) {
    case "Save":
      return <img src={SaveIcon} alt="save database" />;
    case "SaveFile":
      return <img src={ExportProject} alt="save file" />;
    case "Open":
      return <img src={OpenProjectIconSmall} alt="open" />;
    case "Create":
      return <img src={CreateProjectIcon} alt="create" />;
    case "SaveLibrary":
      return <img src={ExportLibrary} alt="save library" />;
    case "ImportProject":
      return <img src={ImportProject} alt="import project" />;
    case "ImportLibrary":
      return <img src={ImportLibrary} alt="import library" />;
    default:
      return null;
  }
};

export default GetIcon;
