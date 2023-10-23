/* eslint-disable @typescript-eslint/no-explicit-any */
import {Theme, toast} from "@mimirorg/component-library";
import {BlockLibCm, TerminalLibCm} from "@mimirorg/typelibrary-types";
import {DialogType, ErrorException, Handle, InfoException, Position, Project, ViewType} from "lib";
import {MutableRefObject} from "react";
import {Connection as FlowConnection, Edge} from "react-flow-renderer";
import {Dispatch} from "redux";
import {setDialogType, setViewType} from "store/reducers/commonReducer";
import {saveProject, updateProject} from "store/reducers/projectReducer";

export const updateFlowNodesAndEdgesFromState = (
  flowRef: MutableRefObject<any>,
  project: Project,
  viewType: ViewType,
  theme: Theme
) => {
  if (flowRef?.current != null && project != null) {
    switch (viewType) {
      case ViewType.Tree:
      case ViewType.Block:
        flowRef.current.updateNodesAndEdges(project.toFlow(viewType, theme));
        break;
      default:
        flowRef.current.updateNodesAndEdges([[], []]);
        break;
    }
  }
};

export const createNewProject = (domain: string, name: string, userName: string, description: string, dispatch: Dispatch) => {
  if (domain == null || name == null || userName == null)
    throw new Error("Can't create new project. Domain, name or username is null or undefined.");
  const project = new Project(name, userName, description);
  dispatch(updateProject({ project }));
  dispatch(setViewType({ view: ViewType.Tree }));
  dispatch(setDialogType({ dialog: DialogType.None }));
};

export const saveProjectToDb = (project: Project, dispatch: Dispatch, saved: number) => {
  if(project === null) {
    throw new Error("Can`t save project. Project is not created");
  }
  dispatch(saveProject({project}));
  if(saved === 0) {
    dispatch(setDialogType({dialog: DialogType.None}));
  }
};

export const onNodePositionChange = (
  id: string,
  x: number,
  y: number,
  viewType: ViewType,
  project: Project,
  dispatch: Dispatch
) => {
  if (id == null || project == null)
    throw new Error("Can't handle node position change. Node id or project is null or undefined.");
  project.updateAspectObjectPosition(id, new Position(x, y), viewType);
  dispatch(updateProject({ project }));
};

export const onNodeDrop = (
  type: BlockLibCm,
  posX: number,
  posY: number,
  project: Project,
  viewType: ViewType,
  dispatch: Dispatch
) => {
  if (type == null || project == null) throw new Error("Can't handle aspect object drop. Type or project is null or undefined.");
  project.addAspectObject(type, new Position(posX, posY), new Position(10, 10), "reidar.liabo@bouvet.no", viewType);
  dispatch(updateProject({ project }));
};

export const onNodeDelete = (id: string, project: Project, dispatch: Dispatch) => {
  if (id == null || project == null) throw new Error("Can't handle node delete. Node id or project is null or undefined.");
  project.deleteAspectObject(id);
  dispatch(updateProject({ project }));
};

export const onNodesDelete = (ids: string[], project: Project, dispatch: Dispatch) => {
  if (ids == null || project == null) throw new Error("Can't handle node delete. Node id or project is null or undefined.");
  ids.forEach((x) => project.deleteAspectObject(x));
  dispatch(updateProject({ project }));
};

export const onNodeSelect = (id: string, select: boolean, project: Project, viewType: ViewType, dispatch: Dispatch) => {
  if (id == null || project == null) throw new Error("Can't handle node select. Node id or project is null or undefined.");
  project.updateAspectObjectSelected(id, select, viewType);
  dispatch(updateProject({ project }));
};

export const onEdgeDelete = (id: string, project: Project, dispatch: Dispatch) => {
  if (id == null || project == null) throw new Error("Can't handle edge delete. Edge id or project is null or undefined.");
  project.deleteConnection(id);
  dispatch(updateProject({ project }));
};

export const onEdgesDelete = (ids: string[], project: Project, dispatch: Dispatch) => {
  if (ids == null || project == null) throw new Error("Can't handle edge delete. Edge id or project is null or undefined.");
  ids.forEach((x) => project.deleteConnection(x));
  dispatch(updateProject({ project }));
};

export const onEdgeConnect = (edge: FlowConnection | Edge, project: Project, dispatch: Dispatch) => {
  if (edge == null || project == null) throw new Error("Can't handle edge connect. Edge data or project is null or undefined.");
  const connection = project.convertFromFlowEdge(edge, null);
  if (connection == null) return;
  project.connections.push(connection);
  dispatch(updateProject({ project }));
};

export const onEdgeSelect = (id: string, select: boolean, project: Project, dispatch: Dispatch) => {
  if (id == null || project == null) throw new Error("Can't handle edge select. Edge id or project is null or undefined.");
  project.updateConnectionSelected(id, select);
  dispatch(updateProject({ project }));
};

export const onAddHandle = (
  connection: string,
  positionTree: Position,
  positionBlock: Position,
  project: Project,
  dispatch: Dispatch
) => {
  const handle = new Handle(connection, positionTree, positionBlock);
  project.addHandle(handle);
  dispatch(updateProject({ project }));
};

export const onTerminalChecked = (
  project: Project,
  aspectObjectId: string,
  terminalId: string,
  selected: boolean,
  dispatch: Dispatch
) => {
  if (project == null || aspectObjectId == null || terminalId == null)
    throw new Error(
      "Can't handle change terminal check status. The project, aspectObjectId or terminal id is null or undefined."
    );

  project.updateConnectorSelected(aspectObjectId, terminalId, selected);
  dispatch(updateProject({ project }));
};

export const onTerminalAdd = (
  aspectObjectId: string,
  terminalTypes: TerminalLibCm[],
  aspectObjectTypes: BlockLibCm[],
  terminalId: string,
  project: Project,
  dispatch: Dispatch
) => {
  try {
    if (aspectObjectId == null || terminalTypes == null || terminalId == null)
      throw new Error("Can't handle add terminal. aspectObjectId, terminalTypes, terminalId or project is null or undefined.");

    project.createTerminal(aspectObjectId, terminalTypes, aspectObjectTypes, terminalId);
    dispatch(updateProject({ project }));
  } catch (e) {
    if (e instanceof InfoException) {
      toast(e.message);
    } else if (e instanceof ErrorException) {
      toast.error(e.message);
    } else {
      console.error(e);
    }
  }
};

export const onTerminalRemove = (
  aspectObjectId: string,
  terminalTypes: TerminalLibCm[],
  aspectObjectTypes: BlockLibCm[],
  terminalId: string,
  project: Project,
  dispatch: Dispatch
) => {
  try {
    if (aspectObjectId == null || terminalTypes == null || terminalId == null)
      throw new Error("Can't handle add terminal. aspectObjectId, terminalTypes, terminalId or project is null or undefined.");

    project.deleteTerminal(aspectObjectId, terminalTypes, aspectObjectTypes, terminalId);
    dispatch(updateProject({ project }));
  } catch (e) {
    if (e instanceof InfoException) {
      toast(e.message);
    } else if (e instanceof ErrorException) {
      toast.error(e.message);
    } else {
      console.error(e);
    }
  }
};
