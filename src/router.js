import { createRouter, createWebHistory } from 'vue-router';


import LoginScreen from './components/LoginScreen.vue';
import DashBoard from './components/DashBoard.vue';

import HomeView from './components/HomeView.vue';
import MapView from './components/MapView.vue';
import FilterView from './components/FilterView.vue';
import FilterDisplay from './components/FilterDisplay.vue';
import ComparisonView from './components/ComparisonView.vue';
import ComparisonCitiesView from './components/ComparisonCitiesView.vue';
import CityProfileView from './components/CityProfileView.vue';
import UserProfile from './components/UserProfile.vue';

// 2. Definir as rotas (URLs)
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginScreen
    },
    {
        path: '/app',
        //name: 'Dashboard',
        component: DashBoard,
        children: [
            {
                path: '',
                redirect: '/app/home'
            },
            {
                path: 'home',
                name: 'home',
                component: HomeView
            },
            {
                path: 'map',
                name: 'map',
                component: MapView
            },
            {
                path: 'filter',
                name: 'filter',
                component: FilterView
            },
            {
                path: 'filter-results',
                name: 'filter-display',
                component: FilterDisplay
            },
            {
                path: 'comparison',
                name: 'comparison',
                component: ComparisonView
            },
            {
                path: 'comparison-results',
                name: 'cities',
                component: ComparisonCitiesView
            },
            {
                path: 'city/:cityName',
                name: 'city-profile',
                component: CityProfileView,
                props: true
            },
            {
                path: 'profile',
                name: 'user-profile',
                component: UserProfile
            }
        ]
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;