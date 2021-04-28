import styled from "styled-components";

const TabDataWrapper = styled.div`
  background-color: #f2f2f2;
  position: absolute;
  overflow-y: auto;
  height: 230px;
  width: inherit;

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }
  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
`;

export default TabDataWrapper;
