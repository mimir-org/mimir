import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
// import { ReactComponent as TerminalIcon } from "../../../../assets/icons/common/terminalIcon.svg";
import { Color } from "../../../../compLibrary";
import {
  ObjectTypeBlock,
  InfoWrapper,
  //   Terminals, InputOutputTerminals,
} from "../styled";
import { Aspect } from "../../../../models"; // ConnectorType

export const ObjectBlock = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const blockColor = () => {
    let color = "";
    if (state.createLibraryType.aspect === Aspect.Function) {
      color = Color.Function;
    } else if (state.createLibraryType.aspect === Aspect.Location) {
      color = Color.Location;
    } else if (state.createLibraryType.aspect === Aspect.Product) {
      color = Color.Product;
    }
    return color;
  };

  const blockHeight = () => {
    let height = 0;
    if (state.createLibraryType.aspect === Aspect.Function) {
      height = 70;
    } else if (state.createLibraryType.aspect === Aspect.Location) {
      height = 45;
    }
    return height;
  };

  const blockPaddingTop = () => {
    let top = 0;
    if (state.createLibraryType.aspect === Aspect.Function) {
      top = 25;
    } else if (state.createLibraryType.aspect === Aspect.Location) {
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
        <p>{state.createLibraryType.name}</p>
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
