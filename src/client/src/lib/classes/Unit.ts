import type { UnitLibCm } from "@mimirorg/typelibrary-types";
import CreateId from "lib/CreateId";
import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class Unit {
  @jsonMember(String)
  public id = "";

  @jsonMember(String)
  public type = "";

  @jsonMember(String)
  public name = "";

  @jsonMember(String)
  public symbol = "";

  public constructor(obj: UnitLibCm) {
    this.id = CreateId();
    this.type = obj.iri;
    this.name = obj.name;
    this.symbol = obj.symbol;
  }
}
