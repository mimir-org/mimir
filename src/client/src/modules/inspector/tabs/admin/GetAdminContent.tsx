import { AdminContent } from ".";
import { EnumBase, Project } from "../../../../models";
import { IsEdge, IsNode } from "../../helpers/IsType";
import { InspectorElement } from "../../types";
import EdgeAdminContent from "./EdgeAdminContent";

export const GetAdminContent = (element: InspectorElement, project: Project, statuses: EnumBase[]) => {
  if (IsNode(element)) return <AdminContent node={element} project={project} statuses={statuses} />;
  if (IsEdge(element)) return <EdgeAdminContent edge={element} />;
};
