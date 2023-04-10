/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateId } from "components/flow/helpers";
import { jsonObject, jsonMember } from "typedjson";
import { Position } from "./Position";
import { Connection } from "./Connection";

@jsonObject
export class Handle {
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public connection: string;

  @jsonMember(Position)
  public positionTree: Position;

  @jsonMember(Position)
  public positionBlock: Position;

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
  }
}
