
const path = require('path');

// mini-css を使用する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// html-webpack-plugin を使用する
const HtmlWebpackPlugin = require('html-webpack-plugin');

// clean-webpack-plugin を使用する
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {


    // エントリーポイントのファイルの場所を指定
    entry: './src/javascripts/main.js',

    // どこにファイルを出力したいのかを指定
    output: {
        // プロジェクト直下のdistディレクトリに出力
        // path.resolve  絶対パスを取得できる
        // __dirname     現在のフォルダがある階層を表す
        path: path.resolve(__dirname, './dist'),

        // live reloadの設定
        // publicPath: './dist/javascripts',

        // 出力されるファイルの名前を変更するときはfilename   例えばfilename: 'index_aaa.js'とするとdist/index_aaa.jsのファイルが生成される
        // filenameは記述しなくてもデフォルトでdist/main.jsのファイルが生成されるが、明示的に出力ファイル名を記述していたほうがいい
        filename: 'javascripts/main.js',
    },

    // devServer: {
        // contentBase: path.resolve(__dirname, './dist'),
    //     hot: true,
    //     open: true,
    //     port: 8080,
    //     host: '0.0.0.0',
    //     historyApiFallback: true,
    // },
    devServer: {
        liveReload: true,
        // contentBase: './src',
        // watchContentBase: true,
        static: {
            directory: path.resolve(__dirname, "./dist"),
            // watch: true,

            // inline: true,

            },


    },


    // resolve: {
    //     // modules: [path.resolve(__dirname, './src'), 'node_modules'],
    //     modules: ['node_modules'],
    // },
    // エラーの詳細を表示する
    stats: {
    children: true,
    },
    // resolve: {
    //     extensions: '.pug'
    // },

    target: "web",

    module: {
        rules: [
            {
                // 【.css】というファイル名を検知するための仕組みで、test:を使う   .をエスケープするために\バックスラッシュを使っている
                test: /\.(css|sass|scss)/,

                // 【.css】というファイルが見つかれば、以下のルールを適用させる、という意味
                // loaderは下から順番に読み込まれていくため、css-loaderの上にsytle-loaderを記述する！
                use: [
                    // ＜読み込み順 ③＞ css-loaderで読み込んだモジュールを、style-loaderで処理しなさいという命令
                    {
                        // loader: 'style-loader',
                        loader: MiniCssExtractPlugin.loader, // style-loader → MiniCssExtractPlugin へ置き換える
                    },

                    // ＜読み込み順 ②＞ css-loaderの読み込み   【.css】というファイルに対して,css-loaderを使用するという命令
                    {
                        loader: 'css-loader',
                    },

                    // ＜読み込み順 ①＞ sass-loaderを使用する
                    {
                        loader: 'sass-loader',
                    },
                ],
            },

            // assetmoduleの設定（file-loaderの設定）  ............................................
            {
                test: /\.(png|jpg)/,

                // assetModules を利用する （※webpack5のみの機能 各種ローダーがまとまっている）
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]' // ドットは含まない
                },


                use: [
                    // assetModules を利用しない場合、以下file-loaderのコメントをとる
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]',
                    //     }
                    // },
                ],
            },
            // assetmoduleの設定（file-loaderの設定）  ............................................

            // pug の設定  ※loderの読み込み順序は下から上。 pug-html-loader の次にhtml-loaderが読み込まれる  ...........................................
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        // pugを使用する
                        loader: 'pug-html-loader',
                        // pugのビルド後のhtmlファイルを正しく改行させるオプション
                        options: {
                            pretty: true,
                        }
                    },
                ],
            }
            // pug の設定   ...........................................


        ],
    },



    // moduleの下にプラグインを追加する（MiniCssExtractPluginを読み込む）
    plugins: [
        new MiniCssExtractPlugin({
            // 出力後のファイルをmain.css(デフォルト)でなく、my.cssに変更する。さらに出力されるdist/index.htmlの読み込みもmy.cssに変更してくれる
            filename: './stylesheets/main.css'
        }),

        // HtmlWebpackPluginはlodashのプラグインに依存している
        new HtmlWebpackPlugin({
            // index.html のコンテンツであるテンプレートの場所を記述する  →  index.pugに変更
            template: './src/templates/index.pug',
            filename: 'index.html'
        }),

        // 複数ページの作成はHtmlWebpackPluginを新しく追加して、以下のように記述する
        new HtmlWebpackPlugin({
            // 例えばアクセスページをpugで追加する場合は以下のように記述する
            template: './src/templates/access.pug',
            filename: 'access.html'
        }),

        // tarou.pugのページを追加
        new HtmlWebpackPlugin({
            // 例えばアクセスページをpugで追加する場合は以下のように記述する
            template: './src/templates/members/taro.pug',
            filename: 'members/taro.html'
        }),

        // webpack dev-serverが起動したら、以下プラグインが有効化され、distファイル内が全削除される
        new CleanWebpackPlugin(),
    ]

}