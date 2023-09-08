export class FileFormat {
  contentType: string;
  fileExtension: string;
}

export class ProjectFileAm {
  parserId: string;
  fileContent: string;
  fileFormat: FileFormat;
  fileName: string;
}
