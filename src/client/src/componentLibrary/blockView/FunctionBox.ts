import styled from "styled-components";

const FunctionBox = styled.div`
  display: inline-flex;
  margin-top: 60px;

  &:first-child {
    margin-left: -80px;
  }

  .header {
    top: 23px;
    padding: 0px 0px 0px 22px;
    font-size: 14px;
    position: absolute;
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
    top: 37px;
  }
`;

export default FunctionBox;
