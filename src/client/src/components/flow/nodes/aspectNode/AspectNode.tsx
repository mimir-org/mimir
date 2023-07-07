import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { TreeHandleBox } from "./TreeHandleBox";
import { AspectNodeBox } from "./AspectNode.styled";
import { Aspect, AspectObject, Connector, ViewType } from "lib";
import { FunctionIcon, LocationIcon, ProductIcon } from "@mimirorg/component-library";

const AspectNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const SetTopPos = (position: Position) => {
    if (position === Position.Top) return "-20px";
    if (position === Position.Right || position === Position.Left) return "50%";
  };

  return (
    <AspectNodeBox colorMain={data.aspectColor.mainColor} selected={data.selected}>
      {data.connectors?.map((conn: Connector) => {
        const [type, pos] = conn.GetHandleType();

        return (
          <TreeHandleBox
            key={conn.id}
            hidden={data.hidden}
            position={pos}
            topPos={SetTopPos(pos)}
            isFunctionAspect={data.aspect === Aspect.Function}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              key={conn.id}
              className={conn.getClassName(data.aspect, ViewType.Tree)}
              hidden={data.hidden}
            />
          </TreeHandleBox>
        );
      })}
      {data.aspect === Aspect.Function && (
        <div>
          <FunctionIcon width={"22px"} height={"18px"} />
        </div>
      )}

      {data.aspect === Aspect.Product && (
        <div>
          <ProductIcon width={"22px"} height={"18px"} />
        </div>
      )}

      {data.aspect === Aspect.Location && (
        <div>
          <LocationIcon width={"22px"} height={"18px"} />
        </div>
      )}

      {data.label ?? data.name}
    </AspectNodeBox>
  );
};

export default memo(AspectNode);
