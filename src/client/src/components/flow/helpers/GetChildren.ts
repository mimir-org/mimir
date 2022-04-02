import { IsPartOf } from ".";
import { Project } from "../../../models";

export const GetChildren = (nodeId: string, project: Project) =>
  project?.nodes?.filter((otherNode) =>
    project?.edges?.find((edge) => edge.fromNodeId === nodeId && edge.toNodeId === otherNode?.id && IsPartOf(edge.fromConnector))
  );
