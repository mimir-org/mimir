import {
  ListElementsContainer,
  ListLabel,
  ListWrapper,
} from "../../../compLibrary";
import { TextResources } from "../../../assets/text";
import { CreateLibraryType } from "../../../models";
import RDSListElement from "./lists/RDS/RDSListElement";
import { GetFilteredRdsList } from "./helpers";

export enum ListType {
  Rds = 0,
}

interface Props {
  createLibraryType: CreateLibraryType;
  items: any[];
  disabled?: boolean;
  listType: ListType;
  onChange: Function;
}

export const TypeEditorList = ({
  createLibraryType,
  items,
  disabled,
  listType,
  onChange,
}: Props) => {
  const filteredList = (): any[] => {
    switch (listType) {
      case ListType.Rds:
        return GetFilteredRdsList(items, createLibraryType.aspect);
      default:
        return [] as any[];
    }
  };

  return (
    <ListWrapper flex={0.7} disabled={disabled}>
      <ListLabel>{TextResources.TypeEditor_Properties_RDS}</ListLabel>

      <ListElementsContainer>
        {!disabled && listType === ListType.Rds
          ? filteredList().map((element) => (
              <RDSListElement
                key={element.id}
                id={element.id}
                name={element.name}
                onChange={(key, data) => onChange(key, data)}
                defaultValue={createLibraryType.rdsId}
              />
            ))
          : null}
      </ListElementsContainer>
    </ListWrapper>
  );
};

export default TypeEditorList;
