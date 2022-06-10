import { CommitStatus } from "@mimirorg/modelbuilder-types";

export interface CommitPackage {
  projectId: string;
  commitStatus: CommitStatus;
  parser: string;
  receivingDomain: string;
}
