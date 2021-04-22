import GetImg from "../../helpers/GetImg";
import textResources from "../../../../textResources";
import { useHistory } from "react-router-dom";

export const OpenProjectHeader = () => {
  let history = useHistory();
  const goback = () => {
    history.goBack();
  };

  return (
    <div className="open_project_header">
      <GetImg icon="LeftArrowIcon" imgOnClick={() => goback()} />
      <p className="open_project_header_text">
        {textResources.Project_open_project}
      </p>
    </div>
  );
};

export default OpenProjectHeader;
