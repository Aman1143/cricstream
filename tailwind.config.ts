import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'my_bg_image': "url('/assets/images/back.jpeg')",
      },
      colors:{
        'custom-1':"#3b5998",
        'custom-2':"#55acee",
        
        'primary-orange': '#FF5722',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      maxHeight:{
        'custom-h':"425px"
      }
    },
  },
  plugins: [],
};
export default config;
