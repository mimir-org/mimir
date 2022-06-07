import { Symbol } from "../../../../../../../../compLibrary/symbol";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, ObjectType } from "../../../../../../../../models";
import { Icon } from "../../../../../../../../compLibrary/icon/Icon";
import { NodeElementIconContainer } from "./NodeElementIconComponent.styled";
import { LibNodeInterface, LibNodeTransport } from "../../../../../../../../assets/icons/library";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  item: NodeLibCm;
}

export const NodeElementIconComponent = ({ item }: Props) => (
  <NodeElementIconContainer color={GetAspectColor(item, AspectColorType.Main)}>
    <Icon size={20} src={GetObjectIcon(item)} alt="aspect color" draggable="false" />

    {/* {item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport ? (
      <Icon size={20} src={GetObjectIcon(item)} alt="aspect color" draggable="false" />
    ) : (
      item.libraryType === ObjectType.ObjectBlock && <Symbol source={getTypeIcon(item?.symbolId)?.data} text={item?.name} />
    )} */}
  </NodeElementIconContainer>
);

function GetObjectIcon(item: NodeLibCm) {
  // if (item.libraryType === ObjectType.Interface) return LibNodeInterface;
  // if (item.libraryType === ObjectType.Transport) return LibNodeTransport;

  return null;
}
