import styled from "styled-components";

interface Props {
  height: number;
  libOpen: boolean;
}

export const MapWrapper = styled.div<Props>`
  .react-flow__minimap {
    position: absolute;
    margin-top: -50px;
    width: 150px;
    height: 80px;
    background-color: transparent;
    bottom: ${(props) => props.height}px !important;
    right: ${(props) => (props.libOpen ? 312 : 27)}px !important;
    transition: right 0.2s ease-in-out, bottom 0.2s ease-in-out;
    z-index: 4;
  }
`;
