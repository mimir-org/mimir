import { CreateLibraryType, Rds, TerminalType } from "../../models";
import { ListType } from "../TypeEditorList";
import { ObjectBlock } from "./ObjectBlock";
import { ListLabel, ListWrapper } from "../../compLibrary";
import { PreviewArea, InfoWrapper } from "../styled";
import { TransportIcon, InterfaceIcon } from "../../assets/icons/type";
import { IsFunction, IsLocation, IsProduct, IsObjectBlock, IsTransport, IsInterface, GetListLabel } from "../helpers";
import { IsTransportOrInterface } from "./helpers";

interface Props {
  createLibraryType: CreateLibraryType;
  rds: Rds;
  inputTerminals?: TerminalType[];
  outputTerminals?: TerminalType[];
  terminal?: TerminalType;
}

export const TypePreview = ({ createLibraryType, rds, terminal, inputTerminals, outputTerminals }: Props) => {
  const showObjectBlock = () => {
    if (
      (IsLocation(createLibraryType?.aspect) && createLibraryType?.locationType !== "") ||
      (IsFunction(createLibraryType?.aspect) && IsObjectBlock(createLibraryType?.objectType)) ||
      IsProduct(createLibraryType?.aspect)
    ) {
      return (
        <ObjectBlock
          createLibraryType={createLibraryType}
          rdsName={rds?.name}
          inputTerminals={inputTerminals}
          outputTerminals={outputTerminals}
        />
      );
    }
    return null;
  };

  return (
    <ListWrapper height={150} right={0}>
      <ListLabel preview={true}>{GetListLabel(ListType.Preview, createLibraryType)}</ListLabel>
      <PreviewArea>
        {showObjectBlock()}
        {IsTransportOrInterface(createLibraryType) && (
          <InfoWrapper>
            <p>{rds?.name}</p>
            <p>{createLibraryType?.name}</p>
          </InfoWrapper>
        )}
        {IsFunction(createLibraryType?.aspect) && IsTransport(createLibraryType?.objectType) && (
          <TransportIcon style={{ fill: terminal?.color }}></TransportIcon>
        )}
        {IsFunction(createLibraryType?.aspect) && IsInterface(createLibraryType?.objectType) && (
          <InterfaceIcon style={{ stroke: terminal?.color, fill: terminal?.color }}></InterfaceIcon>
        )}
      </PreviewArea>
    </ListWrapper>
  );
};

export default TypePreview;
