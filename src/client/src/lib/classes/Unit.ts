import { UnitLibCm } from "@mimirorg/typelibrary-types";
import CreateId from "../../components/flow/helpers/CreateId";
import { UnitAm } from ".";

export class Unit {
  id: string;
  type: string;
  name: string;
  symbol: string;

  public constructor(obj: UnitLibCm) {
    this.id = CreateId();
    this.type = obj.iri;
    this.name = obj.name;
    this.symbol = obj.symbol;
  }

  public toAm(): UnitAm {
    return new UnitAm(this);
  }
}
