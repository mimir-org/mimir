import textResources from "../../../../../textResources";

const GetTextResource = (index: number) => {
  return index === 0
    ? textResources.Inspector_Object
    : index === 1
    ? textResources.Inspector_Header
    : index === 2
    ? textResources.Inspector_Body
    : index === 3
    ? textResources.Inspector_Relations
    : index === 4
    ? textResources.Inspector_Inhereted
    : textResources.Inspector_Object;
};

export default GetTextResource;
