import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import StyledHeader from "./styled/StyledHeader";
import StyledInspectorInfo from "./styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { FragmentData } from ".";
import { GetContentData, GetTextResource } from "./helpers";

const FragmentContent = ({ index }) => {
  const colors = ["#fff", "#FFDEAD", "#9ACD32", "#FF7F50", "#8B008B", "#000"];
  const textColor = index === 4 ? colors[0] : colors[5];
  const color = colors[index];
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
            color={color}
            active="true"
            text={textColor}
            onClick={handleClick}
          >
            {header}
          </StyledHeader>
          <StyledInspectorInfo color={color} text={textColor}>
            <FragmentData data={data.content} />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} text={textColor} onClick={handleClick}>
          {header}
        </StyledHeader>
      )}
    </>
  );
};

export default FragmentContent;
