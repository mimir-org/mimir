import { INSPECTOR_ELEMENT_CHANGED_COMPLETED } from "../inspector/inspectorReducer";

export function changeInspector(value: string, list) {
  if (list.length > 1) {
    const index = list.findIndex((x: { type: string }) => x.type === value);
    list[index].visible = !list[index].visible;

    list.forEach((fragment: { type: string; visible: boolean }) => {
      if (fragment.type !== value) {
        fragment.visible = false;
      }
    });
  }

  return {
    type: INSPECTOR_ELEMENT_CHANGED_COMPLETED,
    payload: list,
  };
}
