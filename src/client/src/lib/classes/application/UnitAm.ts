import { Unit } from "../Unit";

export class UnitAm {
  id: string;
  name: string;
  description: string;
  semanticReference: string;

  public constructor(obj: Unit) {
    this.id = obj.id;
    this.name = obj.name;
  }
}
