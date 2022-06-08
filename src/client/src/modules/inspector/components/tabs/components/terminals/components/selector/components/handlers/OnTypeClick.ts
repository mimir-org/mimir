import { ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { TerminalType } from "../../../../../../../../../../models";
import { FormatTypeId } from "../helpers/FormatTypeId";

export const OnTypeClick = (
  type: TerminalType,
  connectorType: ConnectorDirection,
  expanded: boolean,
  selectedTypesIds: string[],
  setSelectedTypesIds: (categoryIds: string[]) => void
) => {
  const typeId = FormatTypeId(type, connectorType);

  if (expanded) {
    setSelectedTypesIds(selectedTypesIds.filter((id) => id !== typeId));
  } else {
    setSelectedTypesIds([...selectedTypesIds, typeId]);
  }
};
