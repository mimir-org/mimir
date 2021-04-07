import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetAspectIcon } from "../helpers/";
import { AspectWrapper } from "../styled/";
import { processType } from "../utils";

const Aspect: FC<NodeProps> = ({ data }) => {
  const nodes: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );

  let node: any = true;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === data.id) {
      node = nodes[i];
    }
  }
  const isVisible = node.isVisible;

  return (
    <AspectWrapper visible={isVisible}>
      {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = processType(connector);
          return (
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
            />
          );
        })}

      {GetAspectIcon(data.icon)}
      <div>{data.label ?? data.name}</div>
    </AspectWrapper>
  );
};

export default memo(Aspect);
