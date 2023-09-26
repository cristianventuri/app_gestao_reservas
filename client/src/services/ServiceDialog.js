import app from '../main';
export function dynamicDialog(componente, dialogTitle, options = {}) {
  options.props = options.props || {};
  options.props.header = dialogTitle || '';
  app.config.globalProperties.$dialog.open(componente, options);
};
