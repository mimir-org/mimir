import { memo, useEffect } from "react";
import { Elements, useStoreActions } from "react-flow-renderer";

interface Props {
  elements: Elements;
  selectedIds: string[];
}

const FlowManipulator = ({ elements, selectedIds }: Props) => {
  const setSelected = useStoreActions((state) => state.setSelectedElements);

  useEffect(() => {
    if (elements) {
      setSelected(elements.filter((ele) => selectedIds.find((id) => ele.id === id)));
    }
  }, [elements, selectedIds, setSelected]);

  return null;
};

export default memo(FlowManipulator);
