import styled from "styled-components";

interface Props {
  marginBottom?: number;
}

const HeaderBox = styled.div<Props>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 32)}px;
  display: inline-flex;
  align-items: center;
  margin: 9px 0px 10px 0px;

  .icon {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
  }
`;

export default HeaderBox;
