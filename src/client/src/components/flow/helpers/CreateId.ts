import Config from "../../../models/Config";

const CreateId = () => {
  function _p8(s: boolean) {
    const p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }

  return `${Config.COMPANY}_${_p8(false)}${_p8(true)}${_p8(true)}${_p8(false)}`;
};

export default CreateId;
