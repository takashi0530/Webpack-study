
// my.jsのモジュールを読み込む
import my from './modules/my.js';

console.log('うぇぶぱっくテスト');

// 読み込んだmy.jsモジュールの使用方法
my();

// モジュールの作成と読み込みができたらビルドする
// いかがwebpackのビルド方法
// npx webpack --mode development