import { memo, FC, useState, useEffect } from "react";
import { Background, BackgroundVariant, NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Color } from "../../../../../compLibrary";
import { SetParentProductNodeSize } from "./helpers";
import { OnConnectorClick } from "./handlers";
import { BlockComponent } from ".";
import { FilterTerminals } from "../../helpers";
import { AspectColorType, Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, nodeSizeSelector } from "../../../../../redux/store";
import { GetAspectColor, IsLocation } from "../../../../../helpers";

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
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const electro = useAppSelector(electroSelector);
  const parentNodeSize = useAppSelector(nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, null));
  }, [node?.connectors]);

  useEffect(() => {
    SetParentProductNodeSize(node, dispatch); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!node) return null;

  node.blockWidth = parentNodeSize?.width;
  node.blockLength = parentNodeSize?.length;

  return (
    <>
      <BlockComponent
        dispatch={dispatch}
        node={node}
        color={GetAspectColor(node, AspectColorType.Header)}
        selected={node.isBlockSelected}
        width={parentNodeSize?.width}
        height={parentNodeSize?.length}
        hasChildren={terminals.length > 0}
      />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        electro={electro}
        terminals={terminals}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        showMenuBox={true}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        parent={true}
        nodes={nodes}
        length={node.blockLength}
        width={node.blockWidth}
        terminals={terminals}
        electro={electro}
      />
      {IsLocation(data) && <Background style={{ zIndex: 1 }} variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
    </>
  );
};

export default memo(BlockParentProductNode);
