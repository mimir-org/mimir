import styled from "styled-components";

const VerticalScrollbar = styled.div`
  margin-right: -8px;
  padding: 0px;
  height: ${(props: { width: number }) =>
    props.width === undefined ? `222px` : props.width + `px`};

  overflow-x: hidden;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #dcdcdc;
    border: 1px solid #f7f7f7;
    border-radius: 2000px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #dcdcdc;
  }
`;

export default VerticalScrollbar;
