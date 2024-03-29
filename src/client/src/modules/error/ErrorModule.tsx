import { ExitButton } from "../../compLibrary/modal/components/ExitButton";
import { useEffect, useState } from "react";
import { TextResources } from "../../assets/text/TextResources";

// import { deleteCommonError } from "../../redux/store/common/commonSlice";
// import { deleteUserError } from "../../redux/store/user/userSlice";
import { InfoModalContent } from "../../compLibrary/modal/variants/info/InfoModalContent";
import { Modal } from "compLibrary/modal/Modal";
import { Color } from "../../assets/color/Color";
import { projectStateSelector, useAppDispatch, useAppSelector } from "store";
import { ErrorBody, ErrorItem, ErrorItemText, ErrorItemTitle } from "./ErrorModule.styled";
import { deleteProjectApiError } from "../../store/reducers/projectReducer";

interface ErrorMessage {
  key: string;
  module: string;
  message: string;
}

/**
 * Module to handle errors coming from the server.
 * @returns a box with the error messages.
 */
const ErrorModule = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState([] as ErrorMessage[]);
  const projectState = useAppSelector(projectStateSelector);
  // const libraryState = useAppSelector(selectors.librarySelector);
  // const userState = useAppSelector(selectors.userStateSelector);
  // const commonState = useAppSelector(selectors.commonStateSelector);

  const closeHeader = () => {
    if (errors) {
      errors.forEach((error) => {
        if (error.key) {
          dispatch(deleteProjectApiError(error.key));
          // dispatch(deleteCommonError(error.key));
          // dispatch(deleteUserError(error.key));
        }
      });
    }
    setVisible(false);
  };

  useEffect(() => {
    const errorList = [];

    if (projectState.apiErrors) {
      projectState.apiErrors.forEach((error) => {
        if (error) errorList.push({ module: "Project", key: error.id, message: error.error.message });
      });
    }

    // if (libraryState.apiError) {
    //   libraryState.apiError.forEach((error) => {
    //     if (error) errorList.push({ module: "Library", key: error.key, message: error.errorMessage, errorData: error.errorData });
    //   });
    // }

    // if (commonState.apiError) {
    //   commonState.apiError.forEach((error) => {
    //     if (error) errorList.push({ module: "Common", key: error.key, message: error.errorMessage, errorData: error.errorData });
    //   });
    // }

    // if (userState.apiError) {
    //   userState.apiError.forEach((error) => {
    //     if (error) errorList.push({ module: "User", key: error.key, message: error.errorMessage, errorData: error.errorData });
    //   });
    // }

    setErrors(errorList);
    setVisible(errorList.length > 0);
  }, [projectState.apiErrors]);

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
                {/* {err.errorData?.items?.map((item) => {
                  return (
                    <ErrorItemText key={item.key}>
                      {item.key}: {JSON.stringify(item.value)}
                    </ErrorItemText>
                  );
                })} */}
              </ErrorItem>
            );
          })}
        </ErrorBody>
      </InfoModalContent>
    </Modal>
  );
};

export default ErrorModule;
