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
} from "./styled";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { FragmentData } from ".";
import { GetContentData, GetTextResource } from "./helpers";
import textResources from "../../../../textResources";

const InheritedComponent = ({ index }) => {
  const header = GetTextResource(index);
  const data = GetContentData(index);
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
            {/* <FragmentData data={data.content} /> */}
            <FragmentContainer>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_id}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_semanticID}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_tagNumber}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_referenceDesignation}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_serviceDescription}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_changeMode}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_version}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_kind}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </FragmentColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_status}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_project}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_longDescription}
                </FragmentParagraph>
                <CustomInput key={null} width="400" />
              </FragmentColumn>
              <CustomColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_interface}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_updatedBy}
                </FragmentParagraph>
                <FragmentInput key={null} />
              </CustomColumn>
              <FragmentColumn>
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_contractor}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_updatedDate}
                </FragmentParagraph>
                <FragmentInput key={null} />
                <FragmentParagraph key={null}>
                  {textResources.Inspector_Admin_longLocalDescription}
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
