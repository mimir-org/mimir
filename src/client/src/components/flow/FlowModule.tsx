import { FlowTree } from "./tree/FlowTree";
import { FlowModuleContainer } from "./FlowModule.styled";
import { Project, ViewType } from "lib";
import { useEffect, useRef } from "react";
import { projectSelector, useAppDispatch, useAppSelector, viewTypeSelector } from "store";
import {
  onEdgeConnect,
  onEdgeDelete,
  onEdgeSelect,
  onNodeDelete,
  onNodeDrop,
  onNodePositionChange,
  onNodeSelect,
  updateFlowEdgesFromState,
  updateFlowNodesFromState,
} from "components/handlers/ProjectHandlers";

/**
 * Component to display a module in Flow.
 * @returns a JSX element containing Flow view.
 */
export const FlowModule = () => {
  const flowRef = useRef(null);
  const dispatch = useAppDispatch();
  const project = useAppSelector<Project>(projectSelector);
  const viewType = useAppSelector<ViewType>(viewTypeSelector);

  useEffect(() => {
    updateFlowNodesFromState(flowRef, project, viewType);
    updateFlowEdgesFromState(flowRef, project, viewType);
  }, [project, viewType]);

  return (
    <>
      {project && (
        <FlowModuleContainer>
          <FlowTree
            ref={flowRef}
            nodes={project.toFlowNodes(viewType)}
            edges={project.toFlowEdges(viewType)}
            onNodePositionChange={(id, x, y) => onNodePositionChange(id, x, y, viewType, project, dispatch)}
            onNodeDelete={(id) => onNodeDelete(id, project, dispatch)}
            onNodeDrop={(type, posX, posY) => onNodeDrop(type, posX, posY, project, dispatch)}
            onNodeSelect={(id, selected) => onNodeSelect(id, selected, project, viewType, dispatch)}
            onEdgeDelete={(id) => onEdgeDelete(id, project, dispatch)}
            onEdgeConnect={(edge) => onEdgeConnect(edge, project, dispatch)}
            onEdgeSelect={(id, selected) => onEdgeSelect(id, selected, project, dispatch)}
          />
        </FlowModuleContainer>
      )}
    </>
  );
};
