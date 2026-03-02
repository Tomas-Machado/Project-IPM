<template>
  <router-view
      :user="user"
      :city-props="comparisonCities"
      :filters="filterParams"

      @login-success="handleLogin"
      @logout="handleLogout"

      @open-cities="updateComparison"
      @show-filter-results="updateFilters"
  />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: null,

      // Estado partilhado que persiste entre as trocas de página
      filterParams: {},
      comparisonCities: { city1: 'Porto', city2: 'Lisboa' }
    }
  },
  methods: {
    handleLogin(userData) {
      this.user = userData;
      // Redireciona para a rota configurada no router.js (home)
      this.$router.push({ name: 'home' });
    },
    handleLogout() {
      this.user = null;
      this.$router.push({ name: 'Login' });
    },

    // Atualiza o estado quando vem de componentes filhos
    updateComparison(citiesObj) {
      this.comparisonCities = citiesObj;
      this.$router.push({ name: 'cities' });
    },
    updateFilters(filters) {
      this.filterParams = filters;
      this.$router.push({ name: 'filter-display' });
    }
  }
}
</script>

<style>
/* =========================================
   CSS GLOBAL E RESET
   ========================================= */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Lato', sans-serif; /* Garante a fonte global */
  background-color: #fcfcfc;
}

#app { height: 100%; width: 100%; }

/* Layout Base (Mobile First ou Base 1080p) */
.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* =========================================
   MEDIA QUERIES (ADAPTAÇÃO DE ECRÃS)
   ========================================= */

/* 1. PARA PORTÁTEIS E ECRÃS MAIS PEQUENOS (Max 1440px)
   Objetivo: Encolher um pouco as coisas para caberem sem scroll */
@media screen and (max-width: 1440px) {
  /* Reduzir o header */
  .top-header { height: 50px !important; }
  .top-header h1 { font-size: 20px !important; }

  /* Ajustar a barra lateral */
  .left-rail { width: 50px !important; padding-top: 70px !important; }
  .rail-item { width: 35px !important; height: 35px !important; }

  /* Ajustar grelhas para caberem melhor */
  .content-split { gap: 10px !important; }
  .listing-card { padding: 8px !important; }
  .card-title { font-size: 14px !important; }

  /* Reduzir tamanho das fotos nos cartões */
  .card-img-wrapper { width: 100px !important; height: 75px !important; }

  /* Ajustar padding geral */
  .view-container { padding: 10px !important; padding-bottom: 70px !important; }
  .filter-results-screen { padding: 10px !important; }
}

/* 2. PARA O TEU ECRÃ 2K OU 4K (Min 2000px)
   Objetivo: Evitar que o site fique "esticado" e pequeno. */
@media screen and (min-width: 2000px) {

  /* Aumentar o tamanho da fonte base */
  html {
    font-size: 18px;
  }

  /* Limitar a largura máxima e centrar no ecrã */
  .app-layout {
    max-width: 2400px;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
    background: white;
  }

  /* Aumentar o Header e Títulos */
  .top-header { height: 80px !important; }
  .top-header h1 { font-size: 32px !important; }

  /* Aumentar a barra lateral */
  .left-rail { width: 70px !important; padding-top: 110px !important; }
  .rail-item { width: 50px !important; height: 50px !important; }
  .rail-item img { width: 28px !important; }

  /* Aumentar os cartões de cidade na Home/Map */
  .city-card { width: 350px !important; }
  .city-photo-thumb { height: 240px !important; }
}

/* =========================================
   ESTILOS GERAIS (Mantidos do teu código original)
   ========================================= */

/* BARRA LATERAL */
.left-rail {
  width: 56px;
  background: #b82321;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 92px;
  z-index: 1000;
  transition: all 0.3s ease;
}
.left-rail ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; }
.rail-item { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 6px; transition: background 0.2s; }
.rail-item:hover { background: rgba(255,255,255,0.1); }
.rail-item.active { background: rgba(255,255,255,0.2); }
.rail-item img { width: 22px; }

/* ÁREA DE CONTEÚDO */
.content-area { flex-grow: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; background-color: var(--bg-beige, #fcfcfc); position: relative; }

/* HEADER */
.top-header { height: 60px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; width: 100%; flex-shrink: 0; position: relative; transition: height 0.3s ease; }
.top-header h1 { margin: 0; color: #333; font-family: sans-serif; font-size: 24px; }
.header-right { position: absolute; right: 30px; display: flex; align-items: center; gap: 15px; top: 50%; transform: translateY(-50%); }
.user-profile-icon { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; cursor: pointer; border: 2px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.header-avatar { width: 100%; height: 100%; object-fit: cover; }
.header-logout { width: 28px; height: 28px; cursor: pointer; transition: transform 0.2s; }
.header-logout:hover { transform: scale(1.1); }

/* CONTAINER DAS PÁGINAS */
.view-container {
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  width: 100%;
  padding-bottom: 80px; /* Espaço para o footer não tapar conteúdo */
}

/* RODAPÉ PRETO */
.site-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1500;
  padding: 0 20px;
}
.footer-inner { width: 100%; max-width: 100%; display: flex; justify-content: space-between; align-items: center; }
.footer-left .copyright { font-size: 14px; white-space: nowrap; }
.footer-right { display: flex; align-items: center; gap: 16px; }
.footer-social { width: 24px; height: 24px; cursor: pointer; }

/* Scrollbar Personalizada */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #b82321; }
</style>