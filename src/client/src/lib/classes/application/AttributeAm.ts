import { Attribute } from "../Attribute";

export class AttributeAm {
  id: string;
  name: string;
  value: string;

  public constructor(obj: Attribute) {
    this.id = obj.id;
    this.name = obj.name;
    this.value = obj.value;
  }
}
