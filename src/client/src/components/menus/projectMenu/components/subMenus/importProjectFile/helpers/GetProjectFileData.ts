import { FileData, ModuleDescription, ProjectFileAm } from "../../../../../../../models";

interface FileContent {
  lastModified: number;
  name: string;
  content: string;
}

const GetProjectFileData = (filesContent: FileContent[], parser: ModuleDescription): ProjectFileAm => {
  if (!parser || !filesContent || filesContent.length <= 0) return null;
  const fileData = filesContent[0] as FileData;

  return {
    parserId: parser.id,
    fileContent: fileData.content,
    fileFormat: null,
  };
};
export default GetProjectFileData;
