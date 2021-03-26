import { memo, FC } from "react";
import { NodeProps, Handle, Position } from "react-flow-renderer";
import { ReactComponent as FunctionIcon } from '../../../assets/icons/function-icon.svg'
import { ReactComponent as LocationIcon } from '../../../assets/icons/location-icon.svg'
import { ReactComponent as ProductIcon } from '../../../assets/icons/product-icon.svg'

const icon = (label: string) => {
  switch(label) {
    case "Function":
       return <FunctionIcon />
    case "Product":
       return <ProductIcon />
    case "Location":
       return <LocationIcon />
    default:
       return <FunctionIcon />
  }
}

const AspectNode: FC<NodeProps> = ({data}) => {

  return (
      <>
        <Handle type="source" position={Position.Bottom} id="23" key="23" />
        {icon(data.label)}
        <div>{data.label}</div>
      </>
    );
};

export default memo(AspectNode);
