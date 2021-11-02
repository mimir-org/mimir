import { InspectorComponent } from ".";
import { Project } from "../../models";
import { AdminComponent } from "./tabs/admin";
import { IsProduct } from "../../components/flow/helpers";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { IsCreateLibraryType, IsEdge, IsNode } from "./helpers/IsType";
import { IsRelationEdge } from "../../components/flow/helpers/IsRelationEdge";
import { IsLocation } from "../../typeEditor/helpers";
import { Action } from "redux";

interface Props {
  project: Project;
  element: InspectorElement;
  activeTabIndex: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
  changeInspectorTabAction?: (index: number) => Action;
}

const InspectorTabs = ({
  project,
  element,
  activeTabIndex,
  attributeLikeItems,
  terminalLikeItems,
  compositeLikeItems,
  changeInspectorTabAction,
}: Props) => {
  const shouldShowAdmin = !IsCreateLibraryType(element) || !!element.objectType;
  const shouldShowParameters =
    IsNode(element) ||
    (IsCreateLibraryType(element) && element.attributeTypes.length > 0) ||
    (IsEdge(element) && !IsRelationEdge(element));
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
          {shouldShowAdmin && (
            <AdminComponent
              element={element}
              project={project}
              index={0}
              activeTabIndex={activeTabIndex}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
          {shouldShowParameters && (
            <InspectorComponent
              element={element}
              index={1}
              activeTabIndex={activeTabIndex}
              attributeLikeItems={attributeLikeItems}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
          {shouldShowTerminals && (
            <InspectorComponent
              element={element}
              index={2}
              activeTabIndex={activeTabIndex}
              terminalLikeItems={terminalLikeItems}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
          {shouldShowRelations && (
            <InspectorComponent
              element={element}
              index={3}
              activeTabIndex={activeTabIndex}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
          {shouldShowSimpleTypes && (
            <InspectorComponent
              element={element}
              index={4}
              activeTabIndex={activeTabIndex}
              compositeLikeItems={compositeLikeItems}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
