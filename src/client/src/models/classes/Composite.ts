import { Attribute } from "..";

export const COMPOSITE_KIND: string = "Composite";

class Composite {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  nodeId: string;

  kind: string = COMPOSITE_KIND;

  constructor(composite: Composite) {
    Object.assign(this, composite);
  }
}

export default Composite;
