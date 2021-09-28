interface Props {
  qualifier: string;
  source: string;
  condition: string;
}

export default function ParameterDescriptor({
  qualifier,
  source,
  condition,
}: Props) {
  return (
    <div className="descriptors">
      <div className="descriptors-top">
        <div>Qualifier</div>
        <div>Source</div>
        <div>Condition</div>
      </div>
      <hr />
      <div className="descriptors-bottom">
        <div>{qualifier}</div>
        <div>{source}</div>
        <div>{condition}</div>
      </div>
    </div>
  );
}
