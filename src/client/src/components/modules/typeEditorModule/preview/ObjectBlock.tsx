import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import {
  GetBlockColor,
  GetBlockHeight,
  GetBlockPaddingTop,
  GetSymbol,
} from "./helpers";
import { ModeNew } from "../helpers";
import { ObjectTypeBlock, InfoWrapper } from "../styled";
import { Symbol } from "../../../../compLibrary/dropdown";
// import { ReactComponent as TerminalIcon } from "../../../../assets/icons/common/terminalIcon.svg";
interface Props {
  state: TypeEditorState;
}

export const ObjectBlock = ({ state }: Props) => {
  const aspect = ModeNew(state.mode)
    ? state.createLibraryType.aspect
    : state.selectedNode.aspect;

  const name = ModeNew(state.mode)
    ? state.createLibraryType.name
    : state.selectedNode.name;

  const icon =
    state.createLibraryType.symbolId || state.selectedNode.symbolId
      ? GetSymbol(state)
      : null;

  //   let terminalCategories = [];
  //   state.terminals.forEach((e) => {
  //     let t = e as unknown as TerminalCategory;
  //     terminalCategories.push(t);
  //   });
  //   let colorsArray = terminalCategories.map((category) => {
  //     category.value = category.value.map((terminal) => {});
  //     return category;
  //     //   let obj = {
  //     //       id: t[1].id,
  //     //       color: t[1].color
  //     //   }
  //   });

  //   const inputTerminals = () => {
  //     let inputTerminals: string[];
  //     if (state.createLibraryType.terminalTypes) {
  //       state.createLibraryType.terminalTypes
  //         .filter((t) => t.connectorType === ConnectorType.Input)
  //         .forEach((t) => {
  //           inputTerminals.push(t.terminalTypeId);
  //         });
  //       colorsArray.forEach((terminal) => {
  //         inputTerminals.filter((t) => terminal["id"] === t);
  //       });
  //       console.log("input terminaler", inputTerminals);
  //         return inputTerminals;
  //     }
  //   };

  return (
    <ObjectTypeBlock
      blockColor={GetBlockColor(aspect)}
      blockHeight={GetBlockHeight(aspect)}
    >
      {/* {state.createLibraryType.aspect === Aspect.Function && (
        <InputOutputTerminals>
          <Terminals input={true}>
            <span>
              <TerminalIcon style={{ fill: "pink" }} />
            </span>
            <span>
              <TerminalIcon />
            </span>
            <span>
              <TerminalIcon />
            </span>
          </Terminals>
          <Terminals input={false}>
            <span>
              <TerminalIcon />
            </span>
            <span>
              <TerminalIcon />
            </span>
          </Terminals>
        </InputOutputTerminals>
      )} */}
      <InfoWrapper blockPaddingTop={GetBlockPaddingTop(aspect)}>
        <p>{state.rdsName}</p>
        <p>{name}</p>
        {icon && <Symbol base64={icon.data} text={icon.name} />}
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
