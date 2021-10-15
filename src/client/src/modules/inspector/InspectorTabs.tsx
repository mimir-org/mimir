import { InspectorComponent } from ".";
import { Project } from "../../models";
import { AdminComponent } from "./tabs/admin";
import { IsProduct } from "../../components/flow/helpers";
import { InspectorElement } from "./types";
import { IsEdge, IsNode } from "./helpers/IsType";
import { IsRelationEdge } from "../../components/flow/helpers/IsRelationEdge";

interface Props {
  project: Project;
  element: InspectorElement;
}

const InspectorTabs = ({ project, element }: Props) => {
  const shouldShowParameters = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowTerminals = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element);
  const shouldShowSimpleTypes = IsNode(element) && IsProduct(element);

  return (
    <>
      {element && (
        <>
          <AdminComponent element={element} project={project} index={0} />
          {shouldShowParameters && <InspectorComponent element={element} index={1} />}
          {shouldShowTerminals && <InspectorComponent element={element} index={2} />}
          {shouldShowRelations && <InspectorComponent element={element} index={3} />}
          {shouldShowSimpleTypes && <InspectorComponent element={element} index={4} />}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
