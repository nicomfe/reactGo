const createStaticAssets = process.env.__PRODUCTION__ ? require('./prod') : require('./dev')

export default createStaticAssets
