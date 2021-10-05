import { DeleteIcon, LockOpenIcon, LockClosedIcon, ValidateIcon } from "../../../../assets/icons/common";

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockOpenIcon;
  if (type === "unlock") return LockClosedIcon;
  if (type === "validate") return ValidateIcon; // TODO: fix checkbox
};

export default GetButtonIcon;
