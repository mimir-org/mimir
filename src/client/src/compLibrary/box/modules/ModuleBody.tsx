import styled from "styled-components";

interface Props {
  explorer?: boolean;
  visible: boolean;
  isBlockView?: boolean;
  legend?: boolean;
}

const ModuleBody = styled.div<Props>`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  bottom: ${(props) => props.legend && "0"};
  overflow-y: auto;
  height: 100%;
  max-height: ${(props) => (props.legend ? "265px" : props.explorer && props.isBlockView ? "79%" : "89%")};

  @media screen and (max-height: 1100px) {
    max-height: ${(props) => props.explorer && props.isBlockView && 76}%;
  }
  @media screen and (max-height: 1000px) {
    max-height: ${(props) => props.explorer && props.isBlockView && 72}%;
  }
  @media screen and (max-height: 900px) {
    max-height: ${(props) => props.explorer && props.isBlockView && 67}%;
  }
  @media screen and (max-height: 700px) {
    max-height: ${(props) => props.explorer && props.isBlockView && 55}%;
  }
  @media screen and (max-height: 550px) {
    max-height: ${(props) => props.explorer && props.isBlockView && 40}%;
  }
`;

export default ModuleBody;
