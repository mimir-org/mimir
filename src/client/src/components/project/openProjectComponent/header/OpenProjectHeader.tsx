import { GetIcon } from "../../helpers";
import { TextResources } from "../../../../assets/textResources";
import { useHistory } from "react-router-dom";

export const OpenProjectHeader = () => {
  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="open_project_header">
      <GetIcon icon="LeftArrowIcon" onClick={() => goBack()} />
      <p className="open_project_header_text">
        {TextResources.Project_open_project}
      </p>
    </div>
  );
};

export default OpenProjectHeader;
