import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProjectState } from "../../../redux/store/project/types";
import { LibraryState } from "../../../redux/store/library/types";
import { UserState } from "../../../redux/store/user/types";
import { CommonState } from "../../../redux/store/common/types";
import { RootState } from "../../../redux/store";
import { ErrorBox, ErrorItem, ErrorHeaderBox } from ".";
import { ProjectBody } from "../../../componentLibrary/box/project";
import { CloseIcon } from "../../../assets/icons";
import { TextResources } from "../../../assets/textResources";
import { BadRequestData } from "../../../models/webclient";
import { deleteProjectError } from "../../../redux/store/project/actions";
import { deleteCommonError } from "../../../redux/store/common/actions";

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

  useEffect(() => {
    const errors = [];

    if (projectState.apiError) {
      projectState.apiError.forEach((error) => {
        if (error)
          errors.push({
            module: "Project",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (libraryState.hasError) {
      errors.push({
        module: "Library",
        message: libraryState.errorMsg,
        errorData: {} as BadRequestData,
      });
    }

    if (commonState.apiError) {
      commonState.apiError.forEach((error) => {
        if (error)
          errors.push({
            module: "Common",
            key: error.key,
            message: error.errorMessage,
            errorData: error.errorData,
          });
      });
    }

    if (userState.hasError) {
      errors.push({
        module: "User",
        message: libraryState.errorMsg,
        errorData: {} as BadRequestData,
      });
    }

    setErrors(errors);
    setVisible(errors.length > 0);
  }, [
    commonState.apiError,
    libraryState.errorMsg,
    libraryState.hasError,
    projectState.apiError,
    userState.hasError,
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
        {errors &&
          errors.map((x) => {
            return (
              <ErrorItem key={x.module}>
                <h3>{x.module}</h3>
                <p>{x.message}</p>
                {x.errorData &&
                  x.errorData.items &&
                  x.errorData.items.map((y) => {
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
