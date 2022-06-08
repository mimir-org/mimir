import { EnumBase } from "../../../../../../../models";
import { Project } from "@mimirorg/modelbuilder-types";
import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement } from "../../../../../types";
import { NodeAdminContent } from "../components/NodeAdminContent";
import { RelationEdgeAdminContent } from "../components/RelationEdgeAdminContent";
import { TransportInterfaceAdminContent } from "../components/TransportInterfaceAdminContent";

export const GetAdminContent = (element: InspectorElement, project: Project, statuses: EnumBase[]) => {
  if (IsNode(element)) return <NodeAdminContent node={element} project={project} statuses={statuses} />;

  if (IsEdge(element)) {
    if (element.transport || element.interface) {
      return <TransportInterfaceAdminContent edge={element} project={project} statuses={statuses} />;
    }
    return <RelationEdgeAdminContent edge={element} />;
  }
};
