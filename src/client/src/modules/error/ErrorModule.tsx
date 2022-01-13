import * as selectors from "./helpers/selectors";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { ErrorBody, ErrorBox, ErrorHeaderBox, ErrorItem } from "./styled";
import { CloseIcon } from "../../assets/icons/close";
import { TextResources } from "../../assets/text";
import { BadRequestData } from "../../models/webclient";
import { deleteProjectError } from "../../redux/store/project/actions";
import { deleteCommonError } from "../../redux/store/common/commonSlice";
import { deleteLibraryError } from "../../redux/store/library/librarySlice";
import { deleteUserError } from "../../redux/store/user/userSlice";
import { deleteTypeEditorError } from "../../typeEditor/redux/typeEditorSlice";
import { useAppSelector } from "../../redux/store/hooks";
import { ProjectState } from "../../redux/store/project/types";

interface ErrorMessage {
  key: string;
  module: string;
  message: string;
  errorData: BadRequestData;
}

interface Props {
  projectState: ProjectState;
  dispatch: Dispatch;
}

/**
 * Module to handle errors coming from the server.
 * @param interface
 * @returns a box with the error messages.
 */
const ErrorModule = ({ projectState, dispatch }: Props) => {
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([] as ErrorMessage[]);
  const libraryState = useAppSelector(selectors.librarySelector);
  const userState = useAppSelector(selectors.userStateSelector);
  const commonState = useAppSelector(selectors.commonStateSelector);
  const typeEditorState = useAppSelector(selectors.typeEditorStateSelector);

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
  }, [commonState.apiError, libraryState.apiError, projectState.apiError, userState.apiError, typeEditorState.apiError]);

  return (
    <>
      <ErrorBox visible={visible}>
        <ErrorHeaderBox>
          <img src={CloseIcon} alt="Close error message" onClick={() => closeHeader()} className="icon" />
          {TextResources.Error_Tile}
        </ErrorHeaderBox>
        <ErrorBody>
          {errors?.map((x, index) => {
            return (
              <ErrorItem key={x.module + index}>
                <h3>{x.module}</h3>
                <p>{x.message}</p>
                {x.errorData?.items?.map((y) => {
                  return (
                    <p key={y.key}>
                      {y.key}: {JSON.stringify(y.value)}
                    </p>
                  );
                })}
              </ErrorItem>
            );
          })}
        </ErrorBody>
      </ErrorBox>
    </>
  );
};
export default ErrorModule;
