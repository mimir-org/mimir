import { Project } from "@mimirorg/modelbuilder-types";
import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement } from "../../../../../types";
import { NodeAdminContent } from "../components/NodeAdminContent";
import { RelationEdgeAdminContent } from "../components/RelationEdgeAdminContent";
import { TransportInterfaceAdminContent } from "../components/TransportInterfaceAdminContent";

/**
 * Component to determine which type's content to be displayed.
 * @param element
 * @param project
 * @returns the admin content for a given type.
 */
export const GetAdminContent = (element: InspectorElement, project: Project) => {
  if (IsNode(element)) return <NodeAdminContent node={element} project={project} />;

  if (IsEdge(element)) {
    return element.transport || element.interface ? (
      <TransportInterfaceAdminContent edge={element} project={project} />
    ) : (
      <RelationEdgeAdminContent edge={element} />
    );
  }

  return null;
};
