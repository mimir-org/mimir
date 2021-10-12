import { BlobData, CreateLibraryType, TerminalType } from "../../../../models";
import { GetBlockColor, GetBlockPaddingTop } from "./helpers";
import { TypeEditorTerminalIcon } from "../../../../assets/icons/common";
import { PreviewObjectBlock, InfoWrapper, InputOutputTerminals, Terminals } from "../styled";
import { Symbol } from "../../../../compLibrary/symbol";
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
  const aspect = createLibraryType.aspect;

  const showTerminals = (input: boolean): any[] => {
    let terminalsArray = [];
    if (input) {
      inputTerminals?.forEach((t, index) => {
        terminalsArray.push(
          <span key={index}>
            <TypeEditorTerminalIcon style={{ fill: t.color }} />
          </span>
        );
      });
    } else {
      outputTerminals?.forEach((t, index) => {
        terminalsArray.push(
          <span key={index}>
            <TypeEditorTerminalIcon style={{ fill: t.color }} />
          </span>
        );
      });
    }
    return terminalsArray;
  };

  return (
    <PreviewObjectBlock blockColor={GetBlockColor(aspect)}>
      <InputOutputTerminals>
        {inputTerminals && <Terminals input={true}>{showTerminals(true)}</Terminals>}
        {outputTerminals && <Terminals input={false}>{showTerminals(false)}</Terminals>}
      </InputOutputTerminals>
      <InfoWrapper blockPaddingTop={GetBlockPaddingTop(aspect)}>
        <p>{rdsLabel}</p>
        <p>{createLibraryType.name}</p>
        <Symbol base64={symbol?.data} text={symbol?.name} />
      </InfoWrapper>
    </PreviewObjectBlock>
  );
};

export default ObjectBlock;
