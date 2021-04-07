import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetFlowAspectIcon } from "../helpers/";
import { AspectFlowWrapper } from "../styled/";
import { processType } from "../utils";

const Aspect: FC<NodeProps> = ({ data }) => {
  const nodes: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );

  const node = nodes.find((node) => node.id === data.id);
  const isVisible = node.isVisible;

  return (
    <AspectFlowWrapper visible={isVisible}>
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

      {GetFlowAspectIcon(data.icon)}
      <div>{data.label ?? data.name}</div>
    </AspectFlowWrapper>
  );
};

export default memo(Aspect);
