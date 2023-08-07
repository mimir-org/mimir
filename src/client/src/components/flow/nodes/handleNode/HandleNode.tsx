import { FC, memo } from "react";
import { Handle as FlowHandle, NodeProps, Position } from "react-flow-renderer";
import { HandleNodeBox } from "./HandleNode.styled";
import { Handle } from "lib";

const HandleNode: FC<NodeProps<Handle>> = ({ data }) => {
  return (
    <HandleNodeBox
      colorMain={data.aspectColor.mainColor}
      colorSelected={data.aspectColor.selectedColor}
      selected={data.selected}
      hidden={data.hidden}
    >
      <FlowHandle
        type={"target"}
        position={Position.Left}
        id={data.inptutConnector}
        isValidConnection={() => true}
        isConnectable={false}
      />
      <FlowHandle
        type={"source"}
        position={Position.Right}
        id={data.outputConnector}
        isValidConnection={() => true}
        isConnectable={false}
      />
    </HandleNodeBox>
  );
};

export default memo(HandleNode);
