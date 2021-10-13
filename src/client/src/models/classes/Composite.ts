import { Attribute } from "..";

export const COMPOSITE_KIND: string = "Composite";

class Composite {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  nodeId: string;

  kind: string = COMPOSITE_KIND;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Composite;
