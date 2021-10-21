import { InspectorComponent } from ".";
import { Project } from "../../models";
import { AdminComponent } from "./tabs/admin";
import { IsProduct } from "../../components/flow/helpers";
import { AttributeLikeItem, InspectorElement } from "./types";
import { IsCreateLibraryType, IsEdge, IsNode } from "./helpers/IsType";
import { IsRelationEdge } from "../../components/flow/helpers/IsRelationEdge";
import { IsLocation } from "../../typeEditor/helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  attributeLikeItems?: AttributeLikeItem[];
}

const InspectorTabs = ({ project, element, attributeLikeItems }: Props) => {
  const shouldShowParameters =
    IsNode(element) || IsCreateLibraryType(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowTerminals =
    IsNode(element) ||
    (IsCreateLibraryType(element) && !IsLocation(element.aspect)) ||
    (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowSimpleTypes = IsNode(element) && IsProduct(element);

  return (
    <>
      {element && (
        <>
          <AdminComponent element={element} project={project} index={0} />
          {shouldShowParameters && (
            <InspectorComponent element={element} index={1} attributeLikeItems={attributeLikeItems} />
          )}
          {shouldShowTerminals && <InspectorComponent element={element} index={2} />}
          {shouldShowRelations && <InspectorComponent element={element} index={3} />}
          {shouldShowSimpleTypes && <InspectorComponent element={element} index={4} />}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
