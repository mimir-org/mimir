import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../terminals";
import { OnConnectorClick } from "./handlers";
import { ParentContainerComponent } from "./parentContainer";
import { FilterTerminals } from "../helpers";
import { AspectColorType, Connector } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { productNodeSizeSelector, edgeSelector, electroSelector, nodeSelector } from "../../../../redux/store";
import { GetAspectColor } from "../../../../helpers";

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
  const parentBlockSize = useAppSelector(productNodeSizeSelector);

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const electro = useAppSelector(electroSelector);
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, null));
  }, [node]);

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
        dispatch={dispatch}
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
        width={parentBlockSize.width}
        height={parentBlockSize.height}
        terminals={terminals}
        electro={electro}
        dispatch={dispatch}
      />
    </>
  );
};

export default memo(BlockParentProductNode);
