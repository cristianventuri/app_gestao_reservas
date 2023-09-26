<template>
  <div class="conteudo-toast">
    <span :class="this.icone"></span>
    <div class="detalhe-toast">
      <span class="titulo">{{ this.titulo }}</span>
      <span class="detalhe">{{ this.detalhe }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponenteToastAviso',
  props: {
    icone: String,
    titulo: String,
    detalhe: String,
  }
}
</script>

<style lang="scss">
.conteudo-toast {
  flex: 1;
  display: grid;
  grid-template-columns: 2rem auto;
  gap: 1.5rem;

  .icone-toast {
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detalhe-toast {
    display: grid;
    grid-template-rows: 1rem auto;
    gap: .4rem;

    .titulo {
      font-size: 1rem;
      font-weight: 500;
    }

    .detalhe {
      font-size: .85rem;
    }
  }
}
</style>