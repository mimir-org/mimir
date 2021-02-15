import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WorkspaceComponent } from '..';
import { getWorkspace } from '../../store/workspace/actions';
import { WorkspaceState } from '../../store/workspace/types';
import { RootState } from './../../store/index';


const Home = () => {

    const workspaceState = useSelector<RootState>(state => state.workspace) as WorkspaceState;
    const dispatch = useDispatch();

    return(
        <React.Fragment>
            <button onClick={() => dispatch(getWorkspace({ id: 1, name: 'jsv', nodes: [] }))}>Hent workspace</button>
            {workspaceState && workspaceState.workspace && !workspaceState.fetching &&
                <WorkspaceComponent id={workspaceState.workspace.id} name={workspaceState.workspace.name} nodes={workspaceState.workspace.nodes} />
            }
        </React.Fragment>
    );
}

export default Home;