<template>
  <section class="filter-results-screen">

    <div class="results-inner">
      <div class="results-header">
        <h2 class="page-title">{{ currentCity }} <span style="font-size: 16px; font-weight: normal; color: #666">({{ filteredListings.length }} resultados)</span></h2>
        <button class="btn-new-search" @click="$emit('open-filter')">Alterar Filtros</button>
      </div>

      <div class="content-split">

        <div class="listings-container">
          <div v-if="filteredListings.length === 0" class="empty-state"><p>Nenhum resultado encontrado.</p></div>

          <div
              class="listing-card clickable"
              v-for="item in filteredListings"
              :key="item.id"
              @click="highlightMarker(item)"
          >

            <div class="card-img-wrapper">
              <img :src="item.photo" alt="Casa" class="listing-photo">
            </div>

            <div class="card-content">
              <div class="card-info">
                <h3 class="card-title">{{ item.name }}</h3>
                <p class="card-meta">{{ item.room_type }} • {{ item.neighborhood }}</p>
                <div class="card-rating"><span>⭐ 4.5</span><span>(Anfitrião: {{ item.host }})</span></div>
              </div>
              <div class="card-price"><span class="price-val">{{ item.price }}€</span><span class="price-lbl">noite</span></div>
            </div>

          </div>
        </div>

        <div class="map-container">
          <l-map
              v-if="mapCenter.length > 0"
              :key="currentCity"
              ref="map"
              v-model:zoom="zoom"
              :center="mapCenter"
              :use-global-leaflet="false"
              :max-bounds="currentBounds"
              :max-bounds-viscosity="1.0"
              :min-zoom="11"
          >
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>

            <l-marker
                v-for="item in filteredListings"
                :key="item.id"
                :lat-lng="[item.lat, item.lng]"
                ref="markers"
            >
              <l-icon
                  :icon-url="customIcon"
                  :icon-size="[40, 40]"
                  :icon-anchor="[20, 20]"
                  :popup-anchor="[0, -20]"
              />
              <l-popup>
                <div class="popup-content">
                  <img :src="item.photo" style="width:100%; height:80px; object-fit:cover; border-radius:4px; margin-bottom:5px;">
                  <br><b>{{ item.name }}</b><br>
                  {{ item.price }}€ • {{ item.room_type }}
                </div>
              </l-popup>
            </l-marker>

          </l-map>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import * as dbFile from '../data/db.json';

import iconCama from '@/assets/images/cama2.png';
import img1 from '@/assets/images/imagem1.png';
import img2 from '@/assets/images/imagem2.png';
import img3 from '@/assets/images/imagem3.png';
import img4 from '@/assets/images/imagem4.png';

export default {
  name: 'FilterDisplay',
  components: { LMap, LTileLayer, LMarker, LPopup, LIcon },
  props: ['currentView', 'filters'],
  emits: ['go-home', 'open-filter', 'open-comparison', 'open-profile', 'open-map'],
  data() {
    return {
      zoom: 12,
      mapCenter: [],
      currentCity: '',
      currentBounds: null,
      allListings: [],

      customIcon: iconCama,
      houseImages: [img1, img2, img3, img4],

      cityConfig: {
        'Porto': { center: [41.1579, -8.6291], bounds: [[41.12, -8.70], [41.19, -8.55]] },
        'Lisboa': { center: [38.7223, -9.1393], bounds: [[38.69, -9.22], [38.76, -9.10]] },
        'Barcelona': { center: [41.3851, 2.1734], bounds: [[41.35, 2.12], [41.42, 2.22]] }
      }
    }
  },
  watch: {
    filters: {
      handler() { this.loadDataFromDB(); },
      deep: true
    }
  },
  computed: {
    filteredListings() {
      if (!this.allListings.length) return [];
      let minP = 0, maxP = 99999;
      if (this.filters && this.filters.preco) {
        const p = this.filters.preco;
        if (p === '50-100') { minP = 50; maxP = 100; }
        else if (p === '100-200') { minP = 100; maxP = 200; }
        else if (p === '200+') { minP = 200; maxP = 99999; }
      }

      return this.allListings.filter(item => {
        if (item.price < minP || item.price > maxP) return false;
        if (this.filters.tipo && this.filters.tipo !== 'Todos' && this.filters.tipo !== '') {
          if (item.room_type !== this.filters.tipo) return false;
        }
        return true;
      });
    }
  },
  mounted() {
    this.loadDataFromDB();
  },
  methods: {
    loadDataFromDB() {
      const rawData = dbFile.default || dbFile;
      if (!rawData) return;

      this.currentCity = (this.filters && this.filters.cidade) ? this.filters.cidade : 'Porto';

      if (this.cityConfig[this.currentCity]) {
        this.mapCenter = this.cityConfig[this.currentCity].center;
        this.currentBounds = this.cityConfig[this.currentCity].bounds;
      }

      let key = this.currentCity.toLowerCase() + ".listings";
      let source = rawData[key];

      if (!source) {
        this.allListings = [];
        return;
      }

      const tiposPossiveis = ["Entire home/apt", "Private room", "Shared room", "Hotel room"];

      this.allListings = source.map(item => {
        const randomLat = (Math.random() - 0.5) * 0.04;
        const randomLng = (Math.random() - 0.5) * 0.04;

        let rType = item.room_type;
        if (!rType) {
          rType = tiposPossiveis[Math.floor(Math.random() * tiposPossiveis.length)];
        }

        const randomImg = this.houseImages[Math.floor(Math.random() * this.houseImages.length)];

        return {
          id: item.id,
          name: item.name,
          lat: this.cityConfig[this.currentCity].center[0] + randomLat,
          lng: this.cityConfig[this.currentCity].center[1] + randomLng,
          price: item.price !== null ? item.price : 0,
          host: item.host_name,
          room_type: rType,
          neighborhood: item.neighbourhood_group,
          photo: randomImg
        };
      });
    },

    // FUNÇÃO NOVA: Clica no cartão -> Centra Mapa e Abre Popup
    highlightMarker(item) {
      // 1. Centra o mapa na coordenada do item
      this.mapCenter = [item.lat, item.lng];

      // 2. Encontra o marcador correspondente nos refs e abre o popup
      // this.$refs.markers é um array porque usamos v-for
      // Precisamos encontrar o índice correto na lista filtrada
      const index = this.filteredListings.findIndex(x => x.id === item.id);

      if (index !== -1 && this.$refs.markers) {
        // Acede ao componente Vue-Leaflet
        const markerInstance = this.$refs.markers[index];
        // Acede ao objeto Leaflet real (.leafletObject)
        if (markerInstance && markerInstance.leafletObject) {
          markerInstance.leafletObject.openPopup();
        }
      }
    }
  }
}
</script>

<style scoped>
/* CSS GERAL */
.filter-results-screen { display: flex; height: 100%; align-items: center; justify-content: center; background-color: var(--bg-beige); padding: 20px; overflow: hidden; }
.results-inner { width: 100%; max-width: 1200px; height: 100%; display: flex; flex-direction: column; }
.results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-family: var(--font-family-lato); font-size: 28px; color: #333; margin: 0; font-weight: 700; }
.btn-new-search { background: transparent; border: 2px solid var(--text-red); color: var(--text-red); padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.btn-new-search:hover { background: var(--text-red); color: white; }

/* LAYOUT: Lista Esquerda (1fr) / Mapa Direita (1.5fr) */
.content-split {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  padding-bottom: 10px;
}

.map-container { width: 100%; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 1; }
.listings-container { height: 100%; overflow-y: auto; padding-right: 10px; display: flex; flex-direction: column; gap: 15px; }
.empty-state { text-align: center; color: #666; margin-top: 50px; font-size: 18px; }

/* CARTÃO */
.listing-card {
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 4px solid var(--text-red);
  transition: transform 0.1s, background-color 0.2s;
}

/* Efeito de Clique/Hover */
.listing-card.clickable { cursor: pointer; }
.listing-card:hover { transform: translateX(5px); background-color: #fafafa; }

/* IMAGEM */
.card-img-wrapper { width: 120px; height: 90px; flex-shrink: 0; border-radius: 6px; overflow: hidden; }
.listing-photo { width: 100%; height: 100%; object-fit: cover; }

/* CONTEÚDO */
.card-content { flex-grow: 1; display: flex; justify-content: space-between; align-items: center; }
.card-info { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.card-title { margin: 0; font-size: 16px; font-weight: 700; color: #333; line-height: 1.2; }
.card-meta { margin: 0; font-size: 12px; color: #666; }
.card-rating { font-size: 12px; font-weight: bold; color: #333; display: flex; gap: 8px; }
.card-price { text-align: right; display: flex; flex-direction: column; min-width: 60px; }
.price-val { font-size: 20px; font-weight: 900; color: var(--text-red); }
.price-lbl { font-size: 10px; color: #666; }
.popup-content { font-size: 13px; text-align: center; }
</style>