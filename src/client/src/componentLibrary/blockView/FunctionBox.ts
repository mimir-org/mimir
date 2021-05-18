import styled from "styled-components";

const FunctionBox = styled.div`
  display: inline-block;
  margin-top: 60px;

  .header {
    display: initial;
    margin-bottom: 8px;
    padding: 0px 0px 0px 25px;
    font-size: 14px;
  }

  .content {
    border: 2px solid black;
    border-radius: 4px;
    margin-right: 15px;
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
