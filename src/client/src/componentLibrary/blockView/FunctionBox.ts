import styled from "styled-components";

const FunctionBox = styled.div`
  margin-top: 60px;

  .header {
    display: flex;
    margin-bottom: 8px;
    padding: 0px 0px 0px 25px;
    font-size: 14px;
  }

  .content {
    border: 2px solid black;
    border-radius: 4px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
  }

  .icon {
    position: absolute;
  }
`;

export default FunctionBox;
