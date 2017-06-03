<template>
    <div>
        这是{{page}}页面
    </div>
</template>
<script>
    require('./about.css');
    require('./about.less');
    module.exports = {
        data: function () {
            return {
                page: 'about'
            }
        }
    }
</script>

<style lang="less">
div {
    background: black;
}
</style>