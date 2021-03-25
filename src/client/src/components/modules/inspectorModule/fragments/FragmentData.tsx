import {
  StyledParagraph,
  StyledColumn,
  StyledInput,
  StyledContainer,
} from "./styled";

const FragmentData = ({ data }) => {
  const CreateColumn = (start: number, stop: number) => {
    // Fix when data content is known
    if (stop > data.length) {
      stop = data.length;
    }

    return (
      <StyledColumn>
        {data.slice(start, stop).map((data) => (
          <>
            <StyledParagraph key={data.id}>{data.type}</StyledParagraph>
            <StyledInput />
          </>
        ))}
      </StyledColumn>
    );
  };

  return (
    <StyledContainer>
      {CreateColumn(0, 4)}
      {CreateColumn(4, 8)}
      {CreateColumn(8, 12)}
      {CreateColumn(12, 16)}
    </StyledContainer>
  );
};

export default FragmentData;
