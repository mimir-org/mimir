import { IsAspectNode } from "../../../../../helpers/Aspects";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../../../services";
import { Symbol } from "../../../../../compLibrary/symbol";
import { InspectorHeaderNodeInfo, InspectorHeaderNodeInfoText } from "../InspectorTabsComponent.styled";

export const EdgeHeaderText = (element: InspectorElement): string => {
  if (IsEdge(element)) {
    if (element == null) return "";

    if (element.transport != null) return element.transport.name;

    if (element.interface != null) return element.interface.name;
  }
  return "";
};

export const GetInspectorHeaderText = (element: InspectorElement) => {
  if (IsNode(element)) {
    return (
      <InspectorHeaderNodeInfo>
        {!IsAspectNode(element) && <Symbol source={element?.symbol} text={element?.label ?? element?.name} />}
        <InspectorHeaderNodeInfoText>{element?.label ?? element?.name}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }

  if (IsEdge(element)) {
    return (
      <InspectorHeaderNodeInfo>
        <InspectorHeaderNodeInfoText>{EdgeHeaderText(element)}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }
};
