import styled from "styled-components";

interface Props {
  marginBottom?: number;
}

const HeaderBox = styled.div<Props>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 40)}px;
  display: inline-flex;
  align-items: center;

  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
`;

export default HeaderBox;
