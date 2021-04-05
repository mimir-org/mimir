import { memo, FC } from 'react';
import { NodeProps, Handle, Position } from 'react-flow-renderer';

const Product: FC<NodeProps> = ({data}) => {
    
  return (
      <>
        <Handle type="target" position={Position.Top} id={'t1_' + data.id} key={'t1_' + data.id} />
        <Handle type="source" position={Position.Bottom} id={'s1_' + data.id} key={'s1_' + data.id} />
        <Handle type="source" position={Position.Right} id={'s2_' + data.id} key={'s2_' + data.id} />        
        <Handle type="target" position={Position.Left} id={'t2_' + data.id} key={'t2_' + data.id} />        
        <div>{data.label ?? data.name}</div>
      </>
    );
};

export default memo(Product);
