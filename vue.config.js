module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      'ˆ/api': {
       target: 'http://localhost:8080',
       changeOrigin: true
      }
    }
  }
}
