<template>
  <Toast position="center" group="center"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="top-left" group="top-left"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="top-center" group="top-center"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="top-right" group="top-right"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="bottom-left" group="bottom-left"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="bottom-center" group="bottom-center"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
  <Toast position="bottom-right" group="bottom-right"> <template #message="slotProps">
      <ComponenteToastAviso :icone="`icone-toast pi ${this.toastIcon(slotProps.message.severity)}`"
        :titulo="slotProps.message.summary" :detalhe="slotProps.message.detail" />
    </template>
  </Toast>
</template>

<script>
import Toast from 'primevue/toast';
import ComponenteToastAviso from './ComponenteToastAviso.vue';
import { ToastSeverity } from 'primevue/api';

export default {
  name: 'ComponenteToast',
  components: {
    Toast,
    ComponenteToastAviso
  },
  
  methods: {
    toastIcon(severity) {
      switch (severity) {
        case ToastSeverity.ERROR:
          return 'pi-times-circle';
        case ToastSeverity.WARN:
          return 'pi-exclamation-circle';
        case ToastSeverity.INFO:
          return 'pi-info-circle';
        case ToastSeverity.SUCCESS:
          return "pi-check-circle";
      }
    }
  }
}
</script>
