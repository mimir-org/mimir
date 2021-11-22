import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../terminals";
import { OnConnectorClick, ResizeHandler } from "./handlers";
import { ParentContainerComponent } from "./parentContainer";
import { FilterTerminals } from "../helpers";
import { AspectColorType, Connector } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, nodeSizeSelector, secondaryNodeSelector } from "../../../../redux/store";
import { GetAspectColor } from "../../../../helpers";
import { setBlockNodeSize } from "../redux/actions";
import { Size } from "../../../../compLibrary/size";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const parentBlockSize = useAppSelector(nodeSizeSelector);

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const electro = useAppSelector(electroSelector);
  const node = nodes?.find((x) => x.id === data.id);

  // Set size
  useEffect(() => {
    const margin = secondaryNode ? 250 : Size.BlockMarginX;
    const width = secondaryNode ? Size.BlockSmallWidth : Size.BlockWidth;
    dispatch(setBlockNodeSize(width - margin, Size.BlockHeight));
  }, [dispatch, secondaryNode]);

  // Resize
  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
    ResizeHandler(node, secondaryNode, parentBlockSize, dispatch);
  }, [node, secondaryNode, parentBlockSize, dispatch]);

  if (!node) return null;

  return (
    <>
      <ParentContainerComponent
        node={node}
        color={GetAspectColor(node, AspectColorType.Header)}
        selected={node.isBlockSelected}
        width={parentBlockSize.width}
        height={parentBlockSize.height}
        hasChildren={terminals.length > 0}
        company={process.env.REACT_APP_COMPANY}
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
        height={parentBlockSize.height}
        width={parentBlockSize.width}
        terminals={terminals}
        electro={electro}
      />
    </>
  );
};

export default memo(BlockParentNode);
