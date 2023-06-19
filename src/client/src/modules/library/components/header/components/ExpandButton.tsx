import { Icon } from "@mimirorg/component-library";
import { LibraryIcon } from "../../../../../assets/icons/modules";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { ExpandButtonContainer } from "./ExpandButton.styled";
import { useState } from "react";

interface Props {
  text: string;
  offset: [number, number];
  onOpen: (open: boolean) => void;
}

export const ExpandButton = ({ text, offset, onOpen }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Tooltip content={text} placement={"bottom"} offset={offset}>
      <ExpandButtonContainer
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          onOpen(!isOpen);
        }}
      >
        <Icon size={24} src={LibraryIcon} alt="" />
      </ExpandButtonContainer>
    </Tooltip>
  );
};
