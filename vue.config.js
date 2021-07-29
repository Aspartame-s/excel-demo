module.exports={
    publicPath:"./",
    devServer: {
        open: process.platform === 'darwin',
        disableHostCheck: true,
        host: '0.0.0.0',//如果是真机测试，就使用这个IP
        port: 8081,
        https: false,
        proxy: {
            '/api': {
                target: 'http://192.168.2.226:8012',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
      }
}