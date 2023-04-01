import { TypeReferenceCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "components/flow/helpers";

export class TypeReference {
  id: string;
  name: string;
  iri: string;
  source: string;
  kind: string;

  public constructor(obj: TypeReferenceCm) {
    this.id = CreateId();
    this.name = obj.name;
    this.iri = obj.iri;
    this.source = obj.source;
  }
}
