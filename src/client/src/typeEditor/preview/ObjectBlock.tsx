import { BlobData, CreateLibraryType, TerminalType } from "../../models";
import { GetBlockColor, GetBlockHeight } from "./helpers";
import { PreviewObjectBlock, InfoWrapper, InputOutputTerminals, Terminals } from "../styled";
import { ConnectorIcon } from "../../assets/icons/connectors";
import { Symbol } from "../../compLibrary/symbol";
import { IsTransport } from "../helpers";

interface Props {
  createLibraryType: CreateLibraryType;
  rdsLabel: string;
  inputTerminals: TerminalType[];
  outputTerminals: TerminalType[];
  symbol: BlobData;
}
/**
 * Component to show an object block with input output terminals
 * @param param0
 * @returns the visual block in Type Preview Info
 */
export const ObjectBlock = ({ createLibraryType, rdsLabel, inputTerminals, outputTerminals, symbol }: Props) => {
  const aspect = createLibraryType?.aspect;
  const inputCount = inputTerminals?.length;
  const outputCount = outputTerminals?.length;

  const showTerminals = (input: boolean): any[] => {
    let terminalsArray = [];
    const inputOutputArray = input ? inputTerminals : outputTerminals;
    inputOutputArray?.forEach((t, index) => {
      terminalsArray.push(
        <span key={index}>
          <ConnectorIcon style={{ fill: t.color }} />
        </span>
      );
    });
    return terminalsArray;
  };

  return (
    <PreviewObjectBlock blockHeight={GetBlockHeight(inputCount, outputCount)} blockColor={GetBlockColor(aspect)}>
      <InputOutputTerminals>
        {inputTerminals && <Terminals input={true}>{showTerminals(true)}</Terminals>}
        {outputTerminals && <Terminals input={false}>{showTerminals(false)}</Terminals>}
      </InputOutputTerminals>
      <InfoWrapper namepadding={IsTransport(createLibraryType?.objectType)}>
        <p>{rdsLabel}</p>
        <p>{createLibraryType.name}</p>
        {symbol && <Symbol base64={symbol.data} text={symbol.name} />}
      </InfoWrapper>
    </PreviewObjectBlock>
  );
};

export default ObjectBlock;
