import * as Icons from "../../../../assets/icons/project";
import { TextResources } from "../../../../assets/text";

const GetIcon = (type: string) => {
  switch (type) {
    case TextResources.Project_Save:
      return <img src={Icons.SaveIcon} alt="save database" />;
    case TextResources.Project_Save_File:
      return <img src={Icons.ExportProjectIcon} alt="save file" />;
    case TextResources.Project_Commit:
      return <img src={Icons.CommitProjectIcon} alt="commit project" />;
    case TextResources.Project_Open:
      return <img src={Icons.OpenProjectIcon} alt="open" />;
    case TextResources.Project_Create:
      return <img src={Icons.CreateProjectIcon} alt="create" />;
    case TextResources.Project_Save_Library:
      return <img src={Icons.ExportLibraryIcon} alt="save library" />;
    case TextResources.Project_Import_Project:
      return <img src={Icons.ImportProjectIcon} alt="import project" />;
    case TextResources.Project_Import_Lib_Label:
      return <img src={Icons.ImportLibraryIcon} alt="import library" />;
    case TextResources.Project_SubProject_Create:
      return <img src={Icons.CreateSubProjectIcon} alt="import library" />;
    default:
      return null;
  }
};

export default GetIcon;
