import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NodetypesState } from './../../store/nodetypes/types';
import { getnodetypes } from './../../store/nodetypes/actions';
import { NodeTypeComponent } from './NodeTypeComponent';
import { RootState } from './../../store/index';

const NodeTypeOverview = () => {

    const dispatch = useDispatch();
    const state = useSelector<RootState>(state => state.nodetype) as NodetypesState;

    useEffect(() => {
        dispatch(getnodetypes());
      }, [dispatch]);
    
    return (
    <React.Fragment>
        {state.nodetypes && state.nodetypes.map(item => {
            return <NodeTypeComponent key={item.id} id={item.id}  name={item.name} color={item.color} />
        })}
        </React.Fragment>)
}

export default NodeTypeOverview;
