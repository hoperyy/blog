module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist', // 必须是绝对路径
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                include: [__dirname + '/src']
            },

        ]
    }
};