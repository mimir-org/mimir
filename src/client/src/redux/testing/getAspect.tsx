import FACET_CHANGED from "../testing/aspectReducer";

export function getAspect() {
  return {
    type: FACET_CHANGED,
    payload: {
      hasError: false,
      errorMsg: null,
      fetching: true,
      nodetypes: null,
    },
  };
}
