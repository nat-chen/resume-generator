module.exports = {
  publicPath: '/resume/',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'utils': '@/utils',
        'api': '@/api',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/cms': {
        target: 'http://134.175.66.181',
        changeOrigin: true
      }
    },
    port: 8081
  }
}