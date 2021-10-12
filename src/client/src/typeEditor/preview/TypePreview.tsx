import { BlobData, CreateLibraryType, Rds, TerminalType } from "../../models";
import { ListType } from "../TypeEditorList";
import { ObjectBlock } from "./ObjectBlock";
import { ListLabel, ListWrapper } from "../../compLibrary";
import { PreviewArea, InfoWrapper } from "../styled";
import { IsTransportOrInterface } from "./helpers";
import { TransportIcon, InterfaceIcon } from "../../assets/icons/type";
import {
  IsFunction,
  IsLocation,
  IsProduct,
  IsObjectBlock,
  IsTransport,
  IsInterface,
  GetListLabel,
  GetWidth,
} from "../helpers";
interface Props {
  createLibraryType: CreateLibraryType;
  rds: Rds;
  inputTerminals?: TerminalType[];
  outputTerminals?: TerminalType[];
  terminal?: TerminalType;
  symbol: BlobData;
}
/**
 * Component to show Preview area with selected object type, type name, rds and symbol
 * @param param0
 * @returns the visual type preview area
 */
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

  return (
    <ListWrapper wide={GetWidth(ListType.Preview)} height={150} right={0}>
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
