import { Symbol } from "../../../../../../../../compLibrary/symbol";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../../../../../../../models";
import { getTypeIcon } from "./helpers/GetTypeIcon";
import { Icon } from "../../../../../../../../compLibrary/icon";
import { NodeElementIconContainer } from "./NodeElementIconComponent.styled";
import { LibNodeInterface, LibNodeTransport } from "../../../../../../../../assets/icons/library";

interface Props {
  item: LibItem;
}

export const NodeElementIconComponent = ({ item }: Props) => (
  <NodeElementIconContainer color={GetAspectColor(item, AspectColorType.Main)}>
    {item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport ? (
      <Icon size={20} src={GetObjectIcon(item)} alt="aspect color" draggable="false" />
    ) : (
      item.libraryType === ObjectType.ObjectBlock && <Symbol source={getTypeIcon(item?.symbolId)?.data} text={item?.name} />
    )}
  </NodeElementIconContainer>
);

function GetObjectIcon(item: LibItem) {
  if (item.libraryType === ObjectType.Interface) return LibNodeInterface;
  if (item.libraryType === ObjectType.Transport) return LibNodeTransport;

  return null;
}
