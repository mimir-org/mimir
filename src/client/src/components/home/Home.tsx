import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WorkspaceComponent, ToolboxComponent } from '..';
import { getWorkspace } from '../../store/workspace/actions';
import { WorkspaceState } from '../../store/workspace/types';
import { RootState } from './../../store/index';


const Home = () => {

    const workspaceState = useSelector<RootState>(state => state.workspace) as WorkspaceState;
    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getWorkspace({ id: 1, name: 'jsv', nodes: [] }));
      }, [dispatch]);

    return(
        <React.Fragment>
            <div>
                <ToolboxComponent />
            </div>

            <div>
                {workspaceState && workspaceState.workspace && !workspaceState.fetching &&
                    <WorkspaceComponent id={workspaceState.workspace.id} name={workspaceState.workspace.name} nodes={workspaceState.workspace.nodes} />
                }
            </div>
        </React.Fragment>
    );
}

export default Home;