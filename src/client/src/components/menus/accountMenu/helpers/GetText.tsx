import { TextResources } from "../../../../assets/text";

const GetText = (type: string) => {
  if (type === "Open") return TextResources.Account_Open_Label;
  if (type === "Create") return TextResources.Account_Create_Label;
  if (type === "Save") return TextResources.Account_Save_Label;
  if (type === "Logout") return TextResources.Account_Logout;
  if (type === "SaveLibrary")
    return TextResources.Account_Save_Label_Library_File;
  if (type === "SaveFile") return TextResources.Account_Save_Label_File;
  if (type === "ImportProject") return TextResources.Account_Import_Label_File;
  if (type === "ImportLibrary")
    return TextResources.Account_Import_Label_Library_File;
};

export default GetText;
