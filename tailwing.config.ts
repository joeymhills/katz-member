/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
          'xs': '590px',
          'lg': '1250px',
        },
        fontFamily: {
          copernicus: ['GalaxieCopernicus', 'sans-serif'],
          polaris: ['GalaxiePolaris', 'sans-serif'],
          polarisCondensed: ['GalaxiePolarisCondensed', 'sans-serif'],
          // Add more fonts if necessary
        },
        opacity: {
          '20': '0.2',
        },
      },
    },
    plugins: [],
  }
  