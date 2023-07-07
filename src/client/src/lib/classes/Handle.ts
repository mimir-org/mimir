/* eslint-disable @typescript-eslint/no-unused-vars */
import { jsonObject, jsonMember } from "typedjson";
import { Position } from "./Position";
import CreateId from "lib/CreateId";
import { ViewType } from "../enums/ViewType";
import { Theme } from "@mimirorg/component-library";
import { Node as FlowNode, XYPosition } from "react-flow-renderer";
import { AspectColor } from "./AspectColor";

@jsonObject
export class Handle {
  // Domain members
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public connection: string;

  @jsonMember(Position)
  public positionTree: Position;

  @jsonMember(Position)
  public positionBlock: Position;

  // Client members
  public selected: boolean;
  public aspectColor: AspectColor;
  public hidden: boolean;
  public inptutConnector: string;
  public outputConnector: string;

  /**
   * Constructor.
   * @params connection The id of the connection owner.
   * @params positionTree The x,y position or coordinate in tree view.
   * @params positionBlock The x,y position or coordinate in block view.
   */
  public constructor(connection: string, positionTree: Position, positionBlock: Position) {
    this.id = CreateId();
    this.connection = connection;
    this.positionTree = positionTree;
    this.positionBlock = positionBlock;
    this.selected = false;
    this.hidden = false;
    this.inptutConnector = CreateId();
    this.outputConnector = CreateId();
  }

  /** Convert a handle to a flow node
   *  @params ViewType There are two diffenrent views in Mimir "Home" | "Tree" | "Block"
   *  @params theme Current theme
   */
  public toFlowNode(viewType: ViewType, theme: Theme): FlowNode<Handle> {
    const position: XYPosition = {
      x: viewType === ViewType.Block ? this.positionBlock.posX : this.positionTree.posX,
      y: viewType === ViewType.Block ? this.positionBlock.posY : this.positionTree.posY,
    };

    this.aspectColor = new AspectColor();
    this.aspectColor.mainColor = theme.color.secondary.container.base;
    this.aspectColor.selectedColor = theme.color.secondary.container.on;

    const node: FlowNode = {
      id: this.id,
      type: this.getComponentType(viewType),
      data: this,
      position: position,
      hidden: false, // Opacity is controlled by the styled component
      selected: this.selected,
      draggable: true,
      selectable: true,
      connectable: true,
    };
    return node;
  }

  private getComponentType(viewType: ViewType): string | null {
    const viewTypeName = viewType === ViewType.Block ? "Block" : "Tree";
    return viewTypeName + "Handle";
  }
}
