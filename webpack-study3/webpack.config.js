
const path = require('path');

// mini-css を使用する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// html-webpack-plugin を使用する
const HtmlWebpackPlugin = require('html-webpack-plugin');

// clean-webpack-plugin を使用する
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// vue-loader の中からプラグインを読み込む
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {

    // プロダクションモードでビルドする設定（デフォルトはproductionになってる）
    // mode: 'production',

    // 開発モードでビルドする設定   npx webpack --mode development    →    npx webpack だけでコマンドOK
    mode: 'development',

    // ソースマップの追加（ソースコードが自分が書いたjsとおなじになり、デバッグしやすくなる）
    // https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',

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

        publicPath: '/',
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

            // Typescriptのローダー設定     ........................................................
            {
                test: /\.(ts|tsx)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ]
            },

            // Vueファイルのローダー設定    ............................................
            {
                // もし.vueのファイルに遭遇したら、node_modulesを覗いて、vue-loaderを適用させる
                test: /\.vue/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ],
            },


            // JavaScript babel のローダー設定  ............................................
            {
                // .jsファイルを検知させる
                test: /\.js/,
                // node-modulesはトランスパイルの対象としないため、ディレクトリを除外する設定
                exclude: /node_modules/,
                // どのローダーを使うかの設定
                use: [
                    {
                        loader: 'babel-loader',
                        // オプション設定
                        options: {
                            // 0.25%のシェアを持っているブラウザ かつ 公式サポートが終了していないブラウザ のみを対象としてトランスパイルする
                            presets: [
                                // プリセットを設定を増やす場合は['aaa', {bb:cc}] 形式で追加する
                                ['@babel/preset-env', {'targets': '> 0.25%, not dead'}],
                                '@babel/preset-react'
                            ],
                        },
                    },
                ],
            },


            // CSSとSASSのローダー設定  ............................................
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
                        // cssのソースマップを追加する（ファイルサイズが重くなってしまう）
                        options: {
                            sourceMap: true,
                        },
                    },

                    // ＜読み込み順 ①＞ sass-loaderを使用する
                    {
                        loader: 'sass-loader',
                    },
                ],
            },

            // 画像 assetmoduleの設定（file-loaderの設定）  ............................................
            {
                test: /\.(png|jpg|jpeg)/,

                // assetModules を利用する （※webpack5のみの機能 各種ローダーがまとまっている）
                type: 'asset/resource',
                generator: {
                    filename: 'images/      [name][ext]' // ドットは含まない
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

                    // 画像の圧縮ができるimage-webpack-loaderを使用する
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // 画像圧縮のレベルを変更するオプション
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                        },
                    },
                ],
            },

            // pug のloader設定  ※loderの読み込み順序は下から上。 pug-html-loader の次にhtml-loaderが読み込まれる  ...........................................
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


        ],
    },



    plugins: [

        // moduleの下にプラグインを追加する（MiniCssExtractPluginを読み込む）
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

        // VueLoaderPluginを使用する。追加する
        new VueLoaderPlugin(),
    ]

}