export const LIBRARY_TOGGLE_CHANGED = "Library toggle changed";
export const LIBRARY_TOGGLE_CHANGED_COMPLETED =
  "LIBRARY_TOGGLE_CHANGED_COMPLETED";

const initialState = { visible: true };

const showLibraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIBRARY_TOGGLE_CHANGED_COMPLETED:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export const changeToggleInspector = () => ({
  type: LIBRARY_TOGGLE_CHANGED,
});

export default showLibraryReducer;
