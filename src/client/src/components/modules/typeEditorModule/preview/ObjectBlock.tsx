import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Color } from "../../../../compLibrary";
import { ObjectTypeBlock, InfoWrapper } from "../styled";

export const ObjectBlock = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const blockColor = () => {
    let color = "";
    if (state.aspect === "Function") {
      color = Color.Function;
    } else if (state.aspect === "Location") {
      color = Color.Location;
    } else if (state.aspect === "Product") {
      color = Color.Product;
    }
    return color;
  };

  const blockHeight = () => {
    let height = 0;
    if (state.aspect === "Function") {
      height = 70;
    } else if (state.aspect === "Location") {
      height = 45;
    }
    return height;
  };

  const blockPaddingTop = () => {
    let top = 0;
    if (state.aspect === "Function") {
      top = 40;
    } else if (state.aspect === "Location") {
      top = 20;
    }
    return top;
  };

  return (
    <ObjectTypeBlock blockColor={blockColor()} blockHeight={blockHeight()}>
      <InfoWrapper blockPaddingTop={blockPaddingTop()}>
        <p>{/* TODO: selected RDS */}</p>
        <p>{state.typeName}</p>
      </InfoWrapper>
    </ObjectTypeBlock>
  );
};

export default ObjectBlock;
