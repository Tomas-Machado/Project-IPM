<template>
  <section class="comparison-screen">

    <div class="comp-inner">

      <div class="comp-header">
        <h2 class="page-title">Comparação de Mercado</h2>
        <button class="btn-back" @click="$emit('open-comparison')">Nova Comparação</button>
      </div>

      <div class="comparison-grid">

        <div class="city-col">
          <div class="city-header">
            <img :src="getCityConfig(cityProps.city1).flag" class="comp-flag">
            <h3 class="comp-city-name">{{ cityProps.city1 }}</h3>
          </div>

          <div class="stats-card">
            <div class="stat-row">
              <span class="lbl">Preço Médio</span>
              <span class="val">{{ city1Stats.avgPrice }}€</span>
            </div>
            <div class="stat-row">
              <span class="lbl">Rendimento (Est.)</span>
              <span class="val">{{ city1Stats.avgRevenue }}€</span>
            </div>
          </div>

          <div class="charts-row">
            <div class="chart-card">
              <h4 class="chart-title">Alojamento</h4>
              <ChartDoughnut :dataValues="city1Stats.roomTypes" />
            </div>

            <div class="chart-card">
              <h4 class="chart-title">Licenças</h4>
              <ChartLicense :dataValues="city1Stats.licenses" />
            </div>
          </div>

          <div class="export-wrapper">
            <button class="btn-export" @click="openExportModal(cityProps.city1, city1Stats)">
              Exportar Dados
              <img src="@/assets/images/exportar.png" class="icon-export">
            </button>
          </div>
        </div>

        <div class="vs-divider">
          <span class="vs-text">VS</span>
        </div>

        <div class="city-col">
          <div class="city-header">
            <img :src="getCityConfig(cityProps.city2).flag" class="comp-flag">
            <h3 class="comp-city-name">{{ cityProps.city2 }}</h3>
          </div>

          <div class="stats-card">
            <div class="stat-row">
              <span class="lbl">Preço Médio</span>
              <span class="val">{{ city2Stats.avgPrice }}€</span>
            </div>
            <div class="stat-row">
              <span class="lbl">Rendimento (Est.)</span>
              <span class="val">{{ city2Stats.avgRevenue }}€</span>
            </div>
          </div>

          <div class="charts-row">
            <div class="chart-card">
              <h4 class="chart-title">Alojamento</h4>
              <ChartDoughnut :dataValues="city2Stats.roomTypes" />
            </div>

            <div class="chart-card">
              <h4 class="chart-title">Licenças</h4>
              <ChartLicense :dataValues="city2Stats.licenses" />
            </div>
          </div>

          <div class="export-wrapper">
            <button class="btn-export" @click="openExportModal(cityProps.city2, city2Stats)">
              Exportar Dados
              <img src="@/assets/images/exportar.png" class="icon-export">
            </button>
          </div>
        </div>

      </div>

    </div>

    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-box">
        <h3 class="modal-title">Exportar dados de {{ cityToExport }}</h3>
        <p class="modal-desc">Escolha o formato do ficheiro:</p>

        <div class="modal-actions">
          <button class="btn-format" @click="downloadFile('csv')">CSV (.csv)</button>
          <button class="btn-format" @click="downloadFile('json')">JSON (.json)</button>
        </div>

        <button class="btn-cancel" @click="closeModal">Cancelar</button>
      </div>
    </div>

  </section>
</template>

<script>
import ChartDoughnut from './ChartDoughnut.vue';
import ChartLicense from './ChartLicense.vue';
import * as dbFile from '../data/db.json';

import flagPT from '@/assets/images/BandeiraPortugal.png';
import flagES from '@/assets/images/BandeiraEspanha.png';

export default {
  name: 'ComparisonCitiesView',
  components: { ChartDoughnut, ChartLicense },
  props: ['cityProps'],
  emits: ['open-comparison'],
  data() {
    return {
      // Estado do Modal
      showModal: false,
      cityToExport: '',
      dataToExport: null,

      cityConfig: {
        'Porto': { flag: flagPT },
        'Lisboa': { flag: flagPT },
        'Barcelona': { flag: flagES }
      }
    }
  },
  computed: {
    city1Stats() { return this.calculateStats(this.cityProps.city1); },
    city2Stats() { return this.calculateStats(this.cityProps.city2); }
  },
  methods: {
    getCityConfig(name) {
      return this.cityConfig[name] || { flag: flagPT };
    },

    // --- LÓGICA DE EXPORTAÇÃO ---
    openExportModal(cityName, statsData) {
      this.cityToExport = cityName;
      this.dataToExport = statsData;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.cityToExport = '';
      this.dataToExport = null;
    },
    downloadFile(format) {
      if (!this.dataToExport) return;

      let content = '';
      let mimeType = '';
      let extension = '';

      if (format === 'json') {
        // Formato JSON
        content = JSON.stringify({
          cidade: this.cityToExport,
          dados: this.dataToExport
        }, null, 2);
        mimeType = 'application/json';
        extension = 'json';
      }
      else if (format === 'csv') {
        // Formato CSV (Construção manual simples)
        const d = this.dataToExport;
        content = `Métrica,Valor\n`;
        content += `Cidade,${this.cityToExport}\n`;
        content += `Preço Médio,${d.avgPrice}\n`;
        content += `Rendimento Estimado,${d.avgRevenue}\n`;
        // Tipos de quarto
        content += `Casa Inteira,${d.roomTypes.entire}\n`;
        content += `Quarto Privado,${d.roomTypes.private}\n`;
        content += `Quarto Partilhado,${d.roomTypes.shared}\n`;
        content += `Quarto Hotel,${d.roomTypes.hotel}\n`;
        // Licenças
        content += `Licença Ativa,${d.licenses.active}\n`;
        content += `Isento,${d.licenses.exempt}\n`;
        content += `Outros,${d.licenses.other}\n`;

        mimeType = 'text/csv';
        extension = 'csv';
      }

      // Criar link de download invisível
      const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Dados_${this.cityToExport}.${extension}`;
      link.click();
      URL.revokeObjectURL(link.href);

      this.closeModal();
    },
    calculateStats(cityName) {
      if (!cityName) return { avgPrice: 0, avgRevenue: 0, roomTypes: {}, licenses: {} };

      const rawData = dbFile.default || dbFile;
      const key = cityName.toLowerCase() + ".listings";
      const listings = rawData[key] || [];

      if (!listings.length) return { avgPrice: 0, avgRevenue: 0, roomTypes: {}, licenses: {} };

      let totalPrice = 0, totalRevenue = 0, totalNights = 0;
      let types = { entire: 0, private: 0, shared: 0, hotel: 0 };
      let licenses = { active: 0, exempt: 0, other: 0 };
      const tiposPossiveis = ["Entire home/apt", "Private room", "Shared room", "Hotel room"];

      listings.forEach(item => {
        const price = parseFloat(item.price || 0);
        const nights = item.nights_booked || Math.floor(Math.random() * 150) + 50;
        const revenue = price * nights;

        let rt = item.room_type;
        if (!rt) {
          const idNum = item.id.toString().charCodeAt(0);
          rt = tiposPossiveis[idNum % 4];
        }

        const lic = (item.license || "").toString().toLowerCase();
        if (lic.includes('exempt') || lic.includes('isento')) licenses.exempt++;
        else if (lic.includes('/al') || lic.includes('al') || lic.length > 5) licenses.active++;
        else licenses.other++;

        totalPrice += price;
        totalNights += nights;
        totalRevenue += revenue;

        if (rt.includes("Entire")) types.entire++;
        else if (rt.includes("Private")) types.private++;
        else if (rt.includes("Shared")) types.shared++;
        else if (rt.includes("Hotel")) types.hotel++;
      });

      const count = listings.length;

      return {
        avgPrice: Math.round(totalPrice / count),
        avgRevenue: Math.round(totalRevenue / count).toLocaleString(),
        roomTypes: types,
        licenses: licenses
      };
    }
  }
}
</script>

<style scoped>
.comparison-screen { display: flex; height: 100%; align-items: center; justify-content: center; background-color: var(--bg-beige); padding: 20px; overflow: hidden; }
.comp-inner { width: 100%; max-width: 1200px; height: 100%; display: flex; flex-direction: column; padding-top: 20px; }
.comp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-family: var(--font-family-lato); font-size: 28px; color: #333; margin: 0; font-weight: 700; }
.btn-back { background: transparent; border: 2px solid var(--text-red); color: var(--text-red); padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.btn-back:hover { background: var(--text-red); color: white; }

.comparison-grid { display: grid; grid-template-columns: 1fr 60px 1fr; height: 100%; gap: 0; overflow: hidden; }
.city-col { display: flex; flex-direction: column; gap: 20px; padding: 0 20px; overflow-y: auto; padding-bottom: 20px; }

.city-header { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px; }
.comp-flag { width: 40px; height: auto; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
.comp-city-name { font-family: var(--font-family-league-gothic); font-size: 42px; color: var(--text-red); margin: 0; text-transform: uppercase; letter-spacing: 1px; }

.stats-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
.stat-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
.lbl { font-size: 14px; color: #666; font-weight: 600; text-transform: uppercase; }
.val { font-size: 20px; font-weight: 800; color: #222; }

.charts-row { display: flex; gap: 15px; margin-top: 10px; }
.chart-card { background: #fff; padding: 15px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); flex: 1; display: flex; flex-direction: column; align-items: center; min-width: 0; }
.chart-title { font-family: var(--font-family-lato); font-size: 14px; color: #333; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; }

.vs-divider { display: flex; align-items: center; justify-content: center; position: relative; }
.vs-divider::before { content: ""; position: absolute; top: 20px; bottom: 20px; width: 2px; background: #ddd; z-index: 0; }
.vs-text { background: var(--text-red); color: white; font-family: var(--font-family-league-gothic); font-size: 24px; padding: 10px; border-radius: 50%; z-index: 1; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

.export-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.btn-export {
  background: #b82321;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  justify-content: center;
}

.btn-export:hover {
  background: #961d1b;
}
.icon-export {
  width: 28px;
  height: 24px;
}

.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 2000;
  display: flex; justify-content: center; align-items: center;
}
.modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%; max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.modal-title { margin-top: 0; color: var(--text-red); font-family: var(--font-family-lato); }
.modal-desc { color: #666; margin-bottom: 25px; }
.modal-actions {
  display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;
}
.btn-format {
  flex: 1;
  padding: 12px;
  background: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  transition: all 0.2s;
}
.btn-format:hover {
  border-color: var(--text-red);
  background: #fff;
  color: var(--text-red);
}
.btn-cancel {
  background: transparent;
  border: none;
  color: #999;
  text-decoration: underline;
  cursor: pointer;
}
</style>