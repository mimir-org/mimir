import styled from "styled-components";
import { Size } from "../../../compLibrary/size/Size";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontWeight } from "../../../compLibrary/font";

interface Props {
  libraryOpen: boolean;
}

export const VisualFilterContainer = styled.div<Props>`
  position: absolute;
  top: 94px;
  right: ${(props) => (!props.libraryOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN)}px;
  background: ${Color.WHITE};
  padding: 8px 0 6px 0;
  width: 350px;
  min-height: 140px;
  height: auto;
  border-style: solid;
  border-color: ${Color.BASTILLE};
  border-width: 0 0 1px 1px;
  border-bottom-left-radius: 10px;
  z-index: 5;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  transition: right 0.2s ease-in-out;
`;

export const VisualFilterHeader = styled.div`
  margin: 5px 0 0 20px;
  font-size: ${FontSize.SUBHEADER};
  font-weight: ${FontWeight.BOLD};
`;

export const VisualFilterMenuColumn = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 5px 0;
  color: ${Color.BLACK};
`;
