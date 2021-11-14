export const UPDATE_BLOCK_ELEMENTS = "UPDATE_BLOCK_ELEMENTS";

export interface UpdateBlockElements {
  type: typeof UPDATE_BLOCK_ELEMENTS;
  payload: {
    elements: any[];
  };
}
