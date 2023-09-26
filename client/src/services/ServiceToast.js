import { ToastSeverity } from 'primevue/api';
import app from '../main';
export function info(title = 'INFO', body = 'Conteúdo Mensagem', position = "bottom-right", lifeTime = 5000) {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.INFO, summary: title, detail: body, life: lifeTime, position: position, group: position });
};
export function error(title = 'ERROR', body = 'Conteúdo Mensagem', position = "bottom-right", lifeTime = 5000) {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: lifeTime, position: position, group: position });
};
export function success(title = 'SUCCESS', body = 'Conteúdo Mensagem', position = "bottom-right", lifeTime = 5000) {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.SUCCESS, summary: title, detail: body, life: lifeTime, position: position, group: position });
};
export function warn(title = 'WARN', body = 'Conteúdo Mensagem', position = "bottom-right", lifeTime = 5000) {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.WARN, summary: title, detail: body, life: lifeTime, position: position, group: position });
};