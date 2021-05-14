import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetBlockHandleType } from "../helpers";
import { OptionsIcon } from "../../../assets/icons/blockView";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
} from "../../../componentLibrary/blockView";

const BlockViewFunction: FC<NodeProps> = ({ data }) => {
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  return (
    <NodeBox onMouseOver={handleOnHover} onMouseOut={handleOnMouseOut}>
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="" />
      </OptionsMenu>
      <OptionsBox visible={menuOpen}>
        {data.connectors.map((conn) => (
          <OptionsElement key={conn.id}>
            {conn.name}
            <img
              src={GetConnectorIcon(conn.terminalType)}
              alt="icon"
              className="button"
            />
          </OptionsElement>
        ))}
      </OptionsBox>
      {/* {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = GetBlockHandleType(connector);
          return (
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
            />
          );
        })} */}
      <div>{data.label ?? data.name}</div>
    </NodeBox>
  );
};

export default memo(BlockViewFunction);
