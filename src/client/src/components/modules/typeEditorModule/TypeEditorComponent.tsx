import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { DropdownMenu } from ".";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  TypeInfo,
  TypeNameInput,
} from "./styled";
import { Input } from "../../../componentLibrary";
import { TextResources } from "../../../assets/textResources";
import { CloseIcon } from "../../../assets/icons";

interface Props {
  mode: string;
}

export const TypeEditorComponent = ({ mode }: Props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeFlowView(VIEW_TYPE.TREEVIEW));
    push(`/home/${VIEW_TYPE.TREEVIEW}`);
  };
  const aspects = [
    {
      id: 0,
      name: "Function",
    },
    {
      id: 1,
      name: "Product",
    },
    {
      id: 2,
      name: "Location",
    },
  ];
  return (
    <TypeEditorWrapper>
      <TypeEditorContent>
        <TypeEditorHeader>
          <p>{TextResources.TypeEditor}</p>
          <img src={CloseIcon} alt="close-window" onClick={handleClick} />
        </TypeEditorHeader>
        <TypeInfo>
          <DropdownMenu
            label="Aspect"
            placeHolder="Choose Aspect"
            listItems={aspects}
          />
          <DropdownMenu
            label="Object Type"
            placeHolder="Select Object Type"
            listItems={aspects}
          />
          <TypeNameInput>
            <p>Type name</p>
            <Input
              width={300}
              onChange={() => null}
              inputType="text"
              placeholder="Write Type name"
            />
          </TypeNameInput>
          <DropdownMenu
            label="Status"
            placeHolder="Draft"
            listItems={aspects}
          />
        </TypeInfo>
        {/* <ChooseProperties>
          {mode === "new" ? <p>TE Component NEW</p> : <p>TE Component EDIT</p>}
          </ChooseProperties> */}
        {/* <TypeEditorInspector></TypeEditorInspector> */}
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;
