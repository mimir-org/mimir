<<<<<<< HEAD
import { INSPECTOR_ELEMENT_CHANGED_COMPLETED } from "../reducers/inspectorReducer";
=======
import { INSPECTOR_ELEMENT_CHANGED_COMPLETED } from "../reducer/inspectorReducer";
>>>>>>> 0c73d83 (Add flow elements)

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
