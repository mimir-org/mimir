import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NodetypesState } from './../../store/nodetypes/types';
import { getnodetypes } from './../../store/nodetypes/actions';
import { getTreeview } from './../../store/treeview/actions';
import { Node } from './../../store/treeview/types';
import { NodeTypeComponent } from './NodeTypeComponent';
import { RootState } from './../../store/index';

const NodeTypeOverview = () => {

    const dispatch = useDispatch();
    const state = useSelector<RootState>(state => state.nodetype) as NodetypesState;

    console.log(state);

    // export interface Node {
    //     id: string,
    //     name: string,
    //     nodes: Node[] 
    // }

    useEffect(() => {
        dispatch(getnodetypes());

        const node = {
            id: '1001',
            name: 'xxx',
            nodes: null
        } as Node;


        dispatch(getTreeview(node));
      }, [dispatch]);
    
    return (
    <React.Fragment>
        {state.nodetypes && state.nodetypes.map(item => {
            return <NodeTypeComponent key={item.id} id={item.id}  name={item.name} color={item.color} />
        })}
        </React.Fragment>)
}

export default NodeTypeOverview;
