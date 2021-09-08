import styled from "styled-components";

const NodeInfo = styled.div`
  display: inline;
  margin: 8px 0px 10px 0px;

  .symbol {
    display: inline;
    position: absolute;
    left: 495px;
    top: 10px;
  }

  .text {
    display: inline;
    font-weight: bold;
    position: absolute;
    top: 14px;
    left: ${(props) => (props.symbol ? "525px" : "495px")};
  }

  .edgetext {
    display: inline;
    font-weight: bold;
    position: absolute;
    top: 14px;
    left: 260px;
  }
`;

export default NodeInfo;
