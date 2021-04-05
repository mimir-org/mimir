import { memo, FC } from 'react';
import { NodeProps, Handle, Position } from 'react-flow-renderer';
import { ProductIcon, FunctionIcon, LocationIcon } from '../../../assets';
import { Connector, CONNECTOR_TYPE } from '../../../models/project';

const icon = (icon: string) => {
  switch(icon) {
    case "FunctionIcon":
       return <img src={FunctionIcon} className='aspect-icon' alt={icon} draggable={false} />
    case "ProductIcon":
        return <img src={ProductIcon} className='aspect-icon' alt={icon} draggable={false} />
    case "LocationIcon":
        return <img src={LocationIcon} className='aspect-icon' alt={icon} draggable={false} />
    default:
        return <img src={FunctionIcon} className='aspect-icon' alt={icon} draggable={false} />
  }
}

const handleType = (connector: Connector) => {
    return connector.type === CONNECTOR_TYPE.RELATION_OUTPUT || connector.type === CONNECTOR_TYPE.TRANSPORT_OUTPUT ?
        "source" : "target";
}

const Aspect: FC<NodeProps> = ({data}) => {
   
  return (
      <>
        {data.connectors && data.connectors.map(connector => {
            return <Handle type={handleType(connector)} position={Position.Bottom} id={connector.id + '_' + data.id} key={connector.id + '_' + data.id} />
        })}
        
        {icon(data.icon)}
        <div>{data.label ?? data.name}</div>
      </>
    );
};

export default memo(Aspect);
