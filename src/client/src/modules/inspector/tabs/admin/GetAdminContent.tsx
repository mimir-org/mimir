import { NodeAdminContent, TransportInterfaceAdminContent } from ".";
import { EnumBase, Project } from "../../../../models";
import { IsEdge, IsNode } from "../../helpers/IsType";
import { InspectorElement } from "../../types";
import RelationEdgeAdminContent from "./RelationEdgeAdminContent";

export const GetAdminContent = (element: InspectorElement, project: Project, statuses: EnumBase[]) => {
  if (IsNode(element)) return <NodeAdminContent node={element} project={project} statuses={statuses} />;
  if (IsEdge(element)) {
    if (element.transport || element.interface) return <TransportInterfaceAdminContent edge={element} statuses={statuses} />;
    else return <RelationEdgeAdminContent edge={element} />;
  }
};
