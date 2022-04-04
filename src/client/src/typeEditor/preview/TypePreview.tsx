import { BlobData, CreateLibraryType, Rds, TerminalType } from "../../models";
import { ObjectBlock } from "./ObjectBlock";
import { InfoText, InfoWrapper, ListLabel, ListWrapper, PreviewArea } from "../styled";
import { IsTransportOrInterface } from "./helpers";
import { InterfaceIcon, TransportIcon } from "../../assets/icons/type";
import { IsFunction, IsInterface, IsLocation, IsObjectBlock, IsProduct, IsTransport } from "../helpers";
import { TypeEditorTextResources } from "../assets/TypeEditorTextResources";

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
 * @param params
 * @returns the visual type preview area
 */
export const TypePreview = ({ createLibraryType, rds, terminal, inputTerminals, outputTerminals, symbol }: Props) => {
  const aspect = createLibraryType?.aspect;
  const objectType = createLibraryType?.objectType;
  const rdsLabel = rds ? rds.id + " - " + rds.name : null;

  const showObjectBlock = () => {
    if (
      (IsLocation(aspect) && createLibraryType?.locationType !== "") ||
      ((IsFunction(aspect) || IsProduct(aspect)) && IsObjectBlock(objectType))
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
    <ListWrapper flex={1.5}>
      <ListLabel preview>{TypeEditorTextResources.NEW_TYPE_PREVIEW}</ListLabel>
      <PreviewArea>
        {showObjectBlock()}
        {IsTransportOrInterface(createLibraryType) && (
          <InfoWrapper>
            <InfoText>{rdsLabel}</InfoText>
            <InfoText>{createLibraryType?.name}</InfoText>
            {(IsFunction(aspect) || IsProduct(aspect)) && IsTransport(objectType) && (
              <TransportIcon style={{ stroke: terminal?.color, fill: terminal?.color }} />
            )}
            {(IsFunction(aspect) || IsProduct(aspect)) && IsInterface(objectType) && (
              <InterfaceIcon style={{ stroke: terminal?.color, fill: terminal?.color }} />
            )}
          </InfoWrapper>
        )}
      </PreviewArea>
    </ListWrapper>
  );
};

export default TypePreview;
