import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { CreateId, GetHandleType } from "../helpers";
import { OptionsIcon, PlusIcon } from "../../../assets/icons";

import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
} from "../../../componentLibrary/blockView";

const Function: FC<NodeProps> = ({ data }) => {
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
        {[...Array(6)].map(() => (
          <OptionsElement key={CreateId()}>
            2nd Process System
            <img src={PlusIcon} alt="" className="button" />
          </OptionsElement>
        ))}
      </OptionsBox>
      <div>{data.label ?? data.name}</div>
    </NodeBox>
  );
};

export default memo(Function);

// eslint-disable-next-line no-lone-blocks
{
  /* {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = GetHandleType(connector);
          return (
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
            />
          );
        })} */
}
