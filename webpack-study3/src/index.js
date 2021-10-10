
/**
 * ./src/index.js
 *
 *  一番初めに読み込むエントリーポイントとなるファイル【 index.js 】
 *
 * このファイルをpackage.jsonでエントリーポイントとして指定する
 * このファイルを読み込んだときに、使用するモジュールを読み込み、インポートされるように記述する
 *
 * モジュールは ./src/modules ディレクトリを作成し、＜モジュール名.js＞ として作成する
 */

// my.jsのモジュールを読み込む
import my from './modules/my.js';

// my.cssモジュールを読み込む       ※ cssの読み込みは、書き方が特殊になっている 名前を付ける必要はない
import './modules/my.css';

console.log('★ウェブパックのテスト★ (これは ./src/index.js の中身です)');

// 読み込んだmy.jsモジュールの使用は下記で行う
my();

// モジュールの作成と読み込みができたらビルドする
// 以下がwebpackのビルドをするコマンド

// npx webpack --mode development