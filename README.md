# 🌍 IPM Project - City & Accommodation Analyzer

An interactive web application developed for the **Human-Computer Interaction** (Interação Pessoa-Máquina) course. This platform enables users to explore, analyze, and compare urban accommodation data through intuitive maps and dynamic visualizations.

## 🚀 Key Features

* **Interactive Mapping**: View precise accommodation locations using an integrated map interface powered by **Leaflet**.
* **Data Analytics**: Gain insights through dynamic charts, including room types, licensing status, and overall distribution.
* **City Comparison**: A dedicated tool to evaluate and compare different cities side-by-side.
* **User Management**: Includes a structured navigation system with Login and User Profile views.
* **Automated Data Processing**: Features specialized Python scripts to process and convert raw CSV data into usable JSON formats.

## 🛠️ Technology Stack

* **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API).
* **Build Tool**: [Vite](https://vitejs.dev/).
* **Maps**: [Vue Leaflet](https://vue-leaflet.github.io/vue-leaflet/).
* **Charts**: [Chart.js](https://www.chartjs.org/) via `vue-chartjs`.
* **Routing**: [Vue Router](https://router.vuejs.org/).

## 📂 Project Structure

* `src/components/`: Modular UI components for charts, filters, and views.
* `src/data/`: Core datasets (`db.json`, `listings.csv`) and data-building scripts.
* `src/assets/`: Static resources including CSS styles and city-specific imagery.

## 🏁 Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Navigate to the project root and install the necessary dependencies:
```bash
npm install
```

### 3. Development Server
Run the application locally with hot-reload:
```bash
npm run dev
```

### 4. Opening the site
It should appear on the command line the link for the local adress http://localhost:5173/ . Click it and it should open the browswer with the site.
You can also copy it and paste it on the browser.
