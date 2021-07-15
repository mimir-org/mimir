import {
  SaveIcon,
  CreateProjectIcon,
  OpenProjectIcon,
  ImportLibraryIcon,
  ImportProjectIcon,
  ExportLibraryIcon,
  ExportProjectIcon,
} from "../../../../assets/icons/common";

const GetIcon = (type: string) => {
  switch (type) {
    case "Save":
      return <img src={SaveIcon} alt="save database" />;
    case "SaveFile":
      return <img src={ExportProjectIcon} alt="save file" />;
    case "Open":
      return <img src={OpenProjectIcon} alt="open" />;
    case "Create":
      return <img src={CreateProjectIcon} alt="create" />;
    case "SaveLibrary":
      return <img src={ExportLibraryIcon} alt="save library" />;
    case "ImportProject":
      return <img src={ImportProjectIcon} alt="import project" />;
    case "ImportLibrary":
      return <img src={ImportLibraryIcon} alt="import library" />;
    default:
      return null;
  }
};

export default GetIcon;
