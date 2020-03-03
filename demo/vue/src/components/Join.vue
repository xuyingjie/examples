<template>
    <form class="row join" @submit.prevent="join">
        <label>
            Name
            <input type="text" v-model="name" />
        </label>
        <label>
            Password
            <input type="text" v-model="passwd" />
        </label>
        <label>
            AccessKeyId
            <input type="text" v-model="accessKeyId" />
        </label>
        <label>
            AccessKeySecret
            <input type="text" v-model="accessKeySecret" />
        </label>
        <label>
            CryptoKey
            <input type="text" v-model="cryptoKey" />
        </label>
        <button class="card" type="submit">JOIN</button>
    </form>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { put } from '@/utils'

export default {
    setup() {
        const state = reactive({
            name: '',
            passwd: '',
            accessKeyId: '',
            accessKeySecret: '',
            cryptoKey: '',
        })

        async function join() {
            const user = {
                cryptoKey: state.cryptoKey,
                accessKeyId: state.accessKeyId,
                accessKeySecret: state.accessKeySecret,
            }
            localStorage.a = JSON.stringify(user)

            const status = await put({
                key: state.name,
                data: user,
                passwd: state.passwd,
            })
            state.name = status
        }

        return {
            ...toRefs(state),
            join,
        }
    }
}

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
form > * {
    margin: 10px 0;
}
form label > input {
    display: block;
}
</style>