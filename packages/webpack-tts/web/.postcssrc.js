// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 8'],
      flexbox: 'no-2009',
    },
  },
}
