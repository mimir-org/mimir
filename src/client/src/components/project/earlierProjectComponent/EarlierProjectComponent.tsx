import { LeftArrowIcon } from "../../../assets";

export const EarlierProjectComponent = () => {
  return (
    <div className="earlier_project_container">
      <div className="earlier_project_content">
        <div className="earlier_project_header">
          <img className="back_icon" src={LeftArrowIcon} alt="go-back-icon" />
          <p className="earlier_project_header_text">Open earlier project</p>
        </div>
        <div>Search projects component</div>
        <div>Recent projects component</div>
        <div>Open project button</div>
      </div>
    </div>
  );
};

export default EarlierProjectComponent;
