import React, { memo, FC } from "react";

import {
  Handle,
  Position,
  NodeProps,
  Connection,
  Edge,
} from "react-flow-renderer";

const onConnect = (params: Connection | Edge) =>  console.log("handle onConnect", params);

const ConnectSelectorNode: FC<NodeProps> = ({ data }) => {

    return (
    <>
        <div className='connector-node' key={data.id}>            
            {data.connectors && data.connectors.length > 0 && data.connectors.map(connector => {
                
                const position = connector.type === "source" ? Position.Right : Position.Left;

                return (
                    <Handle type={connector.type} position={position} className={connector.type} id={connector.id} key={connector.id} onConnect={onConnect}>
                        <label>{connector.label}</label>
                    </Handle>
                )
                
            }
            )}
            
            <div>{data.label}</div>
        </div>        
    </>
  );
};

export default memo(ConnectSelectorNode);
