export interface LocationType {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
  locationSubTypes: LocationType[];
}
