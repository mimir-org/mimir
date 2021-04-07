import {
  FragmentParagraph,
  FragmentColumn,
  FragmentInput,
  FragmentContainer,
} from "./styled";

const FragmentData = ({ data }) => {
  const CreateColumn = (start: number, stop: number) => {
    // TODO: Fix when data content is known
    if (stop > data.length) {
      stop = data.length;
    }

    return (
      <FragmentColumn>
        {data.slice(start, stop).map((data) => (
          <>
            <FragmentParagraph key={data.id}>{data.type}</FragmentParagraph>
            <FragmentInput />
          </>
        ))}
      </FragmentColumn>
    );
  };

  return (
    <FragmentContainer>
      {CreateColumn(0, 4)}
      {CreateColumn(4, 8)}
      {CreateColumn(8, 12)}
      {CreateColumn(12, 16)}
    </FragmentContainer>
  );
};

export default FragmentData;
