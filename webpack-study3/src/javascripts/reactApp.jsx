// react-dom と react本体 をインポート
import ReactDom from 'react-dom';
import * as React from 'react';

// コンポーネントを定義する
const App = (props) => {
    return (
        <div style={{color: '#000'}}>
            こんにちわ！React!!
        </div>
    );
};

// id react-rootを持つ要素を取得
const reactRoot = document.getElementById('react-root');

// 要素があればAppコンポーネントをマウントする
if (reactRoot) {
    ReactDom.render(<App/>, reactRoot);
} else {
    console.log('Reactのルート要素が存在しません');
}