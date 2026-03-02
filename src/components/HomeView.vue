<template>
  <section class="dashboard-screen">
    <div class="dashboard-inner">

      <div class="dash-card">

        <div class="card-header">Escolha uma opção</div>

        <div class="list-container">
          <ul class="card-list">

            <li class="card-item">
              <img src="@/assets/images/comparacaoDados.png" alt="Comparação" class="card-icon-img">
              <a href="#" class="card-link" @click.prevent="$emit('open-comparison')">
                Comparação de dados
              </a>
            </li>

            <li class="card-item">
              <img src="@/assets/images/filtragemDados.png" alt="Filtragem" class="card-icon-img">
              <a href="#" class="card-link" @click.prevent="$emit('open-filter')">
                Filtragem de dados
              </a>
            </li>

            <li class="card-item">
              <img src="@/assets/images/mapa.png" alt="Mapa" class="card-icon-img">
              <a href="#" class="card-link" @click.prevent="$emit('open-map')">
                Mapa
              </a>
            </li>

          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeView',
  // Removi 'open-cities' daqui, pois já não é chamado diretamente
  emits: ['open-comparison', 'open-map', 'open-filter']
}
</script>

<style scoped>
/* ECRÃ PRINCIPAL - AJUSTADO PARA NÃO FAZER SCROLL */
.dashboard-screen {
  /* 100vh - (80px header + 80px footer) = 160px */
  min-height: calc(100vh - 160px);

  display: flex;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  width: 100%;
  /* Se quiseres garantir que não há overflow acidental: */
  overflow: hidden;
}

.dashboard-inner { width: 100%; display: flex; justify-content: center; }

/* O RESTO MANTÉM-SE IGUAL */
.dash-card { background-color: #b82321; color: #000; border-radius: 12px; width: 100%; max-width: 900px; padding: 60px 40px 80px 40px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: translateY(-20px); }
.card-header { background: rgba(255,255,255,0.9); color: #000; padding: 12px 32px; border-radius: 6px; margin-bottom: 60px; font-size: 24px; font-weight: bold; display: inline-block; }
.list-container { width: 100%; display: flex; justify-content: center; }
.card-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 40px; align-items: flex-start; width: fit-content; }
.card-item { display: flex; align-items: center; gap: 24px; transition: transform 0.2s; cursor: pointer; }
.card-item:hover { transform: translateX(10px); }
.card-icon-img { width: 64px; height: 64px; object-fit: contain; background: #fff; padding: 10px; border-radius: 12px; flex-shrink: 0; }
.card-link { color: #000000; text-decoration: none; font-size: 32px; font-weight: 900; text-align: left; background: rgba(255,255,255,0.6); padding: 4px 16px; border-radius: 4px; white-space: nowrap; }
.card-link:hover { background: rgba(255,255,255,1); }
</style>