import { InspectorElement } from "../../../types";
import { Symbol } from "compLibrary/symbol";
import { InspectorHeaderNodeInfo, InspectorHeaderNodeInfoText } from "../InspectorTabsComponent.styled";
import { Block, Connection } from "lib";

export const GetInspectorHeaderText = (element: InspectorElement) => {
  if (element instanceof Block) {
    return (
      <InspectorHeaderNodeInfo>
        {!element.isRoot() && <Symbol source={element?.symbol} text={element?.label ?? element?.name} />}
        <InspectorHeaderNodeInfoText>{element?.label ?? element?.name}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }

  if (element instanceof Connection) {
    return (
      <InspectorHeaderNodeInfo>
        <InspectorHeaderNodeInfoText>{""}</InspectorHeaderNodeInfoText>
      </InspectorHeaderNodeInfo>
    );
  }
};
