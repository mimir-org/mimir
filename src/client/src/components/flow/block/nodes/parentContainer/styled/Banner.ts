import styled from "styled-components";

interface Props {
  color: string;
}

const Banner = styled.div<Props>`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) => props.color};
  z-index: 15 !important;
`;

export default Banner;
