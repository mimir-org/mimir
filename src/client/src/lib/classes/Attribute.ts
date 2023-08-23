/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AttributeLibCm } from "@mimirorg/typelibrary-types";
import { Qualifier } from "./Qualifier";
import { Unit } from "./Unit";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import CreateId from "lib/CreateId";

@jsonObject
export class Attribute {
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public name: string;

  @jsonMember(String)
  public value: string | null;

  @jsonMember(String)
  public attributeType: string;

  @jsonMember(String)
  public unitSelected: string | null;

  @jsonArrayMember(Unit)
  public units: Unit[] | null;

  @jsonArrayMember(Qualifier)
  public qualifiers: Qualifier[] | null;

  @jsonMember(String)
  public connectorTerminal: string | null;

  @jsonMember(String)
  public aspectObject: string | null;

  public isLocked: boolean;
  public isLockedStatusBy: string | null;
  public isLockedStatusDate: Date | null;

  public constructor(lib: AttributeLibCm, aspectObject?: string, connectorTerminal?: string) {
    this.id = CreateId();
    this.name = lib?.name;
    this.value = null;
    this.attributeType = lib?.iri;
    this.unitSelected = lib?.attributeUnits?.find((x) => x.isDefault)?.unit?.id ?? null;
    this.units = lib?.attributeUnits?.map((x) => new Unit(x.unit)) ?? [];
    this.connectorTerminal = connectorTerminal == null ? null : connectorTerminal;
    this.aspectObject = aspectObject == null ? null : aspectObject;
    this.isLocked = false;
    this.isLockedStatusBy = null;
    this.isLockedStatusDate = null;
    // TODO: We need to construct qualifiers
    this.qualifiers = [];
  }

  public getUnitsAsLabelValue = () => {
    return this.units.map((unit) => {
      return {
        label: unit.name,
        value: unit.id,
        id: unit.id,
      };
    });
  };
}
