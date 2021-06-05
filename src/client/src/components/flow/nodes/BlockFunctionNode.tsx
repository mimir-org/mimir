import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { OptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { GetBlockHandleType, ValidateConnector } from "../helpers/block";
import { RootState } from "../../../redux/store";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  GetConnectorIcon,
  GetHandlePosition,
  SortConnectors,
  GetConnectorName,
  GetHandleType,
  IsLocationNode,
} from "../helpers/common";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
  HandleBox,
} from "../../../componentLibrary/blockView";

const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLocation = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

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

  const connectors = GetConnectors();

  return (
    <NodeBox onMouseOver={handleOnHover} onMouseOut={handleOnMouseOut}>
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
      </OptionsMenu>
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

      <div style={{ paddingTop: "14px" }}>{data.label ?? data.names}</div>
      {connectors?.map((conn) => {
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

export default memo(BlockFunctionNode);
