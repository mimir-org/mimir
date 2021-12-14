/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ProductSelectors";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../terminals";
import { OnConnectorClick, ResizeHandler } from "./handlers";
import { ParentContainerComponent } from "./parentContainer";
import { FilterTerminals } from "../helpers";
import { AspectColorType, Connector } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { GetAspectColor } from "../../../../helpers";
import { OnChildClick, OnParentClick } from "./parentContainer/handlers";
import { SetParentNodeSize } from "./helpers";

/**
 * Component for a parent Product Node in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentProductNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);

  const elements = useAppSelector(selectors.blockElementsSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);

  // Set size
  useEffect(() => {
    SetParentNodeSize(false, libOpen, explorerOpen, dispatch);
  }, [libOpen, explorerOpen]);

  // Responsive resizing
  useEffect(() => {
    ResizeHandler(node, null, libOpen, explorerOpen, elements, dispatch);
  }, [libOpen, explorerOpen]);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, null));
  }, [node]);

  if (!node) return null;

  return (
    <>
      <ParentContainerComponent
        node={node}
        size={size}
        color={GetAspectColor(node, AspectColorType.Header)}
        hasTerminals={terminals.length > 0}
        onParentClick={() => OnParentClick(dispatch, node)}
        onChildClick={() => OnChildClick(dispatch, node, nodes, edges)}
        dispatch={dispatch}
      />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        electro={electro}
        terminals={terminals}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
        isParent
      />
      <HandleComponent
        nodes={nodes}
        node={node}
        size={size}
        terminals={terminals}
        electro={electro}
        dispatch={dispatch}
        isParent
      />
    </>
  );
};

export default memo(BlockParentProductNode);
