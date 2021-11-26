import styled from "styled-components";
interface Props {
  hasChildren: boolean;
}

const LogoBox = styled.div<Props>`
  pointer-events: none;
  position: absolute;
  top: 5px;
  left: ${(props) => (props.hasChildren ? 35 : 15)}px;
  width: 53px;

  img {
    width: inherit;
    filter: saturate(0%);
  }
`;

export default LogoBox;
