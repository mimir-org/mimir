import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { OptionsIcon } from "../../../assets/icons/blockView";
import {
  GetConnectorIcon,
  GetBlockHandleType,
  GetHandlePosition,
  GetHandleType,
  SortConnectorList,
} from "../helpers";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
  HandleBox,
} from "../../../componentLibrary/blockView";

const BlockViewFunction: FC<NodeProps> = ({ data }) => {
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  var selectedConnectors = [];

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
    selectedConnectors.push(connector);
    setIsVisible(true);
    setMenuOpen(false);
  };

  const connectors = SortConnectorList(data.connectors);

  return (
    <NodeBox onMouseOver={handleOnHover} onMouseOut={handleOnMouseOut}>
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="" />
      </OptionsMenu>
      <OptionsBox visible={menuOpen}>
        {connectors.map((conn) => (
          <OptionsElement
            key={conn.id}
            onClick={() => handleConnectorClick(conn)}
          >
            {conn.name}
            <img
              src={GetConnectorIcon(conn.terminalType)}
              alt="icon"
              className="button"
            />
          </OptionsElement>
        ))}
      </OptionsBox>
      <div>{data.label ?? data.name}</div>
      {isVisible &&
        connectors.map((conn) => {
          const [type, pos, className] = GetBlockHandleType(conn);
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
                src={GetConnectorIcon(conn.terminalType)}
                alt="icon"
                className="connector"
              />
            </HandleBox>
          );
        })}
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
