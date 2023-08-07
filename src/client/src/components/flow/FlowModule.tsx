import { Flow } from "./Flow";
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
  updateFlowNodesAndEdgesFromState,
} from "components/handlers/ProjectHandlers";
import { useMimirorgTheme } from "@mimirorg/component-library";

/**
 * Component to display a module in Flow.
 * @returns a JSX element containing Flow view.
 */
export const FlowModule = () => {
  const theme = useMimirorgTheme();
  const flowRef = useRef(null);
  const dispatch = useAppDispatch();
  const project = useAppSelector<Project>(projectSelector);
  const viewType = useAppSelector<ViewType>(viewTypeSelector);
  const nodesEdges = project.toFlow(viewType, theme);

  useEffect(() => {
    updateFlowNodesAndEdgesFromState(flowRef, project, viewType, theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, viewType]);

  return (
    <>
      {project && (
        <FlowModuleContainer>
          <Flow
            ref={flowRef}
            nodes={nodesEdges[0]}
            edges={nodesEdges[1]}
            onNodePositionChange={(id, x, y) => onNodePositionChange(id, x, y, viewType, project, dispatch)}
            onNodeDelete={(id) => onNodeDelete(id, project, dispatch)}
            onNodeDrop={(type, posX, posY) => onNodeDrop(type, posX, posY, project, viewType, dispatch)}
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
