import * as Icons from "../../../../assets/icons/project";
import { TextResources } from "../../../../assets/text";

const GetIcon = (type: string) => {
  switch (type) {
    case TextResources.Account_Save:
      return <img src={Icons.Save} alt="save database" />;
    case TextResources.Account_Save_File:
      return <img src={Icons.ExportProject} alt="save file" />;
    case TextResources.Account_Commit:
      return <img src={Icons.ExportLibrary} alt="commit project" />;
    case TextResources.Account_Open:
      return <img src={Icons.OpenProject} alt="open" />;
    case TextResources.Account_Create:
      return <img src={Icons.CreateProject} alt="create" />;
    case TextResources.Account_Save_Library:
      return <img src={Icons.ExportLibrary} alt="save library" />;
    case TextResources.Account_Import_Project:
      return <img src={Icons.ImportProject} alt="import project" />;
    case TextResources.Account_Import_Lib_Label:
      return <img src={Icons.ImportLibrary} alt="import library" />;
    default:
      return null;
  }
};

export default GetIcon;
