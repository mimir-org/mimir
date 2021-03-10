interface Props {
  title: string;
}

const TreeviewHeader = ({ title }: Props) => (
  <div className="heading">
    <p>{title}</p>
  </div>
);

export default TreeviewHeader;
