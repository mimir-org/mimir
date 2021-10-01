import { TextResources } from "../../assets/text";
import {
  LogoutIcon,
  RightArrowIcon,
  CreateProjectIcon,
  CloseIcon,
  ImportProjectIcon,
  ImportLibraryIcon,
  ExportProjectIcon,
  ExportLibraryIcon,
  ValidateIcon,
} from "../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === TextResources.Account_Logout) return LogoutIcon;
  if (type === TextResources.Account_Open) return RightArrowIcon;
  if (type === TextResources.Account_Create) return CreateProjectIcon;
  if (type === TextResources.Account_Cancel) return CloseIcon;
  if (type === TextResources.Account_Save_Button) return ValidateIcon;
  if (type === TextResources.Account_NoSave_Button) return CloseIcon;
  if (type === TextResources.Account_Import_File) return ImportProjectIcon;
  if (type === TextResources.Account_Export_File_Label) return ExportProjectIcon;
  if (type === TextResources.Account_Export_File_Library_Label) return ExportLibraryIcon;
  if (type === TextResources.Account_Import_Library_File) return ImportLibraryIcon;
};

export default GetButtonIcon;
