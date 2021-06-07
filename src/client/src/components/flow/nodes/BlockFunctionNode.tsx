import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { OptionsIcon, BlockOptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { RootState } from "../../../redux/store";
import { OptionsComponent, HandleComponent } from "../block";
import { Node, TERMINAL } from "../../../models/project";
import { Size } from "../../../componentLibrary";
import {
  IsLocationNode,
  GetChildren,
  SortConnectors,
  GetConnectorName,
  GetConnectorIcon,
} from "../helpers/common";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  addConnectNode,
  addMainConnectNode,
  removeConnectNode,
} from "../../../redux/store/connectView/actions";
import {
  NodeBox,
  OptionsMenu,
  BlockOptionsMenu,
  OptionsBox,
  OptionsElement,
} from "../../../componentLibrary/blockView";

const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [showBlockMenuButton, setShowBlockMenuButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockMenuOpen, setBlockMenuOpen] = useState(false);
  const connectors = GetConnectors();
  const children = GetChildren(data);

  const mainConnectNode = useSelector<RootState>(
    (state) => state.connectView.mainNode
  ) as Node;

  const connectViewList = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  const isConnectViewNode = data.id === mainConnectNode?.id;

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBlockClick = () => {
    setBlockMenuOpen(!blockMenuOpen);
  };

  const handleOnHover = () => {
    setShowButton(true);
    setShowBlockMenuButton(true);
  };

  const handleOnMouseOut = () => {
    setShowButton(false);
    setShowBlockMenuButton(false);
  };

  const handleConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    setMenuOpen(false);
    setBlockMenuOpen(false);
    SetConnectors(connectors);
  };

  const handleOnChange = (node: Node) => {
    if (!isChecked(node)) {
      dispatch(addMainConnectNode(data));
      dispatch(addConnectNode(node));
    } else dispatch(removeConnectNode(node));
  };

  const isChecked = (node: Node): boolean => {
    let result = false;
    connectViewList?.forEach((element) => {
      if (element.id === node.id) result = true;
    });
    return result;
  };

  //   useEffect(() => {
  //     if (mainConnectNode) {
  //       const functionNode = document.querySelector(
  //         `[data-id="${mainConnectNode.id}"]`
  //       ) as HTMLElement;

  //       functionNode.style.width = `${Size.ConnectionView_Width}px`;
  //       functionNode.style.height = `${Size.ConnectionView_Length}px`;
  //       functionNode.style.zIndex = "1";
  //     }
  //   }, [mainConnectNode, data]);

  return (
    <NodeBox
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      length={data.length}
      isSelectedConnection={isConnectViewNode}
      function
    >
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
      </OptionsMenu>
      <BlockOptionsMenu
        visible={showBlockMenuButton && children.length > 0}
        onClick={handleBlockClick}
      >
        <img src={BlockOptionsIcon} alt="options" />
      </BlockOptionsMenu>

      <OptionsBox visible={menuOpen} type="function">
        {SortConnectors(data.connectors).map((conn) => (
          <OptionsElement
            key={conn.id}
            onClick={() => handleConnectorClick(conn)}
          >
            {GetConnectorName(conn)}
            <img
              src={GetConnectorIcon(conn.terminal)}
              alt="icon"
              className="button"
            />
          </OptionsElement>
        ))}
      </OptionsBox>

      <p className="node-name">{data.label ?? data.name}</p>

      {/* <OptionsComponent
        isOpen={menuOpen}
        list={data.connectors}
        type={TERMINAL}
        width={data.width}
        handleClick={handleConnectorClick}
      ></OptionsComponent>

      <OptionsComponent
        isOpen={blockMenuOpen}
        list={children}
        handleClick={handleOnChange}
        isChecked={isChecked}
        width={data.width}
      ></OptionsComponent> */}

      <HandleComponent
        data={data}
        list={connectors}
        isLocation={isLocationNode}
        type="block"
      ></HandleComponent>

      <HandleComponent
        data={data}
        list={data.connectors}
        isLocation={isLocationNode}
      ></HandleComponent>
    </NodeBox>
  );
};

export default memo(BlockFunctionNode);
