import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import {
  IsLocation,
  IsFunction,
  IsObjectBlock,
  IsTransport,
  IsInterface,
} from "../helpers";
import { CreateLibraryType } from "../../../../models";
interface Props {
  createLibraryType: CreateLibraryType;
}

export const PreviewBody = ({ createLibraryType }: Props) => {
  const showObjectBlock = () => {
    if (
      (IsLocation(createLibraryType.aspect) &&
        createLibraryType.locationType !== "") ||
      (IsFunction(createLibraryType.aspect) &&
        IsObjectBlock(createLibraryType.objectType))
    ) {
      return <ObjectBlock createLibraryType={createLibraryType} rdsName={""} />;
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunction(createLibraryType.aspect)) {
      return (
        IsTransport(createLibraryType.objectType) ||
        IsInterface(createLibraryType.objectType)
      );
    }
    return false;
  };

  return (
    <PreviewArea>
      {showObjectBlock()}
      {transportOrInterface() && (
        <InfoWrapper>
          {/* <p>{createLibraryType.rdsId}</p> */}
          <p>{createLibraryType.name}</p>
        </InfoWrapper>
      )}
      {/* {IsFunction(createLibraryType.aspect) &&
        IsTransport(createLibraryType.objectType) && (
          <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
        )}
      {IsFunction(createLibraryType.aspect) &&
        IsInterface(createLibraryType.objectType) && (
          <InterfaceIcon
            style={{ stroke: state.terminalColor, fill: state.terminalColor }}
          ></InterfaceIcon>
        )} */}
    </PreviewArea>
  );
};

export default PreviewBody;
