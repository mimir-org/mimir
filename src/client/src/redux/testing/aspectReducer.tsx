export const FACET_CHANGED = "FACET_CHANGED";

const initialState = {
  value: "",
};

const testReducer = (state = initialState, action) => {
  console.log("Testing state and action:", state, action);
  switch (action.type) {
    case FACET_CHANGED:
      console.log("Testing state:", state);
      return {
        ...state,
        // value: state.value,
      };
    default:
      return state;
  }
};

export default testReducer;
