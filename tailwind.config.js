/** @type {import('tailwindcss').Config} */


// import { plugin } from 'tailwindcss/plugin';

// const rotateY = plugin(function({addUtilities}){
//   addUtilities ({
//     '.rotate-y-360' : {
//       transform : 'rotateY(360deg)',
//     },
//     '.w-120':{
//       width: '30rem',
//     }
//   })
// })

module.exports = {
  content: ["./index.html", "./src/**/*.{html,vue,js}"],
  theme: {
    extend: {},
  },
  // plugins: [rotateY],
}

