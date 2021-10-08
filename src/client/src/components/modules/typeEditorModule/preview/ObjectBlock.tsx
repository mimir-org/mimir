import { CreateLibraryType, TerminalType } from "../../../../models";
import { GetBlockColor, GetBlockHeight, GetBlockPaddingTop } from "./helpers";
import { TypeEditorTerminalIcon } from "../../../../assets/icons/common";
import { PreviewObjectBlock, InfoWrapper, InputOutputTerminals, Terminals } from "../styled";

interface Props {
  createLibraryType: CreateLibraryType;
  rdsLabel: string;
  inputTerminals: TerminalType[];
  outputTerminals: TerminalType[];
}
/**
 * Component to show an object block with input output terminals
 * @param param0
 * @returns the visual block in Type Preview Info
 */
export const ObjectBlock = ({ createLibraryType, rdsLabel, inputTerminals, outputTerminals }: Props) => {
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
    <PreviewObjectBlock blockColor={GetBlockColor(aspect)} blockHeight={GetBlockHeight(aspect)}>
      <InputOutputTerminals>
        {inputTerminals && <Terminals input={true}>{showTerminals(true)}</Terminals>}
        {outputTerminals && <Terminals input={false}>{showTerminals(false)}</Terminals>}
      </InputOutputTerminals>
      <InfoWrapper blockPaddingTop={GetBlockPaddingTop(aspect)}>
        <p>{rdsLabel}</p>
        <p>{createLibraryType.name}</p>
      </InfoWrapper>
    </PreviewObjectBlock>
  );
};

export default ObjectBlock;
