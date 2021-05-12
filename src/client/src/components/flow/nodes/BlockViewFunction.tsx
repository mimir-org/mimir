import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetHandleType } from "../helpers";
import { OptionsIcon } from "../../../assets/icons";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
} from "../../../componentLibrary/blockView";

const BlockViewFunction: FC<NodeProps> = ({ data }) => {
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
        <OptionsElement>Gas Export</OptionsElement>
        <OptionsElement>Process</OptionsElement>
        <OptionsElement>Well fluid</OptionsElement>
        <OptionsElement>Utilities</OptionsElement>
        <OptionsElement>Oil export</OptionsElement>
      </OptionsBox>
      {data.connectors &&
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
        })}
      <div>{data.label ?? data.name}</div>
    </NodeBox>
  );
};

export default memo(BlockViewFunction);
