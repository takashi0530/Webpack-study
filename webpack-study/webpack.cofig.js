// ./distを絶対パスにするため、node.jsに入ってるpathというライブラリを利用する
const path = require('path');

module.exports = {
    entry: './scr/index.js',
    // どこにファイルを出力したいのかを指定する
    output: {
        // プロジェクト直下のdistディレクトリを出力先に指定する  path.resolve で絶対パスを取得できる  __dirname ： 現在のプロジェクトのフォルダの階層を示している
        path: path.resolve(__dirname, './dist'),
    }
}