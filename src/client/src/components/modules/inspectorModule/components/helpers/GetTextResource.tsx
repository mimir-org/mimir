import textResources from "../../../../../textResources";

const GetTextResource = (type: string): string => {
  return type === "object"
    ? textResources.Inspector_Object
    : type === "admin"
    ? textResources.Inspector_AdminInfo
    : type === "tech"
    ? textResources.Inspector_TechInfo
    : type === "relations"
    ? textResources.Inspector_Relations
    : type === "inherited"
    ? textResources.Inspector_Inhereted
    : type === "comments"
    ? textResources.Inspector_Comments
    : type === "changeLog"
    ? textResources.Inspector_Changelog
    : textResources.Inspector_Object;
};

export default GetTextResource;
