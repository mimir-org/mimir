import styled from "styled-components";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;

  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  bottom: ${(props) => props.legend && "0"};
  overflow-y: auto;
  height: 100%;

  max-height: ${(props) =>
    props.legend
      ? "265px"
      : props.explorer && props.isBlockView
      ? "79%"
      : "89%"};

  @media screen and (max-height: 1100px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "76%"};
    background: #000;
  }

  @media screen and (max-height: 1000px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "72%"};
    background: #f8f8f8;
  }

  @media screen and (max-height: 900px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "67%"};
    background: #e5e5;
  }

  @media screen and (max-height: 700px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "55%"};
  }

  @media screen and (max-height: 550px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "40%"};
  }

  @media screen and (max-height: 400px) {
    max-height: ${(props) => props.explorer && props.isBlockView && "25%"};
  }
`;

export default ModuleBody;
