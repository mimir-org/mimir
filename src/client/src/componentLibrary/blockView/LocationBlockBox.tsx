import styled from "styled-components";

const LocationBlockBox = styled.div`
  width: ${(props: { width: number }) =>
    props.width === 0 ? `100` : props.width + `px`};
  height: ${(props: { height: number }) =>
    props.height === 0 ? `18` : props.height + `px`};
`;

export default LocationBlockBox;
