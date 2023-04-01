import { AttributeLibCm } from "@mimirorg/typelibrary-types";
import { Qualifier, Unit } from ".";
import { AttributeAm } from "./application/AttributeAm";
import CreateId from "../../components/flow/helpers/CreateId";

export class Attribute {
  public id: string;
  public name: string;
  public value: string | null;
  public attributeType: string;
  public unitSelected: string | null;
  public units: Unit[];
  public qualifiers: Qualifier[] | null;

  public connectorTerminal: string | null;
  public aspectObject: string | null;

  public isLocked: boolean;
  public isLockedStatusBy: string | null;
  public isLockedStatusDate: Date | null;

  public constructor(lib: AttributeLibCm, aspectObject?: string, connectorTerminal?: string) {
    this.id = CreateId();
    this.name = lib.name;
    this.value = null;
    this.attributeType = lib.iri;
    this.unitSelected = lib.units?.find((x) => x.isDefault)?.iri;
    this.units = lib.units?.map((x) => new Unit(x));
    this.connectorTerminal = connectorTerminal == null ? null : connectorTerminal;
    this.aspectObject = aspectObject == null ? null : aspectObject;
    this.isLocked = false;
    this.isLockedStatusBy = null;
    this.isLockedStatusDate = null;
    // TODO: We need to construct qualifiers
  }

  // public constructor(obj: AttributeLibCm, terminal: string, aspectObject: string) {

  // }

  public toAm(): AttributeAm {
    return new AttributeAm(this);
  }
}
