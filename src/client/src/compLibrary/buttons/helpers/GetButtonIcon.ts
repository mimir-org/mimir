import * as ProjectIcons from "../../../assets/icons/project";
import { TextResources } from "../../../assets/text";
import { ValidateIcon } from "../../../assets/icons/common";
import { RightArrowIcon } from "../../../assets/icons/arrow";
import { CloseIcon } from "../../../assets/icons/close";
import { LogoutIcon } from "../../../assets/icons/header";
import { EditTypeIcon, NewTypeIcon } from "../../../assets/icons/type";

const GetButtonIcon = (type: string) => {
  if (type === TextResources.Project_Logout) return LogoutIcon;
  if (type === TextResources.Project_Start_Label) return ProjectIcons.CreateProject;
  if (type === TextResources.Project_Open) return RightArrowIcon;
  if (type === TextResources.Project_Create) return ProjectIcons.CreateProject;
  if (type === TextResources.Project_Cancel) return CloseIcon;
  if (type === TextResources.Project_Save_Button) return ValidateIcon;
  if (type === TextResources.Project_NoSave_Button) return CloseIcon;
  if (type === TextResources.Project_Import_File) return ProjectIcons.ImportProject;
  if (type === TextResources.Project_Export_File_Label) return ProjectIcons.ExportProject;
  if (type === TextResources.Project_Export_File_Library_Label) return ProjectIcons.ExportLibrary;
  if (type === TextResources.Project_Import_Library_File) return ProjectIcons.ImportLibrary;
  if (type === TextResources.Project_Commit_Button) return ProjectIcons.CommitProject;
  if (type === TextResources.Project_SubProject_Create) return ProjectIcons.CreateSubProject;
  if (type === TextResources.TypeEditor_New_Type) return NewTypeIcon;
  if (type === TextResources.TypeEditor_Edit_Type) return EditTypeIcon;
  return null;
};

export default GetButtonIcon;
