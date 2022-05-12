import * as selectors from "./helpers/selectors";
import { ExitButton } from "../../compLibrary/modal/components/ExitButton";
import { useEffect, useState } from "react";
import { TextResources } from "../../assets/text/TextResources";
import { BadRequestData } from "../../models/webclient";
import { deleteProjectError } from "../../redux/store/project/actions";
import { deleteCommonError } from "../../redux/store/common/commonSlice";
import { deleteLibraryError } from "../../redux/store/library/librarySlice";
import { deleteUserError } from "../../redux/store/user/userSlice";
import { deleteTypeEditorError } from "../../typeEditor/redux/typeEditorSlice";
import { InfoModalContent } from "../../compLibrary/modal/variants/info/InfoModalContent";
import { Modal } from "../../compLibrary/modal/Modal";
import { Color } from "../../compLibrary/colors/Color";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ErrorBody, ErrorItem, ErrorItemText, ErrorItemTitle } from "./ErrorModule.styled";

interface ErrorMessage {
  key: string;
  module: string;
  message: string;
  errorData: BadRequestData;
}

/**
 * Module to handle errors coming from the server.
 * @returns a box with the error messages.
 */
const ErrorModule = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState([] as ErrorMessage[]);
  const projectState = useAppSelector(selectors.projectStateSelector);
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
        if (error) errorList.push({ module: "Project", key: error.key, message: error.errorMessage, errorData: error.errorData });
      });
    }

    if (libraryState.apiError) {
      libraryState.apiError.forEach((error) => {
        if (error) errorList.push({ module: "Library", key: error.key, message: error.errorMessage, errorData: error.errorData });
      });
    }

    if (commonState.apiError) {
      commonState.apiError.forEach((error) => {
        if (error) errorList.push({ module: "Common", key: error.key, message: error.errorMessage, errorData: error.errorData });
      });
    }

    if (userState.apiError) {
      userState.apiError.forEach((error) => {
        if (error) errorList.push({ module: "User", key: error.key, message: error.errorMessage, errorData: error.errorData });
      });
    }

    if (typeEditorState.apiError) {
      typeEditorState.apiError.forEach((error) => {
        if (error)
          errorList.push({ module: "TypeEditor", key: error.key, message: error.errorMessage, errorData: error.errorData });
      });
    }

    setErrors(errorList);
    setVisible(errorList.length > 0);
  }, [commonState.apiError, libraryState.apiError, projectState.apiError, userState.apiError, typeEditorState.apiError]);

  return (
    <Modal isBlurred isOpen={visible} onExit={closeHeader}>
      <InfoModalContent title={TextResources.ERROR_GENERIC} color={Color.ULTRA_RED}>
        <ExitButton onClick={closeHeader} />
        <ErrorBody>
          {errors?.map((err, index) => {
            return (
              <ErrorItem key={err.module + index}>
                <ErrorItemTitle>{err.module}</ErrorItemTitle>
                <ErrorItemText>{err.message}</ErrorItemText>
                {err.errorData?.items?.map((item) => {
                  return (
                    <ErrorItemText key={item.key}>
                      {item.key}: {JSON.stringify(item.value)}
                    </ErrorItemText>
                  );
                })}
              </ErrorItem>
            );
          })}
        </ErrorBody>
      </InfoModalContent>
    </Modal>
  );
};

export default ErrorModule;
