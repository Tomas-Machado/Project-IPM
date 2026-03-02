<template>
  <div class="chart-container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
// Importações corretas para Vue 3 + Chart.js 4
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Registar componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartRoomType',
  components: { Bar },
  props: {
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
    chartData() {
      // Proteção para evitar erros se os dados vierem vazios
      const d = this.dataValues || { entire: 0, private: 0, shared: 0, hotel: 0 };

      return {
        labels: ['Casa/Apt', 'Privado', 'Partilhado', 'Hotel'],
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: ['#b82321', '#333333', '#777777', '#d32f2f'],
            data: [d.entire, d.private, d.shared, d.hotel],
            borderRadius: 4
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff'
          }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
          x: { grid: { display: false } }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>