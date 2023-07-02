import { AspectObject, Project } from "lib";
import { InspectorElement } from "../../../../../types";
import { NodeAdminContent } from "../components/NodeAdminContent";

/**
 * Component to determine which type's content to be displayed.
 * @param element
 * @param project
 * @returns the admin content for a given type.
 */
export const GetAdminContent = (element: InspectorElement, project: Project) => {
  if (element instanceof AspectObject) return <NodeAdminContent node={element} project={project} />;

  return null;
};
