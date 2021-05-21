import { memo, FC, useState, useEffect, useCallback, useMemo } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { OptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { RootState } from "../../../redux/store";
import { Connector } from "../../../models/project";
import {
  GetConnectorIcon,
  GetBlockHandleType,
  GetHandlePosition,
  GetHandleType,
  SortConnectorList,
  GetConnectorName,
} from "../helpers";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
  HandleBox,
} from "../../../componentLibrary/blockView";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";

const BlockViewFunction: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
    setIsVisible(true);
    setMenuOpen(false);
    SetConnectors(connectors);
  };
  //   const connectors = SortConnectorList(
  //     useSelector<RootState>((state) => state.flow.connectors) as Connector[]
  //   );
  const connectors = GetConnectors();

  return (
    <NodeBox onMouseOver={handleOnHover} onMouseOut={handleOnMouseOut}>
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
      </OptionsMenu>
      <OptionsBox visible={menuOpen}>
        {SortConnectorList(data.connectors).map((conn) => (
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
      <div>{data.label ?? data.names}</div>

      {/* Show connectors added to node */}
      {isVisible &&
        connectors.map((conn) => {
          const [type, pos, className] = GetBlockHandleType(conn, data.type);
          if (data.id === conn.nodeId) {
            return (
              <HandleBox position={GetHandlePosition(pos)} key={conn.id}>
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
          } else return null;
        })}

      {/* Original connectors */}
      {data.connectors &&
        data.connectors.map((connector) => {
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

export default memo(BlockViewFunction);
