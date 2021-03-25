import { INSPECTOR_ELEMENT_CHANGED_COMPLETED } from "../reducers/inspectorReducer";

export function changeInspector(index: number, list) {
  if (list.length > 1) {
    list.forEach((fragment: { visible: boolean }) => {
      fragment.visible = false;
    });
    list[index].visible = true;
  }

  return {
    type: INSPECTOR_ELEMENT_CHANGED_COMPLETED,
    payload: list,
  };
}
