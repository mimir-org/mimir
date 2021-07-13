import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProjectState } from "../../../redux/store/project/types";
import { LibraryState } from "../../../redux/store/library/types";
import { UserState } from "../../../redux/store/user/types";
import { CommonState } from "../../../redux/store/common/types";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { RootState } from "../../../redux/store";
import { ErrorBox, ErrorItem, ErrorHeaderBox } from ".";
import { ProjectBody } from "../../../compLibrary/box/project";
import { CloseIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { BadRequestData } from "../../../models/webclient";
import { deleteProjectError } from "../../../redux/store/project/actions";
import { deleteCommonError } from "../../../redux/store/common/actions";
import { deleteLibraryError } from "../../../redux/store/library/actions";
import { deleteUserError } from "../../../redux/store/user/actions";
import { deleteTypeEditorError } from "../../../redux/store/typeEditor/actions";

interface ErrorMessage {
  key: string;
  module: string;
  message: string;
  errorData: BadRequestData;
}

const ErrorModule = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([] as ErrorMessage[]);

  const closeHeader = () => {
    if (errors) {
      errors.forEach((error) => {
        if (error.key) {
          dispatch(deleteProjectError(error.key));
          dispatch(deleteCommonError(error.key));
          dispatch(deleteLibraryError(error.key));
          dispatch(deleteUserError(error.key));
          dispatch(deleteTypeEditorError(error.key));
        }
      });
    }
    setVisible(false);
  };

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const libraryState = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const commonState = useSelector<RootState>(
    (state) => state.commonState
  ) as CommonState;

  const typeEditorState = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  useEffect(() => {
    const errorList = [];

    if (projectState.apiError) {
      projectState.apiError.forEach((error) => {
        if (error)
          errorList.push({
            module: "Project",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (libraryState.apiError) {
      libraryState.apiError.forEach((error) => {
        if (error)
          errorList.push({
            module: "Library",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (commonState.apiError) {
      commonState.apiError.forEach((error) => {
        if (error)
          errorList.push({
            module: "Common",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (userState.apiError) {
      userState.apiError.forEach((error) => {
        if (error)
          errorList.push({
            module: "User",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (typeEditorState.apiError) {
      typeEditorState.apiError.forEach((error) => {
        if (error)
          errorList.push({
            module: "TypeEditor",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    setErrors(errorList);
    setVisible(errorList.length > 0);
  }, [
    commonState.apiError,
    libraryState.apiError,
    projectState.apiError,
    userState.apiError,
    typeEditorState.apiError,
  ]);

  return (
    <ErrorBox visible={visible}>
      <ProjectBody>
        <ErrorHeaderBox>
          <img
            src={CloseIcon}
            alt="Close error message"
            onClick={() => closeHeader()}
            className="icon"
          />
          {TextResources.Error_Tile}
        </ErrorHeaderBox>
        {errors?.map((x, index) => {
          return (
            <ErrorItem key={x.module + index}>
              <h3>{x.module}</h3>
              <p>{x.message}</p>
              {x.errorData?.items?.map((y) => {
                return (
                  <p key={y.key}>
                    {y.key}: {y.value}
                  </p>
                );
              })}
            </ErrorItem>
          );
        })}
      </ProjectBody>
    </ErrorBox>
  );
};
export default ErrorModule;
