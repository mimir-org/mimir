export const enum VisualFilterId {
  // PRIMARY
  ANIMATION = "A13381E3-A5FD-459E-B1A0-ADD9BF76874F",
  PARTOF = "2C37C098-5AB3-4BDC-A0F9-A4A1F3D6E522",
  FUNCTION = "151DBAD3-5CA5-43EE-8A80-BCB72AACD6B5",
  LOCATION = "B74421A1-EFB4-438D-A39E-6DBB9F533ECC",
  PRODUCT = "C302A250-6D3E-41F1-9A4B-7F9E7B02E5FB",
  RELATION = "AA78873E-0778-43E0-957B-FAB29178A1C3",
  HAS_LOCATION = "AC41FC9E-F020-4BD8-B671-7DEE132F4EE3",
  FULFILLED_BY = "0B42D490-49FE-4F01-8B13-6D2DEB3AE3A6",
  TRANSPORT = "B3D9A319-AC77-4D53-AEAD-62B09D793F84",
  INTERFACE = "5628EDBE-6391-4407-8C88-6474C79AE87C",
}

export interface VisualFilterData {
  filters: VisualFilterDataCategory[];
}

export interface VisualFilterDataCategory {
  id: string;
  name: string;
  checked: boolean;
  items: VisualFilterDataItem[];
}

export interface VisualFilterDataItem {
  id: string;
  name: string;
  checked: boolean;
}

export const defaultFilter: VisualFilterData = {
  filters: [
    { id: VisualFilterId.ANIMATION, name: "Animation", checked: false, items: [] },
    {
      id: VisualFilterId.PARTOF,
      name: "PartOf",
      checked: true,
      items: [
        { id: VisualFilterId.FUNCTION, name: "Function", checked: true },
        { id: VisualFilterId.LOCATION, name: "Location", checked: true },
        { id: VisualFilterId.PRODUCT, name: "Product", checked: true },
      ],
    },
    {
      id: VisualFilterId.RELATION,
      name: "Relations",
      checked: false,
      items: [
        { id: VisualFilterId.HAS_LOCATION, name: "Has Location", checked: false },
        { id: VisualFilterId.FULFILLED_BY, name: "Fulfilled By", checked: false },
      ],
    },
    { id: VisualFilterId.TRANSPORT, name: "Transports", checked: false, items: [] },
    { id: VisualFilterId.INTERFACE, name: "Interfaces", checked: false, items: [] },
  ],
};
