export const OnInputMenuClick = (showTerminalMenu: (show: boolean) => void, terminalMenu: boolean) => {
  showTerminalMenu(!terminalMenu);
};

export const OnOutputMenuClick = (showTerminalMenu: (show: boolean) => void, terminalMenu: boolean) => {
  showTerminalMenu(!terminalMenu);
};

export const OnBlur = (showInputTerminalMenu: (show: boolean) => void, isInputMenuOpen: boolean) => {
  showInputTerminalMenu(!isInputMenuOpen);
};
