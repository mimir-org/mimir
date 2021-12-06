import { FileContent } from "use-file-picker/dist/interfaces";
import { FileData, ModuleDescription, ProjectFileAm } from "../../../../../../models";

const GetProjectFileData = (filesContent: FileContent[], parser: ModuleDescription): ProjectFileAm => {
  if (!parser || !filesContent || filesContent.length <= 0) return null;
  const fileData = filesContent[0] as FileData;

  return {
    parserId: parser.id,
    fileContent: fileData.content,
  };
};
export default GetProjectFileData;
