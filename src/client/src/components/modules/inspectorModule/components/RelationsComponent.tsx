import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTextResource } from "./helpers";
import textResources from "../../../../textResources";
import { changeInspector } from "../../../../redux/store/inspector/actions";
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
import { RootState } from "../../../../redux/store";

const AdminComponent = ({ index }) => {
  const dispatch = useDispatch();
  const header = GetTextResource(index);
  const list = useSelector<RootState>((state) => state.inspector.list);

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.list[index].visible
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

export default AdminComponent;
