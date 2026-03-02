<template>
  <section class="map-screen">

    <nav class="left-rail" aria-label="Navigation rail">
      <ul>
        <li class="rail-item" title="Home" @click="$emit('go-home')">
          <img src="@/assets/images/homeBarraTarefas.png" alt="Home">
        </li>
        <li class="rail-item" title="Filtragem" @click="$emit('open-filter')">
          <img src="@/assets/images/filtragemBarraTarefas.png" alt="Filter">
        </li>
        <li class="rail-item" title="Comparação" @click="$emit('open-comparison')">
          <img src="@/assets/images/comparacaoBarraTarefas.png" alt="Compare">
        </li>
        <li class="rail-item active" title="Mapa" @click="$emit('open-map')">
          <img src="@/assets/images/mapaBarraTarefas.png" alt="Map">
        </li>
        <li class="rail-item" title="Perfil" @click="$emit('open-profile')">
          <img src="@/assets/images/profileBarraTarefas.png" alt="Profile">
        </li>
      </ul>
    </nav>

    <div class="map-inner">

      <div class="city-select-block">
        <h2 class="block-title">Selecione uma Cidade</h2>

        <div class="city-cards-container">

          <div class="city-card" @click="selectCity('Porto')">
            <img src="@/assets/images/FotoPorto.png" alt="Porto" class="city-photo-thumb">
            <span class="city-label">PORTO</span>
            <img src="@/assets/images/BandeiraPortugal.png" alt="PT" class="city-flag">
          </div>

          <div class="city-card" @click="selectCity('Lisboa')">
            <img src="@/assets/images/FotoLisboa.png" alt="Lisboa" class="city-photo-thumb">
            <span class="city-label">LISBOA</span>
            <img src="@/assets/images/BandeiraPortugal.png" alt="PT" class="city-flag">
          </div>

          <div class="city-card" @click="selectCity('Barcelona')">
            <img src="@/assets/images/FotoBarcelona.png" alt="Barcelona" class="city-photo-thumb">
            <span class="city-label">BARCELONA</span>
            <img src="@/assets/images/BandeiraEspanha.png" alt="ES" class="city-flag">
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'MapView',
  emits: ['go-home', 'open-filter', 'open-comparison', 'open-map', 'open-profile', 'open-city-profile'],
  methods: {
    selectCity(city) {
      this.$emit('open-city-profile', city);
    }
  }
}
</script>

<style scoped>
/* BARRA LATERAL */
.left-rail { position: fixed; left: 0; top: 0; bottom: 64px; width: 56px; background: #b82321; display: flex; align-items: flex-start; padding-top: 92px; z-index: 1200; }
.left-rail ul { list-style: none; margin: 0; padding: 0; width: 100%; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.left-rail .rail-item { width: 40px; height: 40px; background: transparent; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; transition: transform .12s ease, background .12s ease; }
.left-rail .rail-item img { width: 22px; height: 22px; object-fit: contain; }
.left-rail .rail-item.active { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

/* ECRÃ MAPA */
.map-screen {
  display: flex;
  min-height: calc(100vh - 160px);
  align-items: center;
  justify-content: center;
  background-color: var(--bg-beige);
}

.map-inner {
  width: calc(100% - 56px); margin-left: 56px;
  display: flex; justify-content: center; align-items: center;
}

/* BLOCO DE SELEÇÃO */
.city-select-block {
  width: 95%; max-width: 1200px; background-color: var(--text-red);
  padding: 100px 60px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center; display: flex; flex-direction: column; justify-content: flex-start;
}

/* TÍTULO CORRIGIDO: Agora alinhado ao centro */
.block-title {
  font-family: var(--font-family-lato);
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 30px;
  align-self: center; /* ANTES estava flex-start */
}

.city-cards-container { display: flex; gap: 30px; justify-content: space-around; width: 100%; align-items: center; }

/* CARTÕES DE CIDADE */
.city-card {
  display: flex; flex-direction: column; align-items: center;
  width: 250px;
  background-color: white;
  color: #333;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  border: 3px solid transparent;
}

.city-card:hover { transform: translateY(-10px); box-shadow: 0 8px 18px rgba(0,0,0,0.4); }

.city-photo-thumb { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; }
.city-label { font-family: var(--font-family-league-gothic); font-size: 28px; color: var(--text-red); text-transform: uppercase; line-height: 1; margin-bottom: 6px; }
.city-flag { width: 35px; height: auto; border: 1px solid rgba(0,0,0,0.1); }
</style>