import styled from "styled-components";

interface Props {}

const NodeInfo = styled.div<Props>`
  display: flex;
  flex-shrink: 0;
  margin: 14px 0px 10px 10px;
  font-weight: bold;

  .text {
    padding-left: 10px;
  }
`;

export default NodeInfo;
