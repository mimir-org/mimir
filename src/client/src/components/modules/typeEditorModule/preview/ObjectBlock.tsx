import { CreateLibraryType, TerminalType } from "../../../../models";
import { GetBlockColor, GetBlockHeight, GetBlockPaddingTop } from "./helpers";
import { TypeEditorTerminalIcon } from "../../../../assets/icons/common";
import {
  PreviewObjectBlock,
  InfoWrapper,
  InputOutputTerminals,
  Terminals,
} from "../styled";
interface Props {
  createLibraryType: CreateLibraryType;
  rdsName: string;
  inputTerminals: TerminalType[];
  outputTerminals: TerminalType[];
}
/**
 * Component to show an object block with input output terminals
 * @param param0
 * @returns the visual block in Type Preview Info
 */
export const ObjectBlock = ({
  createLibraryType,
  rdsName,
  inputTerminals,
  outputTerminals,
}: Props) => {
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
    <PreviewObjectBlock
      blockColor={GetBlockColor(aspect)}
      blockHeight={GetBlockHeight(aspect)}
    >
      {/* {console.log("terminals to show", createLibraryType.terminalTypes)}
      {console.log("inputTerminals", inputTerminals)}
      {console.log("outputTerminals", outputTerminals)} */}
      <InputOutputTerminals>
        {inputTerminals && (
          <Terminals input={true}>{showTerminals(true)}</Terminals>
        )}
        {outputTerminals && (
          <Terminals input={false}>{showTerminals(false)}</Terminals>
        )}
      </InputOutputTerminals>
      <InfoWrapper blockPaddingTop={GetBlockPaddingTop(aspect)}>
        <p>{rdsName}</p>
        <p>{createLibraryType.name}</p>
      </InfoWrapper>
    </PreviewObjectBlock>
  );
};

export default ObjectBlock;
