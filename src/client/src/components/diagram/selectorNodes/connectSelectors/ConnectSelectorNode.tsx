import { memo, FC } from "react";
import DataConnect from "./DataConnect";
import { NodeProps, Connection, Edge } from "react-flow-renderer";

const onConnect = (params: Connection | Edge) =>
  console.log("handle onConnect", params);

const ConnectSelectorNode: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <div className="connector-node" key={data.id}>
        {DataConnect(data, onConnect)}
        <div>{data.label}</div>
      </div>
    </>
  );
};

export default memo(ConnectSelectorNode);
