import styled from "styled-components";

const FunctionBox = styled.div`
  position: absolute;
  top: 40px;
  left: ${(props) => (props.location ? "440" : "-150")}px;
  width: ${(props) => (props.splitView ? "550" : "950")}px;
  height: 600px;
  opacity: 1 !important;

  .header {
    padding: 0px 0px 0px 22px;
    font-size: 14px;
  }

  .content {
    border: 2px solid black;
    border-radius: 4px;
    width: inherit;
    height: inherit;
  }

  .icon {
    position: absolute;
    top: 14px;
  }
`;

export default FunctionBox;
