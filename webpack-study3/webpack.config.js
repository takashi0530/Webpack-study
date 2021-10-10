
const path = require('path');

// mini-css を使用する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// html-webpack-plugin を使用する
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // エントリーポイントのファイルの場所を指定
    entry: './src/index.js',

    // どこにファイルを出力したいのかを指定
    output: {
        // プロジェクト直下のdistディレクトリに出力
        // path.resolve  絶対パスを取得できる
        // __dirname     現在のフォルダがある階層を表す
        path: path.resolve(__dirname, './dist'),

        // 出力されるファイルの名前を変更するときはfilename   例えばfilename: 'index_aaa.js'とするとdist/index_aaa.jsのファイルが生成される
        // filenameは記述しなくてもデフォルトでdist/main.jsのファイルが生成されるが、明示的に出力ファイル名を記述していたほうがいい
        filename: 'main.js',
    },

    module: {
        rules: [
            {
                // 【.css】というファイル名を検知するための仕組みで、test:を使う   .をエスケープするために\バックスラッシュを使っている
                test: /\.css/,
                // 【.css】というファイルが見つかれば、以下のルールを適用させる、という意味
                // loaderは下から順番に読み込まれていくため、css-loaderの上にsytle-loaderを記述する！
                use: [
                    // ＜読み込み順 ②＞ css-loaderで読み込んだモジュールを、style-loaderで処理しなさいという命令
                    {
                        // loader: 'style-loader',
                        loader: MiniCssExtractPlugin.loader, // style-loader → MiniCssExtractPlugin へ置き換える
                    },

                    // ＜読み込み順 ①＞ css-loaderの読み込み   【.css】というファイルに対して,css-loaderを使用するという命令
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },

    // moduleの下にプラグインを追加する（MiniCssExtractPluginを読み込む）
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            // index.html のコンテンツであるテンプレートの場所を記述する
            template: './src/index.html'
        }),
    ]

}