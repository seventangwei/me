/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = function (context, options) {
  return {
    name: 'postcss-tailwindcss-loader',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        // require('postcss-nested'),
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
      )
      return postcssOptions
    },
  }
}
