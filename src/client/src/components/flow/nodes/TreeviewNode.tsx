import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetHandleType } from "../helpers";
import { HandlerWrapper } from "../styled";
import { RELATION_TYPE } from "../../../models/project";

const TreeviewNode: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);

  const connectorIsVisible = (connector) => {
    if (connector.relationType === RELATION_TYPE.PartOf && isHover)
      return "true";
    return "false";
  };

  const mouseNodeLeave = () => {
    setTimeout(() => {
      setIsHover(false);
    }, 5 * 1000);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
    >
      {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = GetHandleType(connector);

          return (
            <HandlerWrapper
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              key={connector.id}
              display={connectorIsVisible(connector)}
              position={positionHandler}
            >
              <Handle
                type={typeHandler}
                position={positionHandler}
                id={connector.id}
                key={connector.id}
                className="function-treeview-handler"
              />
            </HandlerWrapper>
          );
        })}
      <div>{data.label ?? data.name}</div>
    </div>
  );
};

export default memo(TreeviewNode);
