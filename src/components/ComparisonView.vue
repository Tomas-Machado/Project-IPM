<template>
  <section class="comparison-screen">
    <div class="comparison-inner">
      <div class="comparison-box">
        <div class="comparison-header">
          <img src="@/assets/images/comparacaoDados.png" class="compare-small">
          <span class="comparison-title">Comparação de dados</span>
          <img src="@/assets/images/comparacaoDados.png" class="compare-small">
        </div>

        <div class="comparison-body">
          <div class="locations-row">
            <div class="location-col">
              <label>Localização 1</label>
              <select v-model="selectedCity1" @change="handleCityChange1" class="location-select">
                <option v-for="city in citiesList" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>

            <div class="location-col">
              <label>Localização 2</label>
              <select v-model="selectedCity2" @change="handleCityChange2" class="location-select">
                <option v-for="city in citiesList" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
          </div>

          <div class="compare-action">
            <button class="btn-compare" @click="emitCities">
              Comparar
              <img src="@/assets/images/comparacaoDados.png" class="btn-icon">
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComparisonView',
  emits: ['open-cities'],
  data() {
    return {
      citiesList: ['Porto', 'Lisboa', 'Barcelona'],
      selectedCity1: 'Porto',
      selectedCity2: 'Barcelona'
    }
  },
  methods: {
    emitCities() {
      this.$emit('open-cities', { city1: this.selectedCity1, city2: this.selectedCity2 });
    },
    handleCityChange1() {
      if (this.selectedCity1 === this.selectedCity2) {
        this.selectedCity2 = this.citiesList.find(c => c !== this.selectedCity1);
      }
    },
    handleCityChange2() {
      if (this.selectedCity2 === this.selectedCity1) {
        this.selectedCity1 = this.citiesList.find(c => c !== this.selectedCity2);
      }
    }
  }
}
</script>

<style scoped>
/* CSS APENAS DO CONTEÚDO (Sem barra lateral) */
.comparison-screen {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.comparison-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.comparison-box { width: 820px; background: transparent; text-align: center; }
.comparison-header { display: inline-flex; align-items: center; gap: 12px; border: 2px solid rgba(184,36,33,0.18); padding: 12px 22px; border-radius: 4px; margin-bottom: 48px; background: rgba(255,255,255,0.6); }
.compare-small { width: 28px; height: 28px; }
.comparison-title { color: var(--text-red); font-weight: 700; font-size: 26px; }
.comparison-body { display: flex; flex-direction: column; gap: 44px; align-items: center; justify-content: center; min-height: 420px; }
.locations-row { display: flex; gap: 220px; width: 100%; justify-content: center; align-items: flex-start; }
.location-col { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.location-select { padding: 12px 14px; min-width: 220px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.12); background: #fff; font-size: 16px; cursor: pointer; }
.compare-action { margin-top: 10px; }
.btn-compare { background: #fff; border: 1px solid rgba(0,0,0,0.08); padding: 12px 18px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 12px; box-shadow: 0 4px 0 rgba(0,0,0,0.12); font-size: 16px; font-weight: 700; color: #111; }
.btn-compare .btn-icon { width: 20px; height: 20px; }
</style>