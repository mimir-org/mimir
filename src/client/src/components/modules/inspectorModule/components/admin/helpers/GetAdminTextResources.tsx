import textResources from "../../../../../../textResources";

const GetAdminTextResource = (index: number) => {
  return index === 0
    ? textResources.Inspector_AdminInfo
    : index === 1
    ? textResources.Inspector_TechInfo
    : index === 2
    ? textResources.Inspector_Relations
    : index === 3
    ? textResources.Inspector_Inhereted
    : index === 4
    ? textResources.Inspector_Comments
    : index === 5
    ? textResources.Inspector_Changelog
    : textResources.Inspector_Object;
};

export default GetAdminTextResource;
