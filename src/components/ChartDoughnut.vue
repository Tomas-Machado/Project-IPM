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

// Registar componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ChartDoughnut',
  components: { Doughnut },
  props: {
    // Recebe os dados calculados da página de comparação
    dataValues: {
      type: Object,
      required: true,
      default: () => ({ entire: 0, private: 0, shared: 0, hotel: 0 })
    }
  },
  data() {
    return {
      loaded: true
    }
  },
  computed: {
    total() {
      const d = this.dataValues || {};
      return (d.entire || 0) + (d.private || 0) + (d.shared || 0) + (d.hotel || 0);
    },
    chartData() {
      const d = this.dataValues || { entire: 0, private: 0, shared: 0, hotel: 0 };

      return {
        labels: ['Casa Inteira', 'Quarto Privado', 'Outros'],
        datasets: [
          {
            backgroundColor: ['#b82321', '#333333', '#e0e0e0'],
            data: [
              d.entire || 0,
              d.private || 0,
              (d.shared || 0) + (d.hotel || 0)
            ],
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