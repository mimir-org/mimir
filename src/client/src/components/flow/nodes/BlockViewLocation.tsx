import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { OptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { GetBlockHandleType, ValidateConnector } from "../helpers/block";
import store, { RootState } from "../../../redux/store";
import { Node } from "../../../models/project";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  GetConnectorIcon,
  GetHandlePosition,
  SortLocationConnectors,
  GetConnectorName,
  GetHandleType,
  IsLocationNode,
} from "../helpers";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
  HandleBox,
} from "../../../componentLibrary/blockView";

const BlockViewLocation: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isBlockSelected)
  ) as Node;

  const splitView = store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;

  const isLocation = isSplitView
    ? IsLocationNode(splitViewNode)
    : IsLocationNode(selectedNode);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnHover = () => {
    if (!menuOpen) {
      setShowButton(!showButton);
    }
  };

  const handleOnMouseOut = () => {
    if (!menuOpen) {
      setShowButton(false);
    }
  };

  const handleConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    setMenuOpen(false);
    SetConnectors(connectors);
  };

  const id = data.id;

  useEffect(() => {
    const locationNode = document.querySelector(
      `[data-id="${id}"]`
    ) as HTMLElement;

    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data, id]);

  const connectors = GetConnectors();

  return (
    <NodeBox
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      height={data.length}
    >
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
        <OptionsBox visible={menuOpen}>
          {SortLocationConnectors(data.connectors).map((conn) => (
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
      </OptionsMenu>

      <div style={{ paddingTop: "4px" }}>{data.label ?? data.names}</div>
      {connectors.map((conn) => {
        const [type, pos, className] = GetBlockHandleType(conn);
        if (data.id === conn.nodeId && ValidateConnector(conn, isLocation)) {
          return (
            <HandleBox
              id={"handle-" + conn.id}
              position={GetHandlePosition(pos)}
              key={conn.id}
            >
              <Handle
                type={type}
                position={pos}
                id={conn.id}
                key={conn.id}
                className={className}
              />
              <img
                src={GetConnectorIcon(conn.terminal)}
                alt="icon"
                className="connector"
              />
            </HandleBox>
          );
        }
        return null;
      })}

      {/* TODO: Remove */}
      {data.connectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);
        return (
          <Handle
            type={typeHandler}
            position={positionHandler}
            id={connector.id}
            key={connector.id}
            style={{ visibility: "hidden" }}
          />
        );
      })}
    </NodeBox>
  );
};

export default memo(BlockViewLocation);
