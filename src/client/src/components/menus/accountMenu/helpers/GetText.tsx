import { TextResources } from "../../../../assets/textResources";

const GetText = (type: string) => {
  let text =
    type === "Open"
      ? TextResources.Account_Open_Label
      : type === "Create"
      ? TextResources.Account_Create_Label
      : type === "Save"
      ? TextResources.Account_Save_Label
      : type === "Logout"
      ? TextResources.Account_Logout
      : type === "SaveFile"
      ? TextResources.Account_Save_Label_File
      : null;

  return text;
};

export default GetText;
