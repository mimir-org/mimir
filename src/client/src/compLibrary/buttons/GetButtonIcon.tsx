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
} from "../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === TextResources.Account_Logout) return LogoutIcon;
  if (type === TextResources.Account_Open) return RightArrowIcon;
  if (type === TextResources.Account_Create) return CreateProjectIcon;
  if (type === TextResources.Account_Cancel) return CloseIcon;
  if (type === TextResources.Account_Import_Label_File_Browse)
    return ImportProjectIcon;
  if (type === TextResources.Account_Export_File_Label)
    return ExportProjectIcon;
  if (type === TextResources.Account_Export_File_Library_Label)
    return ExportLibraryIcon;
  if (type === "Import project library") return ImportLibraryIcon; // TODO: fix string
};

export default GetButtonIcon;
