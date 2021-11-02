import styled from "styled-components";

interface Props {
  equinor: boolean;
}

// TODO: Fix after demo
const CompanyLogoBox = styled.div<Props>`
  position: absolute;
  height: 35px;

  .logo {
    position: relative;
    right: 115px;
    bottom: ${(props) => (props.equinor ? 6 : -3)}px;
  }
`;

export default CompanyLogoBox;
