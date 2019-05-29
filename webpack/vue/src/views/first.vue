<template>
    <main class="page">
        <div class="contents">
            <header>

            </header>
        </div>
    </main>
</template>

<script>

export default {
    data() {
        return {
            info: {

            },
        };
    },

    created() {
        this.getInfo(this.subject);
    },

    methods: {
        async getInfo() {

        },
    },
};
</script>

<style lang="scss" scoped>
main {
    background: rgb(53,200,169);
}
.contents {

}
</style>
