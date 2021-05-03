import styled from "styled-components";

const VerticalScrollbar = styled.div`
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

  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
`;

export default VerticalScrollbar;
