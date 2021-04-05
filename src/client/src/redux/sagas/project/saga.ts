import { call, put } from 'redux-saga/effects';
import { FETCHING_PROJECT_SUCCESS_OR_ERROR, CREATING_PROJECT_SUCCESS_OR_ERROR, ProjectState } from '../../store/project/types';
import ProjectDataset from '../../../data/ProjectDataset';
import { Project, NODE_TYPE, NodeType, IconType, ICON_TYPE, ConnectorType, CONNECTOR_TYPE } from '../../../models/project';
import { createId } from '../../../components/flow/utils';

export function* getProject(action) {
    try {
        const data = yield call(ProjectDataset.get, action.id);
        const project = data as Project;

        const payload = {
            project: project,
            hasError: false,
            errorMsg: null,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    } catch (error) {

        const payload = {
            project: null,
            hasError: true,
            errorMsg: error,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    }
}

export function* createProject() {
    try {

    //     id: string,
    // name: string,
    // type: ConnectorType
        
        const project: Project =
        {
            id: createId(),
            name: "Noaka",
            description: "Noaka description",
            nodes: [
                { id: 'functionRoot', name:'Function', label: 'Function', type: NODE_TYPE.ASPECT as NodeType, position: { x: 150, y: 5}, connectors: [{ id: createId(), name: "", type: CONNECTOR_TYPE.RELATION_OUTPUT as ConnectorType}], icon: ICON_TYPE.FUNCTION_ICON as IconType},
                { id: 'productRoot', name:'Product', label: 'Product', type: NODE_TYPE.ASPECT as NodeType, position: { x: 350, y: 5}, connectors: [{ id: createId(), name: "", type: CONNECTOR_TYPE.RELATION_OUTPUT as ConnectorType}], icon: ICON_TYPE.PRODUCT_ICON as IconType},
                { id: 'locationRoot', name:'Location', label: 'Location', type: NODE_TYPE.ASPECT as NodeType, position: { x: 550, y: 5}, connectors: [{ id: createId(), name: "", type: CONNECTOR_TYPE.RELATION_OUTPUT as ConnectorType}], icon: ICON_TYPE.LOCATION_ICON as IconType}
            ],
            edges: [
                // { id: createId(), from: '123', to: '345', fromNode: 'functionRoot', toNode: '678' }
            ]
        };

        // export interface Edge {
        //     id: string,
        //     from: string,
        //     to: string,
        //     fromNode: string,
        //     toNode: string
        // }

        const payload = {
            project: project,
            hasError: false,
            errorMsg: null,
            fetching: false,
            creating: false
        };

        yield put({
            type: CREATING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    } catch (error) {

        const payload = {
            project: null,
            hasError: true,
            errorMsg: error,
            fetching: false,
            creating: false
        };

        yield put({
            type: CREATING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    }
}
