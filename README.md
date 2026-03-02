IPM Project
This project is a web application developed using Vue.js 3 for the Human-Computer Interaction (Interação Pessoa-Máquina - IPM) course. The application focuses on data visualization and comparison, specifically regarding city data and accommodations, utilizing interactive maps and dynamic charts.

📂 Project Content
The project is organized with the following structure and features:

Core Technologies: Built with Vue 3 as the main framework and Vite as the build tool.

Data Visualization:

  Maps: Integration with Leaflet via the @vue-leaflet/vue-leaflet library to provide geospatial views of locations.

  Charts: Powered by Chart.js and vue-chartjs, featuring components like ChartDoughnut.vue, ChartRoomType.vue, and ChartLicense.vue to display analytical data.

Navigation: Managed by Vue Router, allowing users to switch between various views including Home, Map, Comparison, and User Profile.

Styling: Centralized CSS located in src/assets/styles.css.

Data Management: Includes a Python script (build_jsondb.py) for data processing and local storage in JSON and CSV formats (e.g., db.json, listings.csv).

🚀 How to Run the Project
To run this project locally, follow these steps:

1. Prerequisites
Ensure you have Node.js installed on your system.

2. Install Dependencies
Open your terminal in the project's root directory and run the following command to install all necessary libraries:
  npm install

3. Run in Development Mode
To start the local server and view the application, use:
  npm run dev

The terminal will provide a local URL (typically http://localhost:5173/) where you can access the project in your browser.
