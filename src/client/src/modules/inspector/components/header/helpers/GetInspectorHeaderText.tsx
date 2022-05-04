import { IsAspectNode } from "../../../../../helpers";
import { InspectorHeaderNodeInfo, InspectorHeaderNodeInfoText } from "../InspectorHeader.styled";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { Symbol } from "../../../../../compLibrary/symbol";

export const GetInspectorHeaderText = (element: InspectorElement) => {
  if (IsNode(element)) {
    return (
      <InspectorHeaderNodeInfo>
        {!IsAspectNode(element) && <Symbol base64={element?.symbol} text={element?.label ?? element?.name} />}
        <InspectorHeaderNodeInfoText>{element?.label ?? element?.name}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }

  if (IsEdge(element)) {
    return (
      <InspectorHeaderNodeInfo>
        <InspectorHeaderNodeInfoText>{element?.id}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }
};
