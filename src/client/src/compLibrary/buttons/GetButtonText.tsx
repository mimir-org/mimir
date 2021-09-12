import { TextResources } from "../../assets/text";

const GetButtonText = (type: string) => {
  if (type === TextResources.Account_Logout)
    return TextResources.Account_Logout_Label;
  if (type === TextResources.Account_Open) return TextResources.Account_Open;
  if (type === TextResources.Account_Create)
    return TextResources.Account_Create;
  if (type === TextResources.Account_Cancel)
    return TextResources.Account_Cancel;
  if (type === TextResources.Account_Import_Label_File_Browse)
    return TextResources.Account_Import_Label_File_Browse;
  if (type === TextResources.Account_Export_File_Label)
    return TextResources.Account_Export_File_Label;
  if (type === TextResources.Account_Export_File_Library_Label)
    return TextResources.Account_Export_File_Label;
  if (type === "Import project library")
    // TODO: fix string
    return TextResources.Account_Import_Label_File_Browse;
};

export default GetButtonText;
