import { IsAspectNode } from "../../../../../helpers/Aspects";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { Symbol } from "../../../../../compLibrary/symbol";
import { InspectorHeaderNodeInfo, InspectorHeaderNodeInfoText } from "../InspectorTabsComponent.styled";

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
        <InspectorHeaderNodeInfoText>{element?.transport?.name ?? element?.id}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }
};
