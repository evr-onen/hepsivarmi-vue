/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./domains/**/components/**/*.{js,vue,ts}",
    "./domains/**/layouts/**/*.vue",
    "./domains/**/pages/**/*.vue",
    "./domains/**/plugins/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'tangerine': ['Tangerine', 'cursive'],
         'manrope': ['Manrope', 'sans-serif'],
         'opensans': ['OpenSans', 'sans-serif'],
      },
        colors: {
            primary         : '#6E32F9',
            secondary       : '#9333EA',
            bgPrimary       : '#f1f5f9',
            bgSecondary     : '#f1f5f9',
            textPrimary     : '#334155',
            textSecondary   : '#181A20',
            placeholder     : '#76808b',
            borderColor     : '#cbd5e1',
            optionSelectedBg: '#020617',

            neutral:{
                900           : '#0E121B',
                800           : '#181B25',
                700           : '#222530',
                600           : '#2B303B',
                500           : '#525866',
                400           : '#717784',
                300           : '#99A0AE',
                200           : '#CACFD8',
                100           : '#E1E4EA',
                50            : '#F2F5F8',
                25            : '#F5F7FA',
            },

            brand:{
                900           : '#124B68',
                800           : '#18658B',
                700           : '#1F7EAD',
                600           : '#2597D0',
                500           : '#35ADE9',
                400           : '#47C2FF',
                300           : '#68CDFF',
                200           : '#97DCFF',
                100           : '#C0EAFF',
                50            : '#D5F1FF',
                25            : '#EBF8FF',
            },

            success:{
                900           : '#053321',
                800           : '#074D31',
                700           : '#067647',
                600           : '#079455',
                500           : '#17B26A',
                400           : '#47CD89',
                300           : '#75E0A7',
                200           : '#ABEFC6',
                100           : '#DCFAE6',
                50            : '#ECFDF3',
                25            : '#F6FEF9',
            },

            warning:{
                900           : '#4E1D09',
                800           : '#93370D',
                700           : '#B54708',
                600           : '#DC6803',
                500           : '#F79009',
                400           : '#FDB022',
                300           : '#FEC84B',
                200           : '#FEDF89',
                100           : '#FEF0C7',
                50            : '#FFFAEB',
                25            : '#FFFCF5',
            },

            error:{
                900           : '#55160C',
                800           : '#912018',
                700           : '#B42318',
                600           : '#D92D20',
                500           : '#F04438',
                400           : '#F97066',
                300           : '#FDA29B',
                200           : '#FECDCA',
                100           : '#FEE4E2',
                50            : '#FEF3F2',
                25            : '#FFFBFA',
            },



        },
    },
  },
  plugins: [],
}