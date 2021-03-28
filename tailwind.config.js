module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-neumorphism')
  ]
}
