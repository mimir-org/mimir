import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { GetTextResource } from "./helpers";
import textResources from "../../../../textResources";
import {
  FragmentHeader,
  FragmentDataWrapper,
  FragmentColumn,
  FragmentInput,
  FragmentParagraph,
  FragmentContainer,
} from "../styled";

const RelationsComponent = ({ index }) => {
  const header = GetTextResource(index);
  const handleClick = useInspectorChangeHandler(index);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <FragmentHeader active="true" onClick={handleClick}>
            {header}
          </FragmentHeader>
          <FragmentDataWrapper>
            <FragmentContainer>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Name}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Has_Function}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Updated_By}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Connected_To}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Project}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Updated_Date}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Relation_Out}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Another_Field}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Has_Location}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Relations_Fulfilled_By}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
            </FragmentContainer>
          </FragmentDataWrapper>
        </>
      ) : (
        <FragmentHeader onClick={handleClick}>{header}</FragmentHeader>
      )}
    </>
  );
};

export default RelationsComponent;
