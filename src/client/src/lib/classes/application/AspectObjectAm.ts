import { Aspect } from "../../enums/Aspect";
import { AspectObject } from "../AspectObject";

export class AspectObjectAm {
  id: string;
  aspect: Aspect;

  public constructor(obj: AspectObject) {
    this.id = obj.id;
    this.aspect = obj.aspect;
  }
}
