import { FileContent } from "use-file-picker/dist/interfaces";
import { FileData, ProjectFileAm } from "../../../../../../models";

const GetProjectFileData = (filesContent: FileContent[]): ProjectFileAm => {
  if (!filesContent || filesContent.length <= 0) return null;
  const fileData = filesContent[0] as FileData;

  return {
    parserId: "59ed4298-ee6a-443d-a465-35053e9b4581",
    fileContent: fileData.content,
  };
};
export default GetProjectFileData;
