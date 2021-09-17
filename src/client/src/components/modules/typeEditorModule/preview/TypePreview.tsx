import { CreateLibraryType, Rds, TerminalType } from "../../../../models";
import { ListType } from "../TypeEditorList";
import { ObjectBlock } from "./ObjectBlock";
import { ListLabel, ListWrapper } from "../../../../compLibrary";
import { PreviewArea, InfoWrapper } from "../styled";
import {
  IsLocation,
  IsFunction,
  IsObjectBlock,
  IsTransport,
  IsInterface,
  GetListLabel,
} from "..//helpers";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transport.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interface.svg";
import { TextResources } from "../../../../assets/text";
interface Props {
  createLibraryType: CreateLibraryType;
  rds: Rds;
  terminal: TerminalType;
}

export const TypePreview = ({ createLibraryType, rds, terminal }: Props) => {
  const showObjectBlock = () => {
    if (
      (IsLocation(createLibraryType?.aspect) &&
        createLibraryType?.locationType !== "") ||
      (IsFunction(createLibraryType?.aspect) &&
        IsObjectBlock(createLibraryType?.objectType))
    ) {
      return (
        <ObjectBlock
          createLibraryType={createLibraryType}
          rdsName={rds?.name}
        />
      );
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunction(createLibraryType?.aspect)) {
      return (
        IsTransport(createLibraryType?.objectType) ||
        IsInterface(createLibraryType?.objectType)
      );
    }
    return false;
  };
  return (
    <ListWrapper>
      <ListLabel> {GetListLabel(ListType.Preview)}</ListLabel>
      <PreviewArea>
        {showObjectBlock()}
        {transportOrInterface() && (
          <InfoWrapper>
            <p>{rds?.name}</p>
            <p>{createLibraryType?.name}</p>
          </InfoWrapper>
        )}
        {IsFunction(createLibraryType?.aspect) &&
          IsTransport(createLibraryType?.objectType) && (
            <TransportIcon style={{ fill: terminal.color }}></TransportIcon>
          )}
        {IsFunction(createLibraryType?.aspect) &&
          IsInterface(createLibraryType?.objectType) && (
            <InterfaceIcon
              style={{ stroke: terminal.color, fill: terminal.color }}
            ></InterfaceIcon>
          )}
      </PreviewArea>
      <p className="text">{TextResources.TypeEditor_Preview_Info}</p>
    </ListWrapper>
  );
};

export default TypePreview;
