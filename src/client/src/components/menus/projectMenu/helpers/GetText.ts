import { TextResources } from "../../../../assets/text";

const GetText = (type: string) => {
  if (type === TextResources.Project_Open) return TextResources.Project_Open_Label;
  if (type === TextResources.Project_Create) return TextResources.Project_Create_Label;
  if (type === TextResources.Project_Save) return TextResources.Project_Save_Label;
  if (type === TextResources.Project_Logout) return TextResources.Project_Logout_Label;
  if (type === TextResources.Project_Save_Library) return TextResources.Project_Export_Library_File;
  if (type === TextResources.Project_Save_File) return TextResources.Project_Save_Label_File;
  if (type === TextResources.Project_Import_Project) return TextResources.Project_Import_File;
  if (type === TextResources.Project_Import_Lib_Label) return TextResources.Project_Import_Library_File;
  if (type === TextResources.Project_Commit) return TextResources.Project_Commit_Label;
  if (type === TextResources.Project_SubProject_Create) return TextResources.Project_SubProject_Create_Label;
};

export default GetText;
