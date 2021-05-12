import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetHandleType } from "../helpers";
import { OptionsIcon, PlusIcon } from "../../../assets/icons";

import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
} from "../../../componentLibrary/blockView";

const Function: FC<NodeProps> = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NodeBox>
      <OptionsMenu onClick={handleClick}>
        <img src={OptionsIcon} alt="" />
      </OptionsMenu>
      <OptionsBox visible={menuOpen}>
        {[...Array(6)].map(() => (
          <OptionsElement>
            Gas Export
            <img src={PlusIcon} alt="" className="button" />
          </OptionsElement>
        ))}
      </OptionsBox>
      {/* {data.connectors &&
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
        })} */}
      <div>{data.label ?? data.name}</div>
    </NodeBox>
  );
};

export default memo(Function);
