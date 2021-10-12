import { BlobData, CreateLibraryType, Rds, TerminalType } from "../../../../models";
import { ListType } from "../TypeEditorList";
import { ObjectBlock } from "./ObjectBlock";
import { ListLabel, ListWrapper } from "../../../../compLibrary";
import { PreviewArea, InfoWrapper } from "../styled";
import {
  IsFunction,
  IsLocation,
  IsProduct,
  IsObjectBlock,
  IsTransport,
  IsInterface,
  GetListLabel,
  GetWidth,
} from "..//helpers";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transport.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interface.svg";

interface Props {
  createLibraryType: CreateLibraryType;
  rds: Rds;
  inputTerminals?: TerminalType[];
  outputTerminals?: TerminalType[];
  terminal?: TerminalType;
  symbol: BlobData;
}

export const TypePreview = ({ createLibraryType, rds, terminal, inputTerminals, outputTerminals, symbol }: Props) => {
  const rdsLabel = rds ? rds.code + " - " + rds.name : null;
  const showObjectBlock = () => {
    if (
      (IsLocation(createLibraryType?.aspect) && createLibraryType?.locationType !== "") ||
      (IsFunction(createLibraryType?.aspect) && IsObjectBlock(createLibraryType?.objectType)) ||
      IsProduct(createLibraryType?.aspect)
    ) {
      return (
        <ObjectBlock
          createLibraryType={createLibraryType}
          rdsLabel={rdsLabel}
          inputTerminals={inputTerminals}
          outputTerminals={outputTerminals}
          symbol={symbol}
        />
      );
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunction(createLibraryType?.aspect)) {
      return IsTransport(createLibraryType?.objectType) || IsInterface(createLibraryType?.objectType);
    }
    return false;
  };
  return (
    <ListWrapper wide={GetWidth(ListType.Preview)} height={150} right={0}>
      <ListLabel>{GetListLabel(ListType.Preview, createLibraryType)}</ListLabel>
      <PreviewArea>
        {showObjectBlock()}
        {transportOrInterface() && (
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
