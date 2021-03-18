import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { StyledHeader, StyledInspectorContent } from "./styled";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { FragmentData } from ".";
import { GetContentData, GetTextResource, GetColor } from "./helpers";

const FragmentContent = ({ index }) => {
  const textColor = GetColor(index, "text");
  const backgroundColor = GetColor(index, "");
  const header = GetTextResource(index);

  const dispatch = useDispatch();
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index, dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader
            color={backgroundColor}
            active="true"
            text={textColor}
            onClick={handleClick}
          >
            {header}
          </StyledHeader>
          <StyledInspectorContent color={backgroundColor} text={textColor}>
            <FragmentData data={data.content} />
          </StyledInspectorContent>
        </>
      ) : (
        <StyledHeader
          color={backgroundColor}
          text={textColor}
          onClick={handleClick}
        >
          {header}
        </StyledHeader>
      )}
    </>
  );
};

export default FragmentContent;
