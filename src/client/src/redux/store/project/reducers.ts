import * as Types from "./types";
import { Connector, Edge, Node, Simple } from "../../../models";
import { IsAspectNode } from "../../../helpers/Aspects";
import { IsFamily } from "../../../helpers/Family";
import {
  getEdgeInterfaceAttributeMap,
  getEdgeInterfaceTerminalAttributeMap,
  getEdgeTransportAttributeMap,
  getEdgeTransportTerminalAttributeMap,
  getNodeAttributeMap,
  getNodeConnectorAttributeMap,
  getNodeSimpleAttributeMap,
  GetUpdatedEdgeInnerWithTerminalAttributeValue,
  setLockEdge,
  setLockInterfaceAttribute,
  setLockInterfaceTerminalAttribute,
  setLockNode,
  setLockNodeAttribute,
  setLockNodeTerminalAttribute,
  setLockSimpleAttribute,
  setLockTransportAttribute,
  setLockTransportTerminalAttribute,
  TraverseTree,
} from "./helpers/";

const initialState: Types.ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  projectList: null,
  apiError: [],
};

// TODO: Refactor to reduce complexity
export function projectReducer(state = initialState, action: Types.ProjectActionTypes) {
  const project = state.project;
  const nodes = state.project?.nodes;
  const edges = state.project?.edges;

  switch (action.type) {
    case Types.SAVE_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.SAVE_PROJECT) : state.apiError,
      };

    case Types.COMMIT_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.COMMIT_PROJECT) : state.apiError,
      };

    case Types.COMMIT_PROJECT_SUCCESS_OR_ERROR:
    case Types.SAVE_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.SEARCH_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        projectList: null,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.SEARCH_PROJECT) : state.apiError,
      };

    case Types.SEARCH_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        projectList: action.payload.projectList ?? state.projectList,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.FETCHING_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_PROJECT) : state.apiError,
      };

    case Types.FETCHING_PROJECT_SUCCESS_OR_ERROR:
    case Types.CREATING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project ?? state.project,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.CREATING_PROJECT:
      return {
        ...state,
        fetching: false,
        creating: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.CREATING_PROJECT) : state.apiError,
      };

    case Types.DELETE_PROJECT_ERROR:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
      };

    case Types.EXPORT_PROJECT_TO_FILE:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.EXPORT_PROJECT_TO_FILE) : state.apiError,
      };

    case Types.IMPORT_PROJECT:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.IMPORT_PROJECT) : state.apiError,
      };

    case Types.EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR:
    case Types.IMPORT_PROJECT_SUCCESS_OR_ERROR:
    case Types.LOCK_ENTITY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.ADD_NODE:
      return { ...state, project: { ...project, nodes: [...nodes, action.payload] } };

    case Types.DELETE_NODE:
      return { ...state, project: { ...project, nodes: nodes.filter((n) => n.id !== action.payload) } };

    case Types.ADD_EDGE:
      return { ...state, project: { ...project, edges: [...edges, action.payload] } };

    case Types.DELETE_EDGE:
      return { ...state, project: { ...project, edges: edges.filter((e) => e?.id !== action.payload) } };

    case Types.UPDATE_POSITION: {
      const { nodeId, x: positionX, y: positionY } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, positionX, positionY } : n)) },
      };
    }

    case Types.UPDATE_BLOCK_POSITION: {
      const { nodeId, x: positionBlockX, y: positionBlockY } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, positionBlockX, positionBlockY } : n)) },
      };
    }

    case Types.UPDATE_BLOCK_SIZE: {
      const { nodeId } = action.payload;
      const { width, height } = action.payload.size;
      return { ...state, project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, width, height } : n)) } };
    }

    case Types.SET_EDGE_VISIBILITY: {
      const { edgeId, hidden } = action.payload;
      return { ...state, project: { ...project, edges: edges.map((e) => (e.id === edgeId ? { ...e, hidden } : e)) } };
    }

    case Types.SET_LOCATION_NODE_SIZE: {
      const { nodeId, key, value } = action.payload;
      return { ...state, project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, [key]: value } : x)) } };
    }

    case Types.SET_BLOCK_EDGE_VISIBILITY: {
      const { edgeId, blockHidden: hidden } = action.payload;
      return {
        ...state,
        project: { ...project, edges: edges.map((e) => (e.id === edgeId ? { ...e, blockHidden: hidden } : e)) },
      };
    }

    case Types.SET_NODE_VISIBILITY: {
      const { node } = action.payload;
      if (!node) return;

      const hidden = node.hidden === undefined ? true : !node.hidden;

      let isParent = false;
      const parentEdge = edges?.find((x) => x.fromNodeId === node.id);
      if (parentEdge) isParent = true;

      if (IsAspectNode(node)) {
        const isRelated = (e: Edge) => {
          return IsFamily(node, e.fromNode) || IsFamily(node, e.toNode) || e.fromNodeId === node.id;
        };

        return {
          ...state,
          project: {
            ...project,
            nodes: nodes.map((n) => (IsFamily(node, n) ? { ...n, hidden } : n)),
            edges: edges.map((e) => (isRelated(e) ? { ...e, hidden } : e)),
          },
        };
      }

      if (isParent) {
        const elements: (Node | Edge)[] = [];
        elements.push(node);

        TraverseTree(edges, nodes, node, elements);

        return {
          ...state,
          project: {
            ...project,
            nodes: nodes.map((n) => (elements.includes(n) ? { ...n, hidden } : n)),
            edges: edges.map((e) => (elements.includes(e) || e.toNode === node ? { ...e, hidden } : e)),
          },
        };
      }

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === node.id ? { ...n, hidden } : n)),
          edges: edges.map((e) => (e.fromNodeId === node.id || e.toNodeId === node.id ? { ...e, hidden } : e)),
        },
      };
    }

    case Types.SET_BLOCK_NODE_VISIBILITY: {
      const { node, blockHidden } = action.payload;
      if (!node) return;

      let isParent = false;
      const parentEdge = edges?.find((x) => x.fromNodeId === node.id);
      if (parentEdge) isParent = true;

      if (isParent) {
        const elements: (Node | Edge)[] = [];
        elements.push(node);

        TraverseTree(edges, nodes, node, elements);

        return {
          ...state,
          project: {
            ...project,
            nodes: nodes.map((n) => (elements.includes(n) ? { ...n, blockHidden } : n)),
            edges: edges.map((e) => (elements.includes(e) || e.toNode === node ? { ...e, blockHidden } : e)),
          },
        };
      }

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === node.id ? { ...n, blockHidden } : n)),
          edges: edges.map((e) => (e.fromNodeId === node.id || e.toNodeId === node.id ? { ...e, blockHidden } : e)),
        },
      };
    }

    case Types.SET_ACTIVE_NODE: {
      const { nodeId, selected } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === nodeId ? { ...n, selected } : { ...n, selected: false })),
          edges,
        },
      };
    }

    case Types.REMOVE_ACTIVE_NODE: {
      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => ({ ...n, selected: false })),
          edges,
        },
      };
    }

    case Types.SET_ACTIVE_EDGE: {
      const { edgeId, isActive: selected } = action.payload;

      return {
        ...state,
        project: { ...project, edges: edges?.map((e) => (e.id === edgeId ? { ...e, selected } : { ...e, selected: false })) },
      };
    }

    case Types.REMOVE_ACTIVE_EDGE: {
      return {
        ...state,
        project: { ...project, edges: edges?.map((e) => ({ ...e, selected: false })) },
      };
    }

    case Types.SET_ACTIVE_BLOCKNODE: {
      const blockId = action.payload.nodeId;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === blockId ? { ...n, blockSelected: true } : { ...n, blockSelected: false })),
          edges,
        },
      };
    }

    case Types.REMOVE_ACTIVE_BLOCKNODE: {
      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => ({ ...n, blockSelected: false })),
          edges,
        },
      };
    }

    case Types.CHANGE_SELECTED_PROJECT: {
      const projectId = action.payload.projectId;
      const projects = state.projectList;

      return {
        ...state,
        ...project,
        projectList: projects.map((p) => (p.id === projectId ? { ...p, selected: true } : { ...p, selected: false })),
      };
    }

    case Types.CHANGE_NODE_PROP_VALUE: {
      const { nodeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, [propName]: propValue } : x)) },
      };
    }

    case Types.CHANGE_NODE_ATTRIBUTE_VALUE: {
      const { id, nodeId, value, unitId: selectedUnitId } = action.payload;

      const getAttr = (n: Node) => {
        return n.attributes.map((attr) => (attr.id === id ? { ...attr, value, selectedUnitId } : attr));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, attributes: getAttr(n) } : n)) },
      };
    }

    case Types.CHANGE_TRANSPORT_PROP_VALUE: {
      const { edgeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) => (e.id === edgeId ? { ...e, transport: { ...e.transport, [propName]: propValue } } : e)),
        },
      };
    }

    case Types.CHANGE_TRANSPORT_ATTRIBUTE_VALUE: {
      const { id, edgeId, value, unitId: selectedUnitId } = action.payload;

      const getAttr = (e: Edge) => {
        return e.transport.attributes.map((a) => (a.id === id ? { ...a, value, selectedUnitId } : a));
      };

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) => (e.id === edgeId ? { ...e, transport: { ...e.transport, attributes: getAttr(e) } } : e)),
        },
      };
    }

    case Types.CHANGE_INTERFACE_PROP_VALUE: {
      const { edgeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) => (e.id === edgeId ? { ...e, interface: { ...e.interface, [propName]: propValue } } : e)),
        },
      };
    }

    case Types.CHANGE_INTERFACE_ATTRIBUTE_VALUE: {
      const { id, edgeId, unitId: selectedUnitId, value } = action.payload;

      const getAttr = (e: Edge) => {
        return e.transport.attributes.map((a) => (a.id === id ? { ...a, selectedUnitId, value } : a));
      };

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) => (e.id === edgeId ? { ...e, interface: { ...e.transport, attributes: getAttr(e) } } : e)),
        },
      };
    }

    case Types.CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, nodeId, value, unitId: selectedUnitId } = action.payload;

      const getAttr = (conn: Connector) => {
        return conn.attributes.map((attr) => (attr.id === id ? { ...attr, value, selectedUnitId } : attr));
      };

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === terminalId ? { ...conn, attributes: getAttr(conn) } : conn));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, connectors: getConnectors(n) } : n)) },
      };
    }

    case Types.CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, edgeId, value, unitId } = action.payload;

      const getTransport = (e: Edge) => {
        return GetUpdatedEdgeInnerWithTerminalAttributeValue(e.transport, terminalId, id, value, unitId);
      };

      return {
        ...state,
        project: { ...project, edges: edges.map((e) => (e.id === edgeId ? { ...e, transport: getTransport(e) } : e)) },
      };
    }

    case Types.CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, edgeId, value, unitId } = action.payload;

      const getInterface = (e: Edge) => {
        return GetUpdatedEdgeInnerWithTerminalAttributeValue(e.interface, terminalId, id, value, unitId);
      };

      return {
        ...state,
        project: { ...project, edges: edges.map((e) => (e.id === edgeId ? { ...e, interface: getInterface(e) } : e)) },
      };
    }

    case Types.CHANGE_SIMPLE_ATTRIBUTE_VALUE: {
      const { id, simpleId, nodeId, value, unitId: selectedUnitId } = action.payload;

      const getAttr = (s: Simple) => {
        return s.attributes.map((a) => (a.id === id ? { ...a, value, selectedUnitId } : a));
      };

      const getSimples = (n: Node) => {
        return n.simples.map((s) => (s.id === simpleId ? { ...s, attributes: getAttr(s) } : s));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, simples: getSimples(n) } : n)) },
      };
    }

    case Types.CHANGE_ACTIVE_CONNECTOR: {
      const { nodeId, connectorId, connectorVisibility } = action.payload;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, connectorVisibility } : conn));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n)) },
      };
    }

    case Types.SET_LOCK_NODE: {
      return setLockNode(action.payload, state);
    }

    case Types.SET_LOCK_NODES: {
      const nodeLocks = action.payload;

      let modifiedState = { ...state };

      nodeLocks.forEach((nodeLock) => {
        modifiedState = setLockNode(nodeLock, modifiedState);
      });

      return modifiedState;
    }

    case Types.SET_LOCK_EDGE: {
      return setLockEdge(action.payload, state);
    }

    case Types.SET_LOCK_EDGES: {
      const edgeLocks = action.payload;

      let modifiedState = { ...state };

      edgeLocks.forEach((edgeLock) => {
        modifiedState = setLockEdge(edgeLock, modifiedState);
      });

      return modifiedState;
    }

    case Types.SET_LOCK_ATTRIBUTE: {
      const { id } = action.payload;

      const nodeAttributeMapTarget = getNodeAttributeMap(state.project.nodes)[id];
      if (nodeAttributeMapTarget) {
        return setLockNodeAttribute({ ...nodeAttributeMapTarget, ...action.payload }, state);
      }

      const nodeConnectorAttributeMapTarget = getNodeConnectorAttributeMap(state.project.nodes)[id];
      if (nodeConnectorAttributeMapTarget) {
        return setLockNodeTerminalAttribute({ ...nodeConnectorAttributeMapTarget, ...action.payload }, state);
      }

      const nodeSimpleAttributeMapTarget = getNodeSimpleAttributeMap(state.project.nodes)[id];
      if (nodeSimpleAttributeMapTarget) {
        return setLockSimpleAttribute({ ...nodeSimpleAttributeMapTarget, ...action.payload }, state);
      }

      const edgeTransportAttributeMapTarget = getEdgeTransportAttributeMap(state.project.edges)[id];
      if (edgeTransportAttributeMapTarget) {
        return setLockTransportAttribute({ ...edgeTransportAttributeMapTarget, ...action.payload }, state);
      }

      const edgeTransportTerminalAttributeMapTarget = getEdgeTransportTerminalAttributeMap(state.project.edges)[id];
      if (edgeTransportTerminalAttributeMapTarget) {
        return setLockTransportTerminalAttribute({ ...edgeTransportTerminalAttributeMapTarget, ...action.payload }, state);
      }

      const edgeInterfaceAttributeMapTarget = getEdgeInterfaceAttributeMap(state.project.edges)[id];
      if (edgeInterfaceAttributeMapTarget) {
        return setLockInterfaceAttribute({ ...edgeInterfaceAttributeMapTarget, ...action.payload }, state);
      }

      const edgeInterfaceTerminalAttributeMapTarget = getEdgeInterfaceTerminalAttributeMap(state.project.edges)[id];
      if (edgeInterfaceTerminalAttributeMapTarget) {
        return setLockInterfaceTerminalAttribute({ ...edgeInterfaceTerminalAttributeMapTarget, ...action.payload }, state);
      }

      return { ...state };
    }

    case Types.SET_LOCK_ATTRIBUTES: {
      const attributeLocks = action.payload;

      const nodeAttributeMap = getNodeAttributeMap(state.project.nodes);
      const nodeConnectorAttributeMap = getNodeConnectorAttributeMap(state.project.nodes);
      const nodeSimpleAttributeMap = getNodeSimpleAttributeMap(state.project.nodes);
      const edgeTransportAttributeMap = getEdgeTransportAttributeMap(state.project.edges);
      const edgeTransportTerminalAttributeMap = getEdgeTransportTerminalAttributeMap(state.project.edges);
      const edgeInterfaceAttributeMap = getEdgeInterfaceAttributeMap(state.project.edges);
      const edgeInterfaceTerminalAttributeMap = getEdgeInterfaceTerminalAttributeMap(state.project.edges);

      let modifiedState = { ...state };

      attributeLocks.forEach((attributeLock) => {
        const nodeAttributeMapTarget = nodeAttributeMap[attributeLock.id];
        if (nodeAttributeMapTarget) {
          modifiedState = setLockNodeAttribute({ ...nodeAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const nodeConnectorAttributeMapTarget = nodeConnectorAttributeMap[attributeLock.id];
        if (nodeConnectorAttributeMapTarget) {
          modifiedState = setLockNodeTerminalAttribute({ ...nodeConnectorAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const nodeSimpleAttributeMapTarget = nodeSimpleAttributeMap[attributeLock.id];
        if (nodeSimpleAttributeMapTarget) {
          modifiedState = setLockSimpleAttribute({ ...nodeSimpleAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeTransportAttributeMapTarget = edgeTransportAttributeMap[attributeLock.id];
        if (edgeTransportAttributeMapTarget) {
          modifiedState = setLockTransportAttribute({ ...edgeTransportAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeTransportTerminalAttributeMapTarget = edgeTransportTerminalAttributeMap[attributeLock.id];
        if (edgeTransportTerminalAttributeMapTarget) {
          modifiedState = setLockTransportTerminalAttribute(
            { ...edgeTransportTerminalAttributeMapTarget, ...attributeLock },
            modifiedState
          );
        }

        const edgeInterfaceAttributeMapTarget = edgeInterfaceAttributeMap[attributeLock.id];
        if (edgeInterfaceAttributeMapTarget) {
          modifiedState = setLockInterfaceAttribute({ ...edgeInterfaceAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeInterfaceTerminalAttributeMapTarget = edgeInterfaceTerminalAttributeMap[attributeLock.id];
        if (edgeInterfaceTerminalAttributeMapTarget) {
          modifiedState = setLockInterfaceTerminalAttribute(
            { ...edgeInterfaceTerminalAttributeMapTarget, ...attributeLock },
            modifiedState
          );
        }
      });

      return modifiedState;
    }

    case Types.CHANGE_NODE_UPDATED: {
      const { nodeId, updated, userName: updatedBy } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, updated, updatedBy } : x)) },
      };
    }

    case Types.UPDATE_NODE:
      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === action.payload.id ? { ...action.payload, selected: n.selected, blockSelected: n.blockSelected } : n
          ),
        },
      };

    case Types.UPDATE_EDGE: {
      const { id } = action.payload;

      return {
        ...state,
        project: { ...project, edges: edges.map((e) => (e.id === id ? { ...action.payload, selected: e.selected } : e)) },
      };
    }

    case Types.SET_OFFPAGE_STATUS: {
      const { nodeId, connectorId, isRequired } = action.payload;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, isRequired } : conn));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n)) },
      };
    }

    case Types.CREATE_REQUIRED_OFFPAGE_NODE: {
      const { nodeId, connectorId, isRequired } = action.payload;
      const { offPageNode, transportEdge, partOfEdge } = action.payload.offPageObject;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, isRequired } : conn));
      };

      const nodesWithRequiredStatus = nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n));

      return {
        ...state,
        project: { ...project, nodes: [...nodesWithRequiredStatus, offPageNode], edges: [...edges, transportEdge, partOfEdge] },
      };
    }

    case Types.CREATE_CONNECTED_OFFPAGE_NODE: {
      const { offPageNode, transportEdge, partOfEdge } = action.payload.offPageObject;

      return {
        ...state,
        project: { ...project, nodes: [...nodes, offPageNode], edges: [...edges, partOfEdge, transportEdge] },
      };
    }

    default:
      return state;
  }
}
