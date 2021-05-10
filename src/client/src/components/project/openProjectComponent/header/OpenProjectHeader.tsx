import { GetIcon } from "../../helpers";
import { TextResources } from "../../../../assets/textResources";

export const OpenProjectHeader = () => {
  return (
    <div className="open_project_header">
      <GetIcon icon="LeftArrowIcon" />
      <p className="open_project_header_text">
        {TextResources.Project_open_project}
      </p>
    </div>
  );
};

export default OpenProjectHeader;
