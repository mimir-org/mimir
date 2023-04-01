import { CommitStatus } from "lib";

export interface CommitPackage {
  projectId: string;
  commitStatus: CommitStatus;
  parser: string;
  receivingDomain: string;
}
