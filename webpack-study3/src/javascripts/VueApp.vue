<template>
    <p>{{ message }}</p>
</template>

<script>
export default {
    data: () => {
        console.log('Vue.jsがインストールされました');
        return {
            message: 'こんにちわ！Vue.js!!',
        };
    },
};
</script>

// このコンポーネントだけに適応させるスタイル scoped
<style scoped>
p {
    color: green;
}
</style>