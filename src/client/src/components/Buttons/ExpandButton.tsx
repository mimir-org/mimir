import { Icon } from "@mimirorg/component-library";
import { Tooltip } from "compLibrary/tooltip/Tooltip";
import { ExpandButtonContainer } from "./ExpandButton.styled";
import { useState } from "react";

interface Props {
  text: string;
  icon: string;
  offset: [number, number];
  onOpen: (open: boolean) => void;
}

export const ExpandButton = ({ text, icon, offset, onOpen }: Props) => {
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
        <Icon size={24} src={icon} alt="Expand or collapse modules" />
      </ExpandButtonContainer>
    </Tooltip>
  );
};
