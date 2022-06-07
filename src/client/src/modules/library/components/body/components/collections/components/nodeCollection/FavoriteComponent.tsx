import { AddFavoriteIcon, RemoveFavoriteIcon } from "../../../../../../../../assets/icons/favorites";
import { TextResources } from "../../../../../../../../assets/text/TextResources";
import { Icon } from "../../../../../../../../compLibrary/icon/Icon";
import { Tooltip } from "../../../../../../../../compLibrary/tooltip/Tooltip";
import { FavoriteButton } from "./FavoriteComponent.styled";

interface Props {
  addFavorite?: boolean;
  onClick: () => void;
}

/**
 * Module for adding/removing a favorite NodeElement from the LibraryModule.
 * @param interface
 * @returns an option for adding/removing a favorite via a favorite icon.
 */
export const FavoriteComponent = ({ addFavorite, onClick }: Props) => {
  const icon = addFavorite ? AddFavoriteIcon : RemoveFavoriteIcon;
  const text = addFavorite ? TextResources.ADD_FAVORITE : TextResources.REMOVE_FAVORITE;

  return (
    <Tooltip content={text} offset={[0, 5]}>
      <FavoriteButton tabIndex={0} onClick={() => onClick()}>
        <Icon size={10} src={icon} alt={text} />
      </FavoriteButton>
    </Tooltip>
  );
};
