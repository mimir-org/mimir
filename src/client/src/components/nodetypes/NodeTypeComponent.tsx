import React from 'react';
import { Nodetype } from '../../store/nodetypes/types';

export const NodeTypeComponent: React.FC<Nodetype> = ({id, name, color} : Nodetype) => {

    return (
        <div className='node-type' draggable={true} onDragStart={ e => e.dataTransfer.setData("node_type", JSON.stringify({id, name, color})) } onDragEnd={e => e.preventDefault()} >{name}</div>
    );
}