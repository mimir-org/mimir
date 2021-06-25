import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Color } from "../../../../compLibrary";
import { ObjectTypeBlock, InfoWrapper } from "../styled";
import { Aspect } from "../../../../models";

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

  return (
    <ObjectTypeBlock blockColor={blockColor()} blockHeight={blockHeight()}>
      <InfoWrapper blockPaddingTop={blockPaddingTop()}>
        <p>{state.rdsName}</p>
        <p>{state.createLibraryType.name}</p>
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
