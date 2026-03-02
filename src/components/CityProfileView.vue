<template>
  <section class="city-profile-screen">

    <nav class="left-rail" aria-label="Navigation rail">
      <ul>
        <li class="rail-item" :class="{ active: currentView === 'home' }" title="Home" @click="$emit('go-home')">
          <img src="@/assets/images/homeBarraTarefas.png" alt="Home">
        </li>
        <li class="rail-item" :class="{ active: currentView === 'filter' }" title="Filtragem" @click="$emit('open-filter')">
          <img src="@/assets/images/filtragemBarraTarefas.png" alt="Filter">
        </li>
        <li class="rail-item" :class="{ active: currentView === 'comparison' || currentView === 'cities' }" title="Comparação" @click="$emit('open-comparison')">
          <img src="@/assets/images/comparacaoBarraTarefas.png" alt="Compare">
        </li>
        <li class="rail-item active" :class="{ active: currentView === 'map' || currentView === 'city-profile' }" title="Mapa" @click="$emit('open-map')">
          <img src="@/assets/images/mapaBarraTarefas.png" alt="Map">
        </li>
        <li class="rail-item" :class="{ active: currentView === 'user-profile' }" title="Perfil" @click="$emit('open-profile')">
          <img src="@/assets/images/profileBarraTarefas.png" alt="Profile">
        </li>
      </ul>
    </nav>

    <div class="profile-inner">

      <div class="header-content-left">
        <div class="title-row">
          <h1 class="city-title-large">{{ cityName }}</h1>
          <img :src="selectedCityData.flag" class="city-flag-large" alt="Bandeira">
        </div>
      </div>

      <div class="profile-content-grid">

        <div class="col-image">
          <div class="map-wrapper-large">
            <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="[selectedCityData.coords.lat, selectedCityData.coords.lng]"
                :use-global-leaflet="false"
                :max-bounds="selectedCityData.bounds"
                :max-bounds-viscosity="1.0"
                :min-zoom="11"
            >
              <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
              ></l-tile-layer>
            </l-map>
          </div>
          <button class="btn-back" @click="$emit('open-map')">Voltar ao Mapa Geral</button>
        </div>

        <div class="col-data">

          <div class="data-group">
            <h2 class="section-title">Atividade Recente</h2>
            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-value">{{ currentStats.avgNights }}</span>
                <span class="stat-label"> Noites (Média)</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ currentStats.pricePerNight }}€</span>
                <span class="stat-label"> Preço/noite</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ currentStats.avgRevenue }}€</span>
                <span class="stat-label"> Rendimento</span>
              </div>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="data-group">
            <h2 class="section-title">Anfitriões</h2>
            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-value">{{ currentStats.multipleListings.unique }}</span>
                <span class="stat-label"> Propriedades Únicas</span>
              </div>
              <div class="stat-item">
                <span class="stat-value" style="color: var(--text-red)">{{ currentStats.multipleListings.count }}</span>
                <span class="stat-label"> Múltiplas Listagens</span>
              </div>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="data-group chart-group">
            <h2 class="section-title">Tipos de Alojamento</h2>
            <div class="chart-wrapper">
              <ChartRoomType
                  v-if="currentStats.roomTypes"
                  :dataValues="currentStats.roomTypes"
              />
              <p v-else>Dados não disponíveis.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
// Removi LMarker e LPopup pois já não são usados
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import ChartRoomType from './ChartRoomType.vue';
import * as dbFile from '../data/db.json';

import imgPorto from '@/assets/images/FotoPorto.png';
import imgLisboa from '@/assets/images/FotoLisboa.png';
import imgBarcelona from '@/assets/images/FotoBarcelona.png';
import flagPT from '@/assets/images/BandeiraPortugal.png';
import flagES from '@/assets/images/BandeiraEspanha.png';

export default {
  name: 'CityProfileView',
  components: { LMap, LTileLayer, ChartRoomType },
  props: ['currentView', 'cityName'],
  emits: ['go-home', 'open-filter', 'open-comparison', 'open-profile', 'open-map'],
  data() {
    return {
      zoom: 12,
      listingsData: [],

      imagesDatabase: {
        'Porto': {
          coords: { lat: 41.1579, lng: -8.6291 },
          bounds: [[41.12, -8.70], [41.19, -8.55]],
          flag: flagPT, photo: imgPorto
        },
        'Lisboa': {
          coords: { lat: 38.7223, lng: -9.1393 },
          bounds: [[38.69, -9.22], [38.76, -9.10]],
          flag: flagPT, photo: imgLisboa
        },
        'Barcelona': {
          coords: { lat: 41.3851, lng: 2.1734 },
          bounds: [[41.35, 2.12], [41.42, 2.22]],
          flag: flagES, photo: imgBarcelona
        }
      }
    }
  },
  computed: {
    selectedCityData() {
      return this.imagesDatabase[this.cityName] || this.imagesDatabase['Porto'];
    },
    currentStats() {
      if (!this.listingsData.length) {
        return { avgNights: 0, pricePerNight: 0, avgRevenue: 0, multipleListings: { unique: 0, count: 0 }, roomTypes: {} };
      }

      let totalNights = 0, totalPrice = 0, totalRevenue = 0;
      let types = { entire: 0, private: 0, shared: 0, hotel: 0 };
      let hostCounts = {};

      this.listingsData.forEach(item => {
        totalNights += item.simulatedNights;
        totalPrice += item.price;
        totalRevenue += item.simulatedRevenue;

        if (item.room_type.includes("Entire")) types.entire++;
        else if (item.room_type.includes("Private")) types.private++;
        else if (item.room_type.includes("Shared")) types.shared++;
        else if (item.room_type.includes("Hotel")) types.hotel++;

        const h = item.host || "unknown";
        hostCounts[h] = (hostCounts[h] || 0) + 1;
      });

      const count = this.listingsData.length;

      let uniqueHosts = 0;
      let multipleListingsCount = 0;
      Object.values(hostCounts).forEach(c => {
        if (c === 1) uniqueHosts++;
        else multipleListingsCount += c;
      });

      return {
        avgNights: Math.round(totalNights / count),
        pricePerNight: Math.round(totalPrice / count),
        avgRevenue: Math.round(totalRevenue / count).toLocaleString(),
        multipleListings: {
          unique: uniqueHosts,
          count: multipleListingsCount
        },
        roomTypes: types
      };
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    cityName() { this.loadData(); }
  },
  methods: {
    loadData() {
      const rawData = dbFile.default || dbFile;
      const key = this.cityName.toLowerCase() + ".listings";
      const source = rawData[key] || [];

      const tiposPossiveis = ["Entire home/apt", "Private room", "Shared room", "Hotel room"];

      // Processamento (Mantive a simulação de dados em falta, mas removi a geração de Lat/Lng pois não precisamos dela para o mapa vazio)
      this.listingsData = source.map(item => {

        // Simular tipo de quarto se não existir
        let rt = item.room_type;
        if (!rt) {
          const idNum = item.id.toString().charCodeAt(0);
          rt = tiposPossiveis[idNum % 4];
        }

        // Simular Noites e Revenue para as estatísticas
        const nights = Math.floor(Math.random() * 150) + 50;
        const price = parseFloat(item.price || 0);

        return {
          id: item.id,
          name: item.name,
          host: item.host_name,
          price: price,
          room_type: rt,
          simulatedNights: nights,
          simulatedRevenue: price * nights
        };
      });
    }
  }
}
</script>

<style scoped>
/* ESTRUTURA GERAL */
.left-rail {position: fixed;left: 0;top: 0 !important;bottom: 0 !important;height: 100vh !important;width: 56px;background: #b82321;display: flex;align-items: flex-start;padding-top: 92px;z-index: 9999;box-sizing: border-box;margin: 0 !important;}
.left-rail ul { list-style: none; margin: 0; padding: 0; width: 100%; display: flex; flex-direction: column; gap: 14px; align-items: center; }
.left-rail .rail-item { width: 40px; height: 40px; background: transparent; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; transition: transform .12s ease, background .12s ease; }
.left-rail .rail-item img { width: 22px; height: 22px; object-fit: contain; }
.left-rail .rail-item.active { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

.city-profile-screen {
  /* Removemos o padding esquerdo exagerado pq a barra já não está "por cima" */
  display: flex;
  height: 100%; /* Adapta-se ao pai */
  align-items: center;
  justify-content: center;
  background-color: var(--bg-beige);
  padding: 20px; /* Padding normal */
  overflow: hidden;
}
.profile-inner { width: 100%; max-width: 1400px; margin: 0 auto; height: 90%; display: flex; flex-direction: column; }

/* HEADER */
.header-content-left {
  width: 100%;
  margin-bottom: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: auto;
  padding-left: 0;
}

.city-title-large { font-family: var(--font-family-lato); color: var(--text-red); font-size: 48px; font-weight: 900; margin: 0; text-transform: uppercase; line-height: 1; }
.city-flag-large { width: 50px; height: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

/* GRID PRINCIPAL */
.profile-content-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 50px; height: 100%; overflow: hidden; }

/* COLUNA ESQUERDA (MAPA) */
.col-image { display: flex; flex-direction: column; gap: 10px; height: 100%; }
.map-wrapper-large { width: 100%; flex-grow: 1; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.15); z-index: 1; }
.btn-back { align-self: flex-start; margin-top: 5px; background: transparent; border: 2px solid #333; color: #333; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px; transition: all 0.2s; }
.btn-back:hover { background: #333; color: #fff; }

/* COLUNA DIREITA (DADOS) */
.col-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 10px;
}

.section-title {
  font-family: var(--font-family-lato);
  color: #333;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-left: 4px solid var(--text-red);
  padding-left: 10px;
  text-align: left;
}

/* FORMATACAO DOS NÚMEROS */
.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-width: 80px;
}

.stat-value {
  font-family: var(--font-family-league-gothic);
  color: #222;
  font-size: 56px;
  line-height: 0.9;
  display: block;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 5px;
  display: block;
}

.stat-divider { height: 1px; background: rgba(0,0,0,0.1); width: 100%; margin: 5px 0; }

.chart-wrapper {
  background: rgba(255,255,255,0.5);
  padding: 15px;
  border-radius: 12px;
}
</style>