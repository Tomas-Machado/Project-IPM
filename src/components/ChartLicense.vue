<template>
  <div class="chart-wrapper">
    <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />

    <div class="center-text" v-if="loaded">
      {{ total }}<br><span class="small">Total</span>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ChartLicense',
  components: { Doughnut },
  props: {
    // Recebe: { active: 20, exempt: 5, other: 5 }
    dataValues: {
      type: Object,
      required: true,
      default: () => ({ active: 0, exempt: 0, other: 0 })
    }
  },
  data() {
    return { loaded: true }
  },
  computed: {
    total() {
      const d = this.dataValues || {};
      return (d.active || 0) + (d.exempt || 0) + (d.other || 0);
    },
    chartData() {
      const d = this.dataValues || { active: 0, exempt: 0, other: 0 };

      return {
        labels: ['Licença AL', 'Isento', 'Outros'],
        datasets: [
          {
            // Azul para Licença, Verde para Isento, Cinza para Outros
            backgroundColor: ['#2E86C1', '#27AE60', '#BDC3C7'],
            data: [d.active, d.exempt, d.other],
            borderWidth: 0,
            hoverOffset: 4
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, pointStyle: 'circle', font: { size: 11 } }
          },
          tooltip: { backgroundColor: '#333' }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 250px;
  width: 100%;
}
.center-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  line-height: 1;
  pointer-events: none;
}
.small {
  font-size: 12px;
  color: #888;
  font-weight: 700;
  text-transform: uppercase;
}
</style>