import React, { FC, useState } from 'react';
import './node.scss';

// import { NodeType } from '../../../store/treeview/types';

import UnexpandedNode from '../../../assets/unexpanded-nodecircle.png';
import Functionbox from '../../../assets/functionbox.png';
import PlattForm from '../../../assets/plattform.svg';

const NodeComponent  = () => {
    return (
        <div className='NodeComponent'>
            <img className='node' src={UnexpandedNode} alt='unexpanded-node-icon'/>
            <div className='h-line'></div>
            {/* { type === 'root' ? <><img src={PlattForm} alt='plattForm-icon'/> <p>{name}</p></> 
            : type === 'function' ? <><img src={Functionbox} alt='function-icon'/> <p>{name}</p></> 
            : type === 'children' ? <><div className="connection_line"></div> <p>{name}</p></> 
            : null } */}
        </div>
    )
} 

export default NodeComponent;