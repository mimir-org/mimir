import { INSPECTOR_ELEMENT_CHANGED_COMPLETED } from "../inspector/reducers";

export function changeInspector(index: number, tabs) {
  if (tabs.length > 1) {
    tabs.forEach((element: { visible: boolean }) => {
      element.visible = false;
    });
    tabs[index].visible = true;
  }

  return {
    type: INSPECTOR_ELEMENT_CHANGED_COMPLETED,
    payload: tabs,
  };
}
