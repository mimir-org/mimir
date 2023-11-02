interface BlockLibCm {
  id: number;
  name: string;
  email: string;

  Id: string;
  Name: string;
  Iri: string;
  TypeReference: string;
  Version: string;
  FirstVersionId: string;
  Created: Date;
  CreatedBy: string;
  CompanyId: number;
  CompanyName: string;
  State: State;
  Aspect: Aspect;
  PurposeName: string;
  RdsId: string;
  RdsCode: string;
  RdsName: string;
  Symbol: string;
  Description: string;
  BlockTerminals: ICollection<BlockTerminalLibCm>;
  Attributes: ICollection<AttributeLibCm>;
  SelectedAttributePredefined: ICollection<SelectedAttributePredefinedLibCm>;
  // string Kind => nameof(BlockLibCm);
}
