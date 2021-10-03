import * as ProjectIcons from "../../assets/icons/common/project";
import { TextResources } from "../../assets/text";
import { LogoutIcon, RightArrowIcon, CloseIcon, ValidateIcon } from "../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === TextResources.Account_Logout) return LogoutIcon;
  if (type === TextResources.Account_Open) return RightArrowIcon;
  if (type === TextResources.Account_Create) return ProjectIcons.CreateProject;
  if (type === TextResources.Account_Cancel) return CloseIcon;
  if (type === TextResources.Account_Save_Button) return ValidateIcon;
  if (type === TextResources.Account_NoSave_Button) return CloseIcon;
  if (type === TextResources.Account_Import_File) return ProjectIcons.ImportProject;
  if (type === TextResources.Account_Export_File_Label) return ProjectIcons.ExportProject;
  if (type === TextResources.Account_Export_File_Library_Label) return ProjectIcons.ExportLibrary;
  if (type === TextResources.Account_Import_Library_File) return ProjectIcons.ImportLibrary;
};

export default GetButtonIcon;
