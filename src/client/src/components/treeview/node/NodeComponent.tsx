import React, { FC, useEffect, useState } from 'react';
import { Type } from '../../../models/workspace';
import './node.scss';

import ExpandedNode from '../../../assets/expanded-nodecircle.png';
import UnexpandedNode from '../../../assets/unexpanded-nodecircle.png';
import Functionbox from '../../../assets/functionbox.png';
import PlattForm from '../../../assets/plattform.svg';

const NodeComponent : FC<Type>  = ({ type }: Type) => {

    const [isExpanded, setExpanded] = useState(false);

    return (
        <div className='NodeComponent' onClick={() => setExpanded(!isExpanded)}>
            {/* expand node? */}
            <img className='expand' src={isExpanded ? ExpandedNode : UnexpandedNode} alt='node-icon'/>
            {/* root eller function eller connector */}
            <div className='h-line'></div>
        </div>
    )
} 

export default NodeComponent;