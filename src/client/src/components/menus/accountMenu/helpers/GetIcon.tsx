import { TextResources } from "../../../../assets/text";
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
    case TextResources.Account_Save:
      return <img src={SaveIcon} alt="save database" />;
    case TextResources.Account_Save_File:
      return <img src={ExportProjectIcon} alt="save file" />;
    case TextResources.Account_Open:
      return <img src={OpenProjectIcon} alt="open" />;
    case TextResources.Account_Create:
      return <img src={CreateProjectIcon} alt="create" />;
    case TextResources.Account_Save_Library:
      return <img src={ExportLibraryIcon} alt="save library" />;
    case TextResources.Account_Import_Project:
      return <img src={ImportProjectIcon} alt="import project" />;
    case TextResources.Account_Import_Library_Label:
      return <img src={ImportLibraryIcon} alt="import library" />;
    default:
      return null;
  }
};

export default GetIcon;
