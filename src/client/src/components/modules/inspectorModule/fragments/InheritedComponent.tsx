import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  FragmentHeader,
  FragmentDataWrapper,
  FragmentColumn,
  FragmentInput,
  FragmentParagraph,
  FragmentContainer,
  CustomInput,
  CustomColumn,
} from "../styled";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { GetTextResource } from "./helpers";
import textResources from "../../../../textResources";

const InheritedComponent = ({ index }) => {
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
                  {textResources.Inspector_Admin_Id}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Semantic_Id}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Tag}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Designation}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Service}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Change}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Version}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Kind}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Status}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Project}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Long_Description}
                </FragmentParagraph>
                <CustomInput key={null} width="400" />
              </FragmentColumn>
              <CustomColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Interface}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Updated_By}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </CustomColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Contractor}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Updated_Date}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_Local_Description}
                </FragmentParagraph>
                <CustomInput key={null} width="344" />
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

export default InheritedComponent;
