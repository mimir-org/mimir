import { CommitStatus } from "../enums/CommitStatus";

export interface CommitPackage {
  projectId: string;
  commitStatus: CommitStatus;
  parser: string;
  receivingDomain: string;
}
