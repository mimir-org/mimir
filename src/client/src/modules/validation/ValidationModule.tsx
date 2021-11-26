import { NotificationBox } from "../../compLibrary/box/";
import { useAppDispatch, useAppSelector, validationSelector } from "../../redux/store";
import { setValidation } from "../../redux/store/validation/actions";

/**
 * Component to handle validation in Mimir. If an action requires a feedback a box with information will appear.
 * @returns a box with a message and a close button.
 */
const ValidationModule = () => {
  const dispatch = useAppDispatch();
  const validation = useAppSelector(validationSelector);

  const onClick = () => {
    dispatch(setValidation(true, ""));
  };

  return !validation.valid && <NotificationBox onClick={onClick} message={validation.message} warning />;
};

export default ValidationModule;
