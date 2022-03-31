import styled from "styled-components";

interface Props {
  colorMain: string;
  isSelected: boolean;
}

export const AspectNodeStyled = styled.div<Props>`
  padding-top: 10px;
  width: 90px;
  height: 55px;
  text-align: center;
  font-size: 11px;
  border-radius: 10px;
  border: 3px solid;
  border-color: ${(props) => (props.isSelected ? props.colorMain : "transparent")};
  transition: border 250ms ease-in-out;

  &:hover,
  &.selected {
    border-color: ${(props) => props.colorMain};
  }
`;
