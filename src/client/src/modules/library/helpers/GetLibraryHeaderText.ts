import { TextResources } from "../../../assets/text";

const GetLibraryHeaderText = (index: number) => {
  if (index === 0) return TextResources.Module_Library;
  if (index === 1) return TextResources.Library_SubProjects;
  if (index === 2) return TextResources.Library_Templates;
};

export default GetLibraryHeaderText;
