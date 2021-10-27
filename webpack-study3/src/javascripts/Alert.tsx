import * as React from 'react';

// reactコンポーネントがmessageというプロパティを受け取り、messageは文字列であるということ
const Alert: React.FC<{ message: string }> = ({ message }) => {

    // リストラクチャアサイメントという書き方以下のようにも×
    // const { message } = props;
    return (
        <div style={{ backgroundColor: 'green', color: '#fff', padding:'1em' }}>
            {message}
        </div>
    )
}

// 上記のコンポーネントをエクスポートして、他でも使えるようにする
export default Alert;