import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
// import { ReactComponent as TerminalIcon } from "../../../../assets/icons/common/terminalIcon.svg";
import { Color } from "../../../../compLibrary";
import { ObjectTypeBlock, InfoWrapper } from "../styled";
import { IsFunction, IsLocation, IsProduct, ModeEdit } from "../helpers";

interface Props {
  state: TypeEditorState;
}

export const ObjectBlock = ({ state }: Props) => {
  const aspect = ModeEdit(state.mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;

  const blockColor = () => {
    let color = "";
    if (IsFunction(aspect)) {
      color = Color.Function;
    } else if (IsLocation(aspect)) {
      color = Color.Location;
    } else if (IsProduct(aspect)) {
      color = Color.Product;
    }
    return color;
  };

  const blockHeight = () => {
    let height = 0;
    if (IsFunction(aspect)) {
      height = 70;
    } else if (IsLocation(aspect)) {
      height = 45;
    }
    return height;
  };

  const blockPaddingTop = () => {
    let top = 0;
    if (IsFunction(aspect)) {
      top = 25;
    } else if (IsLocation(aspect)) {
      top = 2;
    }
    return top;
  };

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
    <ObjectTypeBlock blockColor={blockColor()} blockHeight={blockHeight()}>
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
      <InfoWrapper blockPaddingTop={blockPaddingTop()}>
        <p>{state.rdsName}</p>
        <p>
          {ModeEdit(state.mode)
            ? state.selectedNode.name
            : state.createLibraryType.name}
        </p>
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
