import React, { memo, FC } from "react";

import {
  Handle,
  Position,
  NodeProps,
  Connection,
  Edge,
} from "react-flow-renderer";

const onConnect = (params: Connection | Edge) =>
  console.log("handle onConnect", params);

const DefaultSelectorNode: FC<NodeProps> = ({ data }) => {
  const inputConnectors = data.connectors
    ? data.connectors.filter((connector) => connector.type === "target")
    : [];
  const outputConnectors = data.connectors
    ? data.connectors.filter((connector) => connector.type === "source")
    : [];
  let inputTop = -5;
  let outputTop = -5;

  return (
    <>
      <div className="default-node" key={data.id}>
        {inputConnectors &&
          inputConnectors.length > 0 &&
          inputConnectors.map((connector) => {
            inputTop += 15;
            return (
              <Handle
                type="target"
                position={Position.Left}
                style={{ top: inputTop, bottom: "auto" }}
                id={connector.id}
                key={connector.id}
                onConnect={onConnect}
              >
                <label>{connector.label}</label>
              </Handle>
            );
          })}

        <div>{data.label}</div>

        {outputConnectors &&
          outputConnectors.length > 0 &&
          outputConnectors.map((connector) => {
            outputTop += 15;
            return (
              <Handle
                type="source"
                position={Position.Right}
                style={{ top: outputTop, bottom: "auto" }}
                id={connector.id}
                key={connector.id}
              >
                <label>{connector.label}</label>
              </Handle>
            );
          })}
      </div>
    </>
  );
};

export default memo(DefaultSelectorNode);
