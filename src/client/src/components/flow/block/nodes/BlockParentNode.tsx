/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsMenuComponent } from "../terminals";
import { OnConnectorClick, ResizeHandler } from "./handlers";
import { BlockParentContainer } from "./parentContainer";
import { FilterTerminals } from "../helpers";
import { AspectColorType, Connector } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { GetAspectColor } from "../../../../helpers";
import { OnChildClick, OnParentClick } from "./parentContainer/handlers";
import { SetParentNodeSize } from "./helpers";
import { blockElementsSelector } from "../../../../redux/store";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [showInputMenu, setShowInputMenu] = useState(false);
  const [showOutputMenu, setShowOutputMenu] = useState(false);
  const [terminals, setTerminals] = useState<Connector[]>([]);

  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const elements = useAppSelector(blockElementsSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    SetParentNodeSize(secondaryNode !== null, libOpen, explorerOpen, dispatch);
  }, [secondaryNode, libOpen, explorerOpen]);

  // Responsive resizing
  useEffect(() => {
    ResizeHandler(node, secondaryNode, libOpen, explorerOpen, elements, dispatch);
  }, [secondaryNode, libOpen, explorerOpen]);

  if (!node) return null;

  return (
    <>
      <BlockParentContainer
        node={node}
        size={size}
        color={GetAspectColor(node, AspectColorType.Header)}
        hasTerminals={terminals.length > 0}
        isSecondaryNode={node.id === secondaryNode?.id}
        onParentClick={() => OnParentClick(dispatch, node)}
        onChildClick={() => OnChildClick(dispatch, node, nodes, edges)}
        dispatch={dispatch}
      />
      <TerminalsMenuComponent
        node={node}
        terminals={terminals}
        size={size}
        showInputMenu={showInputMenu}
        showOutputMenu={showOutputMenu}
        setShowInputMenu={setShowInputMenu}
        setShowOutputMenu={setShowOutputMenu}
        electro={electro}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        isParent
      />
      {hasActiveTerminals && (
        <HandleComponent node={node} size={size} terminals={terminals} electro={electro} dispatch={dispatch} isParent />
      )}
    </>
  );
};

export default memo(BlockParentNode);
