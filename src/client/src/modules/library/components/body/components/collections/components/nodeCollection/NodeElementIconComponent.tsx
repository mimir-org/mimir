import { Symbol } from "../../../../../../../../compLibrary/symbol";
import { GetAspectColor, GetObjectIcon } from "../../../../../../../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../../../../../../../models";
import { GetTypeIcon } from "./helpers/GetTypeIcon";
import { Icon } from "../../../../../../../../compLibrary/icon";
import { NodeElementIconContainer } from "./NodeElement.styled";

interface Props {
  item: LibItem;
}

export const NodeElementIconComponent = ({ item }: Props) => (
  <NodeElementIconContainer color={GetAspectColor(item, AspectColorType.Main)}>
    {item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport ? (
      <Icon size={20} src={GetObjectIcon(item)} alt="aspect color" draggable="false" />
    ) : (
      item.libraryType === ObjectType.ObjectBlock && <Symbol base64={GetTypeIcon(item?.symbolId)?.data} text={item?.name} />
    )}
  </NodeElementIconContainer>
);
