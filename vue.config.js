// webpack配置

module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://m.kugou.com/",
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/geci": {
                target: "https://m3ws.kugou.com",
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/geci": ""
                }
            }
        }
    },
    lintOnSave: false //  关闭eslint

}