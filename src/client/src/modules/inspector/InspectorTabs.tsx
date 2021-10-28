import { InspectorComponent } from ".";
import { Project } from "../../models";
import { AdminComponent } from "./tabs/admin";
import { IsProduct } from "../../components/flow/helpers";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { IsCreateLibraryType, IsEdge, IsNode } from "./helpers/IsType";
import { IsRelationEdge } from "../../components/flow/helpers/IsRelationEdge";
import { IsLocation } from "../../typeEditor/helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
}

const InspectorTabs = ({ project, element, attributeLikeItems, terminalLikeItems, compositeLikeItems }: Props) => {
  const shouldShowAdmin = !IsCreateLibraryType(element) || !!element.objectType;
  const shouldShowParameters =
    IsNode(element) || (IsCreateLibraryType(element) && element.purpose) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowTerminals =
    IsNode(element) ||
    (IsCreateLibraryType(element) && !IsLocation(element.aspect) && element.terminalTypes.length > 0) ||
    (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowSimpleTypes = (IsNode(element) && IsProduct(element)) || (IsCreateLibraryType(element) && IsProduct(element));

  return (
    <>
      {element && (
        <>
          {shouldShowAdmin && <AdminComponent element={element} project={project} index={0} />}
          {shouldShowParameters && <InspectorComponent element={element} index={1} attributeLikeItems={attributeLikeItems} />}
          {shouldShowTerminals && <InspectorComponent element={element} index={2} terminalLikeItems={terminalLikeItems} />}
          {shouldShowRelations && <InspectorComponent element={element} index={3} />}
          {shouldShowSimpleTypes && <InspectorComponent element={element} index={4} compositeLikeItems={compositeLikeItems} />}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
