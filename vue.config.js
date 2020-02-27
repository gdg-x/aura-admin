module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Aura Admin',
    workboxPluginMode: 'InjectManifest',
    themeColor: '#4A90E2',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  }
}