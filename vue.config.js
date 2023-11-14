const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});
// vue.config.js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:4444',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // other configuration...
};

