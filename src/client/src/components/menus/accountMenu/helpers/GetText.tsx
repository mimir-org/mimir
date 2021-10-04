import { TextResources } from "../../../../assets/text";

const GetText = (type: string) => {
  if (type === TextResources.Account_Open) return TextResources.Account_Open_Label;
  if (type === TextResources.Account_Create) return TextResources.Account_Create_Label;
  if (type === TextResources.Account_Save) return TextResources.Account_Save_Label;
  if (type === TextResources.Account_Logout) return TextResources.Account_Logout_Label;
  if (type === TextResources.Account_Save_Library) return TextResources.Account_Export_Library_File;
  if (type === TextResources.Account_Save_File) return TextResources.Account_Save_Label_File;
  if (type === TextResources.Account_Import_Project) return TextResources.Account_Import_File;
  if (type === TextResources.Account_Import_Library_Label) return TextResources.Account_Import_Library_File;
  if (type === TextResources.Account_Commit_Project) return TextResources.Account_Commit_Project_Label;
};

export default GetText;
