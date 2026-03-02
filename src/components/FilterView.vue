<template>
  <section class="filter-screen">

    <nav class="left-rail" aria-label="Navigation rail">
      <ul>
        <li class="rail-item" title="Home" @click="$emit('go-home')">
          <img src="@/assets/images/homeBarraTarefas.png" alt="Home">
        </li>
        <li class="rail-item active" title="Filtragem">
          <img src="@/assets/images/filtragemBarraTarefas.png" alt="Filter">
        </li>
        <li class="rail-item" title="Comparação" @click="$emit('open-comparison')">
          <img src="@/assets/images/comparacaoBarraTarefas.png" alt="Compare">
        </li>
        <li class="rail-item" title="Mapa" @click="$emit('open-map')">
          <img src="@/assets/images/mapaBarraTarefas.png" alt="Map">
        </li>
        <li class="rail-item" title="Perfil" @click="$emit('open-profile')">
          <img src="@/assets/images/profileBarraTarefas.png" alt="Profile">
        </li>
      </ul>
    </nav>

    <div class="filter-inner">
      <div class="filter-box">

        <h2 class="filter-title">Filtragem de dados</h2>

        <form class="filtro-form" @submit.prevent="aplicarFiltro">

          <div class="filtro-row">
            <select class="filtro-select" v-model="filtros.cidade" required>
              <option value="" disabled>Cidade</option>
              <option>Porto</option>
              <option>Lisboa</option>
              <option>Barcelona</option>
            </select>
          </div>

          <div class="filtro-row">
            <select class="filtro-select" v-model="filtros.tipo" required>
              <option value="" disabled>Tipo de Alojamento</option>
              <option>Entire home/apt</option>
              <option>Private room</option>
              <option>Shared room</option>
            </select>
          </div>

          <div class="filtro-row">
            <select class="filtro-select" v-model="filtros.preco" required>
              <option value="" disabled>Faixa de Preço</option>
              <option value="50-100">50€ a 100€</option>
              <option value="100-200">100€ a 200€</option>
              <option value="200+">Mais de 200€</option>
            </select>
          </div>

          <button type="submit" class="btn-pesquisar">
            Pesquisar
          </button>

        </form>

      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'FilterView',
  // NOVO EVENTO: Vai para a página de resultados, levando os dados consigo
  emits: ['go-home', 'open-comparison', 'open-map', 'open-profile', 'show-filter-results'],
  data() {
    return {
      filtros: {
        cidade: "",
        tipo: "",
        preco: ""
      }
    }
  },
  methods: {
    aplicarFiltro() {
      // 1. Verificação de dados:
      // O 'required' no HTML trata de prevenir o submit com campo vazio.
      // A função só será executada se todos os campos tiverem um valor.

      // No entanto, para ser seguro: se o valor for "" (o do placeholder), bloqueia.
      if (this.filtros.cidade === "" || this.filtros.tipo === "" || this.filtros.preco === "") {
        alert("Por favor, selecione uma opção em cada filtro.");
        return;
      }

      // 2. Se a validação do HTML e JS passar, EMITE O EVENTO
      this.$emit('show-filter-results', this.filtros);
    }
  }
}
</script>

<style scoped>
/* BARRA LATERAL (MANTIDA) */
.left-rail { position: fixed; left: 0; top: 0; bottom: 64px; width: 56px; background: #b82321; display: flex; align-items: flex-start; padding-top: 20px; z-index: 1200; }
.left-rail ul { list-style: none; margin: 0; padding: 0; width: 100%; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.left-rail .rail-item { width: 40px; height: 40px; background: transparent; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; transition: transform .12s ease, background .12s ease; }
.left-rail .rail-item img { width: 22px; height: 22px; object-fit: contain; }
.left-rail .rail-item.active { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

/* ECRÃ DE FILTRAGEM - AJUSTADO PARA NÃO FAZER SCROLL */
.filter-screen {
  display: flex;
  /* Altura exata disponível */
  min-height: calc(100vh - 160px);

  align-items: center;
  justify-content: center;
  background-color: var(--bg-beige);
  /* Remove padding-bottom extra que causava scroll */
  padding: 0;
}

.filter-inner { width: 100%; display: flex; justify-content: center; padding-left: 56px; }
.filter-box { width: 500px; max-width: 90%; background: #b82321; border-radius: 12px; padding: 50px 40px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.filter-title { font-family: var(--font-family-lato); font-size: 32px; color: #fff; font-weight: bold; margin-bottom: 40px; margin-top: 0; letter-spacing: 1px; }
.filtro-form { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 25px; }
.filtro-row { width: 100%; display: flex; justify-content: center; }
.filtro-select { width: 100%; max-width: 350px; padding: 14px 20px; border-radius: 8px; border: none; background: #ffedcb; font-family: var(--font-family-lato); font-size: 18px; font-weight: 600; color: #333; cursor: pointer; text-align: left; outline: none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
.filtro-select option { background: #fff; color: #333; }
.btn-pesquisar { margin-top: 20px; background: #fff; border: none; padding: 12px 40px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 12px; font-size: 20px; font-weight: 700; color: #111; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s; }
.btn-pesquisar:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.2); }
.btn-icon { width: 24px; height: 24px; object-fit: contain; }
</style>