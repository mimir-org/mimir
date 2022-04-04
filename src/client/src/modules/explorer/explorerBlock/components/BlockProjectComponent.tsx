import * as selectors from "./helpers/selectors";
import { Node } from "../../../../models";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../../helpers/ParentNode";
import { memo, useState } from "react";
import { InitialSortNodes } from "../../shared/helpers/SortNodesWithIndent";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ProjectContentContainer } from "../../shared/styled/ProjectComponent.styled";
import { IsOffPage } from "../../../../helpers/Aspects";
import { OnExpandElement } from "./handlers/OnExpandElements";

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of BlockView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
const BlockProjectComponent = () => {
  const dispatch = useAppDispatch();
  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const project = useAppSelector(selectors.projectSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const selectedNode = nodes?.find((n) => n.isSelected);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, project);

  if (!project || !nodes) return null;

  return (
    <ProjectContentContainer>
      {InitialSortNodes(nodes).map((node) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <BlockAspectComponent
            key={node.id}
            project={project}
            username={username}
            node={node}
            selectedNode={selectedNode}
            secondaryNode={secondaryNode}
            indent={node.level}
            isExpanded={expanded}
            isLeaf={!HasChildren(node, project)}
            onToggleExpanded={() => OnExpandElement(!expanded, node.id, closedNodes, setClosedNodes)}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
export default memo(BlockProjectComponent);
