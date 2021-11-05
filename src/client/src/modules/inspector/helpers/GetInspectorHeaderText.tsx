import { IsAspectNode } from "../../../helpers";
import { GetSelectedIcon } from "../../../typeEditor/helpers";
import { NodeInfo } from "../styled";
import { InspectorElement } from "../types";
import { IsNode, IsEdge, IsCreateLibraryType } from "./IsType";
import { Symbol } from "../../../compLibrary/symbol";
import { BlobData } from "../../../models";

export const GetInspectorHeaderText = (element: InspectorElement, icons: BlobData[]) => {
  if (IsNode(element)) {
    return (
      <NodeInfo>
        <div className="symbol">
          {!IsAspectNode(element) && <Symbol base64={element?.symbol} text={element?.label ?? element?.name} />}
        </div>
        <div className="text">{element?.label ?? element?.name}</div>
      </NodeInfo>
    );
  }

  if (IsEdge(element)) {
    return (
      <NodeInfo>
        <div className="edgetext">{element?.id}</div>
      </NodeInfo>
    );
  }

  if (IsCreateLibraryType(element)) {
    return (
      <NodeInfo>
        <div className="symbol">{<Symbol base64={GetSelectedIcon(element, icons)?.data} text={element?.name} />}</div>
        <div className="text">{element?.name}</div>
      </NodeInfo>
    );
  }
};
