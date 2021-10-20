import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { NodeBox } from "../../../styled";
import { BlockNodeNameBox } from "../../styled";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { OnHover, OnMouseOut, OnConnectorClick } from "./handlers";
import { FilterTerminals, GetNodeByDataId } from "../../helpers";
import { Symbol } from "../../../../../compLibrary/symbol";
import { Size } from "../../../../../compLibrary";
import {
  isElectroVisibleSelector,
  nodeSelector,
  splitViewNodeSelector,
  splitViewSelector,
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/store";

/**
 * Component for a Location Node in BlockView.
 * @param data the data for the node.
 * @returns a Location Node of the Flow node type with Mimir styling and functionality.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useAppSelector(nodeSelector);
  const splitView = useAppSelector(splitViewSelector);
  const splitNode = useAppSelector(splitViewNodeSelector);
  const electro = useAppSelector(isElectroVisibleSelector);
  if (data) data.width = Size.Node_Width;

  // Enforce size change of node
  useEffect(() => {
    const locationNode = GetNodeByDataId(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  return (
    <>
      <NodeBox
        id={"BlockLocationNode-" + data.id}
        width={data?.width}
        length={data?.length}
        product={false}
        onMouseOver={() => OnHover(showTerminalButton)}
        onMouseOut={() => OnMouseOut(showTerminalButton)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsContainerComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={FilterTerminals(data, splitView, splitNode)}
          parent={false}
          splitView={splitView}
          onClick={(conn) => OnConnectorClick(conn, data, dispatch)}
          menuBox={terminalButton}
          mainConnectNode={false}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
      </NodeBox>

      <HandleComponent
        node={data}
        nodes={nodes}
        length={data?.length}
        width={data?.width}
        terminals={FilterTerminals(data, splitView, splitNode)}
        parent={false}
        splitView={splitView}
        electro={electro}
        mainConnectNode={false}
      />
    </>
  );
};

export default memo(BlockLocationNode);
