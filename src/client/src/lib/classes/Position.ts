/* eslint-disable @typescript-eslint/no-unused-vars */
import { jsonObject, jsonMember } from "typedjson";

@jsonObject
export class Position {
  @jsonMember(Number)
  public posX: number;

  @jsonMember(Number)
  public posY: number;

  /**
   * Constructor.
   * @params posX The x position or coordinate.
   * @params posY The y position or coordinate.
   */
  public constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }
}
