import { Datum, Unit } from ".";

export class Attribute {
  id: string;
  name: string;
  value: string;
  attributeType: string;
  isLocked: boolean;
  IsLockedStatusBy: string;
  IsLockedStatusDate: Date;
  selectedUnit: string;
  datums: Datum[];
  units: Unit[];
  terminal: string;
  aspectObject: string;
}
