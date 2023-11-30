/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edge as FlowEdge } from "react-flow-renderer";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { Handle } from "./Handle";
import { Block, CreateId, ViewType } from "lib";
import { ConnectorDirection } from "@mimirorg/typelibrary-types";
import { Theme } from "@mimirorg/component-library";
import { AspectColor } from "./AspectColor";

/**
 * Abstract Connection class.
 * This is the parent class for all connection types.
 */
@jsonObject
export abstract class Connection {
  // Domain members
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public fromConnector: string;

  @jsonMember(String)
  public toConnector: string;

  @jsonMember(String)
  public project: string;

  @jsonMember(String)
  public mainProject: string;

  @jsonArrayMember(Handle)
  public handles: Array<Handle>;

  // Client members
  public selected: boolean;
  public hidden: boolean;
  public bidirectional: boolean;
  public aspectColor: AspectColor;

  /**
   * Constructor.
   * @params fromConnector Connection from connector id.
   * @params toConnector Connection to connector id.
   * @params project Current project id.
   * @params mainProject The originally project owner id.
   */
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    this.id = CreateId();
    this.fromConnector = fromConnector;
    this.toConnector = toConnector;
    this.project = project;
    this.mainProject = mainProject != null ? mainProject : project;
    this.handles = [];
    this.selected = false;
    this.hidden = false;
    this.aspectColor = null;
    this.bidirectional = false;
  }

  public getComponentType(viewType: ViewType, isHandle: boolean): string | null {
    const name = viewType === ViewType.Block ? "Block" : "Tree";
    if (isHandle) return name + this.constructor["name"] + "Handle";

    return name + this.constructor["name"];
  }

  /**
   * Add a new handle to the connection
   * @param handle The handle that should be added
   */
  public addHandle(handle: Handle) {
    if (handle == null) throw Error("Can't add a null or undefined handle object.");
    this.handles.push(handle);
  }

  public abstract toFlowEdge(viewType: ViewType, source: Block, target: Block, theme: Theme): FlowEdge<Connection>[];
}

@jsonObject
export class ConnectionTerminal extends Connection {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }

  public toFlowEdge(viewType: ViewType, source: Block, target: Block, theme: Theme): FlowEdge<Connection>[] {
    const fromConnector = source.getTerminal(this.fromConnector);
    this.aspectColor = new AspectColor();
    this.aspectColor.resolveColors(theme, source.aspect);
    this.aspectColor.resolveFromToColors(theme, source.aspect, target.aspect);
    this.aspectColor.terminalColor = fromConnector.color;
    this.bidirectional = fromConnector.direction === ConnectorDirection.Bidirectional;

    // TODO: This need visual filter settings if default should be changed
    this.hidden = viewType === ViewType.Tree ? true : false;

    const flowEdges: FlowEdge[] = [];

    if (this.handles != null && this.handles.length > 0) {
      this.handles = this.handles.sort((a, b) => (a.positionBlock.posX > b.positionBlock.posX ? 1 : -1));
      let fn = source.id;
      let fc = this.fromConnector;

      this.handles.forEach((x, index) => {
        const edge: FlowEdge<Connection> = {
          id: CreateId() + "#" + this.id,
          type: this.getComponentType(viewType, true),
          source: fn,
          target: x.id,
          sourceHandle: fc,
          targetHandle: x.inptutConnector,
          animated: false,
          label: "",
          data: this,
          hidden: this.hidden,
          selected: this.selected,
        };
        flowEdges.push(edge);
        fn = x.id;
        fc = x.outputConnector;
        if (index === this.handles.length - 1) {
          const lastEdge: FlowEdge<Connection> = {
            id: CreateId() + "#" + this.id,
            type: this.getComponentType(viewType, false),
            source: fn,
            target: target.id,
            sourceHandle: fc,
            targetHandle: this.toConnector,
            animated: false,
            label: "",
            data: this,
            hidden: this.hidden,
            selected: this.selected,
          };
          flowEdges.push(lastEdge);
        }
      });
    } else {
      const edge: FlowEdge<Connection> = {
        id: this.id,
        type: this.getComponentType(viewType, false),
        source: source.id,
        target: target.id,
        sourceHandle: this.fromConnector,
        targetHandle: this.toConnector,
        animated: false,
        label: "",
        data: this,
        hidden: this.hidden,
        selected: this.selected,
      };
      flowEdges.push(edge);
    }

    return flowEdges;
  }
}

@jsonObject
export abstract class ConnectionRelation extends Connection {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

@jsonObject
export class ConnectionFulfilledBy extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }

  public toFlowEdge(viewType: ViewType, source: Block, target: Block, theme: Theme): FlowEdge<Connection>[] {
    this.aspectColor = new AspectColor();
    this.aspectColor.resolveColors(theme, source.aspect);
    this.aspectColor.resolveFromToColors(theme, source.aspect, target.aspect);
    this.aspectColor.terminalColor = null;
    this.bidirectional = false;

    // TODO: This need visual filter settings if default should be changed
    this.hidden = viewType === ViewType.Tree ? false : true;
    const flowEdges: FlowEdge[] = [];

    const edge: FlowEdge<Connection> = {
      id: this.id,
      type: this.getComponentType(viewType, false),
      source: source.id,
      target: target.id,
      sourceHandle: this.fromConnector,
      targetHandle: this.toConnector,
      animated: false,
      label: "",
      data: this,
      hidden: this.hidden,
      selected: this.selected,
    };
    flowEdges.push(edge);

    return flowEdges;
  }
}

@jsonObject
export class ConnectionHasLocation extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }

  public toFlowEdge(viewType: ViewType, source: Block, target: Block, theme: Theme): FlowEdge<Connection>[] {
    this.aspectColor = new AspectColor();
    this.aspectColor.resolveColors(theme, source.aspect);
    this.aspectColor.resolveFromToColors(theme, source.aspect, target.aspect);
    this.aspectColor.terminalColor = null;
    this.bidirectional = false;

    // TODO: This need visual filter settings if default should be changed
    this.hidden = viewType === ViewType.Tree ? false : true;

    const flowEdges: FlowEdge[] = [];

    const edge: FlowEdge<Connection> = {
      id: this.id,
      type: this.getComponentType(viewType, false),
      source: source.id,
      target: target.id,
      sourceHandle: this.fromConnector,
      targetHandle: this.toConnector,
      animated: false,
      label: "",
      data: this,
      hidden: this.hidden,
      selected: this.selected,
    };
    flowEdges.push(edge);

    return flowEdges;
  }
}

@jsonObject
export class ConnectionPartOf extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }

  public toFlowEdge(viewType: ViewType, source: Block, target: Block, theme: Theme): FlowEdge<Connection>[] {
    this.aspectColor = new AspectColor();
    this.aspectColor.resolveColors(theme, source.aspect);
    this.aspectColor.resolveFromToColors(theme, source.aspect, target.aspect);
    this.aspectColor.terminalColor = null;
    this.bidirectional = false;

    // TODO: This need visual filter settings if default should be changed
    this.hidden = viewType === ViewType.Tree ? false : true;

    const flowEdges: FlowEdge[] = [];

    const edge: FlowEdge<Connection> = {
      id: this.id,
      type: this.getComponentType(viewType, false),
      source: source.id,
      target: target.id,
      sourceHandle: this.fromConnector,
      targetHandle: this.toConnector,
      animated: false,
      label: "",
      data: this,
      hidden: this.hidden,
      selected: this.selected,
    };
    flowEdges.push(edge);

    return flowEdges;
  }
}
