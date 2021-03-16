export const FACET_CHANGED = "Facet changed";
export const FACET_CHANGED_COMPLETED = "FACET_CHANGED_COMPLETED";

const initialState = {
  value: "",
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case FACET_CHANGED_COMPLETED:
      return {
        ...state,
        type: action.type,
      };
    default:
      return state;
  }
};

export const changeFacet = () => ({
  type: FACET_CHANGED,
});

export default testReducer;
