import app from '../main';
export function confirm(titulo, message, icon, fnConfirm, fnReject, fnShow, fnHide) {
  app.config.globalProperties.$confirm.require({
    icon: icon,
    header: titulo,
    message: message,
    accept: fnConfirm,
    reject: fnReject,
    onShow: fnShow,
    onHide: fnHide,
    acceptIcon: 'pi pi-check',
    acceptLabel: 'Confirmar',
    acceptClass: 'p-button-primary p-button-rounded p-button-sm p-button-text',
    rejectIcon: 'pi pi-times',
    rejectLabel: 'Cancelar',
    rejectClass: 'p-button-danger p-button-rounded p-button-sm p-button-text',
  });
};
