// import { ReactComponent as TerminalIcon } from "../../../../assets/icons/common/terminalIcon.svg";
import { ObjectTypeBlock, InfoWrapper } from "../styled";
import { CreateLibraryType } from "../../../../models";
import { GetBlockColor, GetBlockHeight, GetBlockPaddingTop } from "./helpers";

// import { ReactComponent as TerminalIcon } from "../../../../assets/icons/common/terminalIcon.svg";
interface Props {
  createLibraryType: CreateLibraryType;
  rdsName: string;
}

export const ObjectBlock = ({ createLibraryType, rdsName }: Props) => {
  const aspect = createLibraryType.aspect;

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
        <p>{rdsName}</p>
        <p>{createLibraryType.name}</p>
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
