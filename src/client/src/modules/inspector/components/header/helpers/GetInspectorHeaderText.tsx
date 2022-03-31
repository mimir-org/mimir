import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetSelectedIcon } from "../../../../../typeEditor/helpers";
import { InspectorHeaderNodeInfo, InspectorHeaderNodeInfoText } from "../InspectorHeader.styled";
import { InspectorElement } from "../../../types";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";
import { Symbol } from "../../../../../compLibrary/symbol";
import { BlobData } from "../../../../../models";

export const GetInspectorHeaderText = (element: InspectorElement, icons: BlobData[]) => {
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

  if (IsCreateLibraryType(element)) {
    return (
      <InspectorHeaderNodeInfo>
        <Symbol base64={GetSelectedIcon(element, icons)?.data} text={element?.name} />
        <InspectorHeaderNodeInfoText>{element?.name}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }
};
