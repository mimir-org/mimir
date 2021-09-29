import {
  DeleteIcon,
  ValidateIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "../../../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockOpenIcon;
  if (type === "unlock") return LockClosedIcon;
  if (type === "validate") return ValidateIcon;
};

export default GetButtonIcon;
