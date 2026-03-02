<template>
  <div class="app-layout">

    <nav class="left-rail">
      <ul>
        <li class="rail-item" :class="{ active: isActive('home') }" @click="goTo('home')" title="Home">
          <img src="@/assets/images/homeBarraTarefas.png" alt="Home">
        </li>
        <li class="rail-item" :class="{ active: isActive('filter') }" @click="goTo('filter')" title="Filtragem">
          <img src="@/assets/images/filtragemBarraTarefas.png" alt="Filter">
        </li>
        <li class="rail-item" :class="{ active: isActive('comparison') }" @click="goTo('comparison')" title="Comparação">
          <img src="@/assets/images/comparacaoBarraTarefas.png" alt="Compare">
        </li>
        <li class="rail-item" :class="{ active: isActive('map') }" @click="goTo('map')" title="Mapa">
          <img src="@/assets/images/mapaBarraTarefas.png" alt="Map">
        </li>
        <li class="rail-item" :class="{ active: isActive('profile') }" @click="goTo('user-profile')" title="Perfil">
          <img src="@/assets/images/profileBarraTarefas.png" alt="Profile">
        </li>
      </ul>
    </nav>

    <main class="content-area">

      <header class="top-header">
        <h1>AirBnb Dashboard</h1>
        <div class="header-right">
          <div class="user-profile-icon" @click="goTo('user-profile')" title="Ir para Perfil">
            <img
                :src="(user && user.avatar) ? user.avatar : defaultAvatar"
                alt="User Avatar"
                class="header-avatar"
            >
          </div>
          <img
              src="@/assets/images/encerrarSessao.png"
              alt="Logout"
              class="header-logout"
              @click="$emit('logout')"
              title="Sair"
          >
        </div>
      </header>

      <div class="view-container">
        <router-view
            :user="user"
            :filters="filters"
            :city-props="cityProps"

            @open-map="goTo('map')"
            @open-filter="goTo('filter')"
            @open-comparison="goTo('comparison')"
            @open-profile="goTo('user-profile')"
            @go-home="goTo('home')"

            @open-city-profile="handleCityProfile"
            @open-cities="$emit('open-cities', $event)"
            @show-filter-results="$emit('show-filter-results', $event)"
            @logout="$emit('logout')"
        />
      </div>

      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-left"><div class="copyright">© 2025 Airbnb, Inc.</div></div>
          <div class="footer-right">
            <img src="@/assets/images/instagram.png" alt="Instagram" class="footer-social">
            <img src="@/assets/images/facebook2.png" alt="Facebook" class="footer-social">
            <img src="@/assets/images/twitter.png" alt="X" class="footer-social">
            <img src="@/assets/images/gmail.png" alt="Gmail" class="footer-social">
          </div>
        </div>
      </footer>

    </main>
  </div>
</template>

<script>
import imgDefault from '@/assets/images/utilizador.png';

export default {
  name: 'DashBoard',
  props: ['user', 'filters', 'cityProps'],
  emits: ['logout', 'open-cities', 'show-filter-results'],
  data() {
    return {
      defaultAvatar: imgDefault
    }
  },
  methods: {
    goTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
    isActive(group) {
      const current = this.$route.name;
      if (group === 'home') return current === 'home';
      if (group === 'map') return ['map', 'city-profile'].includes(current);
      if (group === 'filter') return ['filter', 'filter-display'].includes(current);
      if (group === 'comparison') return ['comparison', 'cities'].includes(current);
      if (group === 'profile') return current === 'user-profile';
      return false;
    },
    handleCityProfile(cityName) {
      this.$router.push({ name: 'city-profile', params: { cityName: cityName } });
    }
  }
}
</script>

<style scoped>
.app-layout { display: flex; width: 100vw; height: 100vh; }

/* BARRA LATERAL */
.left-rail { width: 56px; background: #b82321; height: 100vh; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 92px; z-index: 1000; }
.left-rail ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; }
.rail-item { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 6px; transition: background 0.2s; }
.rail-item:hover { background: rgba(255,255,255,0.1); }
.rail-item.active { background: rgba(255,255,255,0.2); }
.rail-item img { width: 22px; }

/* ÁREA DE CONTEÚDO */
.content-area { flex-grow: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; background-color: var(--bg-beige, #fcfcfc); position: relative; }

/* HEADER */
.top-header { height: 60px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; width: 100%; flex-shrink: 0; position: relative; }
.top-header h1 { margin: 0; color: #333; font-family: sans-serif; }
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
  /* IMPORTANTE: Adiciona espaço no fundo para o conteúdo não ficar escondido atrás da barra preta */
  padding-bottom: 80px;
}

/* RODAPÉ PRETO (CSS RECOLOCADO) */
.site-footer {
  position: absolute; /* Fixa no fundo da área de conteúdo */
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
</style>