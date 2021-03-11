import { memo, FC } from "react";
import InputConnect from "./InputConnect";
import OutputConnect from "./OutputConnect";
import { NodeProps, Connection, Edge } from "react-flow-renderer";

const onConnect = (params: Connection | Edge) =>
  console.log("handle onConnect", params);

const DefaultSelectorNode: FC<NodeProps> = ({ data }) => {
  const inputConnectors = data.connectors
    ? data.connectors.filter((connector) => connector.type === "target")
    : [];
  const outputConnectors = data.connectors
    ? data.connectors.filter((connector) => connector.type === "source")
    : [];

  return (
    <>
      <div className="default-node" key={data.id}>
        {InputConnect(inputConnectors, onConnect)}
        <div>{data.label}</div>
        {OutputConnect(outputConnectors)}
      </div>
    </>
  );
};

export default memo(DefaultSelectorNode);
