import * as React from 'react';

// Reactのstyled-componentsを読み込み
import styled from 'styled-components';

// バッククオートの中に通常のスタイルシートを記述することができる 【styled-components】
const AlertContainer = styled.div`
    background-color: green;
    color: #fff;
    padding: 1em;
`;

// reactコンポーネントがmessageというプロパティを受け取り、messageは文字列であるということ
const Alert: React.FC<{ message: string }> = ({ message }) => {

    // リストラクチャアサイメントという書き方以下のようにも×
    // const { message } = props;
    return (

        // styled-components を使わない場合
        // <div style={{ backgroundColor: 'green', color: '#fff', padding:'1em' }}>
        //     { message }
        // </div>

        // styled-components を使う場合
        <AlertContainer>
            { message }
        </AlertContainer>
    )
}

// 上記のコンポーネントをエクスポートして、他でも使えるようにする
export default Alert;