import { Aspect, ConnectorType, ObjectType, PredefinedAttribute, TerminalTypeItem } from "..";
import { CreateId } from "../../components/flow/helpers";

export const CREATE_LIBRARY_KIND: string = "CreateLibraryType";
export class CreateLibraryType {
  id: string;
  name: string;
  aspect: Aspect;
  objectType: ObjectType;
  purpose: string;
  semanticReference: string;
  rdsId: string;
  terminalTypes: TerminalTypeItem[];
  attributeTypes: string[];
  locationType: string;
  predefinedAttributes: PredefinedAttribute[];
  terminalTypeId: string;
  symbolId: string;
  simpleTypes: string[];

  kind: string = CREATE_LIBRARY_KIND;

  constructor(createLibraryType: CreateLibraryType) {
    Object.assign(this, createLibraryType);

    if (!this.attributeTypes) this.attributeTypes = [];
    if (!this.simpleTypes) this.simpleTypes = [];

    if (!this.terminalTypes) {
      const defaultTerminalTypeItem = {
        number: 1,
        terminalTypeId: this.terminalTypeId,
        connectorType: ConnectorType.Input,
      } as TerminalTypeItem;

      this.terminalTypes = [defaultTerminalTypeItem, { ...defaultTerminalTypeItem, connectorType: ConnectorType.Output }];
    }

    // Assign fake-ids to items for handling CRUD in redux store
    if (this.terminalTypes) {
      this.terminalTypes = this.terminalTypes.map(terminalTypeItem => ({...terminalTypeItem, terminalId: CreateId()}))
    }
  }
}