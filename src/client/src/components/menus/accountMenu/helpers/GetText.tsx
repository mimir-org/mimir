import textResources from "../../../../textResources";

const GetText = (type: string) => {
  let text =
    type === "Open"
      ? textResources.Account_Open_Label
      : type === "Create"
      ? textResources.Account_Create_Label
      : type === "Save"
      ? textResources.Account_Save_Label
      : type === "Logout"
      ? textResources.Account_Logout
      : null;

  return text;
};

export default GetText;
