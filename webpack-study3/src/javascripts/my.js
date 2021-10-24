// 以下がモジュールとなる （モジュールの書き方はexport defaultとする）
export default () => {

    // ES6でトランスパイルされるかのテスト
    // スプレッド構文（ES6）
    const obj = {
        a: 1,
        b: 2,
    };
    const newObj = {
        ...obj,
        c: 3,
    }
    console.log(newObj);
    // ↓ ↓ ↓
    // トランスパイル後
    //   var obj = {
    //     a: 1,
    //     b: 2
    //   };

    //   var newObj = _objectSpread(_objectSpread({}, obj), {}, {
    //     c: 3
    //   });//
}