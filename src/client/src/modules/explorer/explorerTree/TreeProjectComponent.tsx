import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { commonStateSelector, useAppSelector, projectStateSelector } from "store";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
// import { OnSetVisibleElement } from "./handlers/OnSetVisibleElement";
import { Dispatch } from "redux";
import { CommonState } from "store/reducers/commonReducer";
import { ProjectState } from "store/reducers/projectReducer";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of TreeView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
export const TreeProjectComponent = ({ dispatch }: Props) => {
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const projectState = useAppSelector<ProjectState>(projectStateSelector);
  const project = projectState?.project;
  const nodes = project?.blocks;

  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  // const [invisibleNodes, setInvisibleNodes] = useState(new Set<string>());
  const [lockingNode, setLockingNode] = useState(null);

  // const ancestorsCollapsed = (elem: AspectObject) => IsAncestorInSet(elem, closedNodes, edges);
  // const ancestorsVisible = (elem: Node) => !IsAncestorInSet(elem, invisibleNodes, edges);
  // const isVisible = (elem: Node) => !invisibleNodes.has(elem.id);

  useEffect(() => {
    if (lockingNode !== null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        const expanded = !closedNodes.has(node.id);

        return (
          <TreeAspectComponent
            key={node.id}
            username={commonState?.user?.email ?? ""}
            node={node}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!project.hasChildren(node.id)}
            // isAncestorVisible={ancestorsVisible(node)}
            // isVisible={!node.hidden}
            isNodeLocking={lockingNode?.id === node.id && projectState.isLocking}
            isGlobalLocking={projectState.isLocking}
            setLockingNode={setLockingNode}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            // onSetVisibleElement={(visible, nodeId) => OnSetVisibleElement(visible, nodeId, invisibleNodes, setInvisibleNodes)}
            dispatch={dispatch}
            project={project}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
