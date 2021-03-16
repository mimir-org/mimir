import { FACET_CHANGED_COMPLETED } from "../testing/aspectReducer";

export function getAspect() {
  return {
    type: FACET_CHANGED_COMPLETED,
    payload: {
      hasError: false,
      errorMsg: null,
      fetching: false,
      nodetypes: null,
    },
  };
}
