import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTextResource } from "../helpers";
import textResources from "../../../../../textResources";
import { changeInspector } from "../../../../../redux/store/inspector/actions";
import AdminContent from "./AdminContent";
import {
  FragmentHeader,
  FragmentDataWrapper,
  FragmentColumn,
  FragmentInput,
  FragmentParagraph,
  FragmentContainer,
  CustomInput,
  CustomColumn,
} from "../../styled";
import { RootState } from "../../../../../redux/store";

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
              <AdminContent index={4} />
              <AdminContent index={4} />
              <AdminContent index={3} customInput={true} />
              <AdminContent index={2} customColumn={true} />
              <AdminContent index={3} />
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
