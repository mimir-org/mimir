import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { TreeHandleBox } from "./TreeHandleBox";
import { AspectColorType } from "../../../../../models";
import { AspectNodeBox } from "./AspectNode.styled";
import { GetAspectColor } from "assets";
import { Aspect, AspectObject, Connector, ViewType } from "lib";
import * as Icons from "assets/icons/aspects";

const AspectNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const SetTopPos = (position: Position) => {
    if (position === Position.Top) return "-20px";
    if (position === Position.Right || position === Position.Left) return "50%";
  };

  const GetFlowAspectIcon = (aspect: Aspect) => {
    let AspectIcon: string;
    if (aspect === Aspect.Function) AspectIcon = Icons.Function;
    if (aspect === Aspect.Product) AspectIcon = Icons.Product;
    if (aspect === Aspect.Location) AspectIcon = Icons.Location;
    return <img src={AspectIcon} className="aspect-icon" alt={Aspect[aspect]} draggable={false} />;
  };

  return (
    <AspectNodeBox colorMain={GetAspectColor(data, AspectColorType.Main)} selected={data.selected}>
      {data.connectors?.map((conn: Connector) => {
        const [type, pos] = conn.GetHandleType();

        return (
          <TreeHandleBox
            key={conn.id}
            visible={!data.hidden}
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
            />
          </TreeHandleBox>
        );
      })}

      <div>{GetFlowAspectIcon(data.aspect)}</div>
      {data.label ?? data.name}
    </AspectNodeBox>
  );
};

export default memo(AspectNode);
