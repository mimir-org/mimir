import { Dispatch } from "redux";
import { AddFavoriteIcon, RemoveFavoriteIcon } from "../../../../../../../../assets/icons/favorites";
import { TextResources } from "../../../../../../../../assets/text";
import { Icon } from "../../../../../../../../compLibrary/icon";
import { Tooltip } from "../../../../../../../../compLibrary/tooltip/Tooltip";
import { LibItem } from "../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../models/project";
import { NodeElementFavoriteBox } from "./NodeElement.styled";

interface Props {
  item: LibItem;
  addFavorite?: boolean;
  customCategory?: LibraryCategory;
  dispatch: Dispatch;
  onClick: (dispatch: Dispatch, item: LibItem, customCategory?: LibraryCategory) => void;
}

/**
 * Module for adding/removing a favorite NodeElement from the LibraryModule.
 * @param interface
 * @returns an option for adding/removing a favorite via a favorite icon.
 */
export const FavoriteComponent = ({ item, addFavorite, customCategory, onClick, dispatch }: Props) => {
  const icon = addFavorite ? AddFavoriteIcon : RemoveFavoriteIcon;
  const text = addFavorite ? TextResources.Library_Add_Favorite : TextResources.Library_Remove_Favorite;

  return (
    <Tooltip content={text} offset={[0, 5]}>
      <NodeElementFavoriteBox tabIndex={0} onClick={() => onClick(dispatch, item, customCategory)}>
        <Icon size={10} src={icon} alt={text} />
      </NodeElementFavoriteBox>
    </Tooltip>
  );
};
