process.env.VUE_APP_VERSION = require('./package.json').version

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  pwa: {
    name: 'Aura Admin',
    themeColor: '#4A90E2',
    msTileColor: '#4A90E2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: "#ffffff"
    },
  }
})
