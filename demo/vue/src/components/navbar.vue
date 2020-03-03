<template>
    <div class="bar">
        <nav class="row">
            <template v-if="auth">
                <a class="button" href="#/">PLAIN</a>
                <a class="button" href="#/media">MEDIA</a>
                <a class="button" href="#/root">file system</a>
                <button type="button" @click="logout">LOGOUT</button>
            </template>

            <form @submit.prevent="login" v-else>
                <input type="text" v-model="name" />
                <input type="password" v-model="passwd" />
                <button type="submit">LOGIN</button>
            </form>
        </nav>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { sha } from 'pessoa'
import { get } from '@/utils'

export default {
    // props 不能解构
    setup(props, { emit }) {
        const state = reactive({
            name: '',
            passwd: '',
        })

        async function login() {
            if (state.name && state.passwd) {
                const data = await get({
                    key: `home/${await sha(state.name, 'SHA-256')}`,
                    passwd: state.passwd
                })
                if (data.byteLength) {
                    localStorage.a = new Uint8Array(data)
                    state.name = ''
                    emit('set-auth', true)
                }
            }
        }

        function logout() {
            localStorage.clear()
            emit('set-auth', false)
        }

        return {
            ...toRefs(props),
            ...toRefs(state),

            login,
            logout,
        }
    }
}

</script>

<style scoped>
.bar form {
    width: 100%;
    display: flex;
    align-items: center;
}

.bar input[type="password"],
.bar button[type="submit"] {
    opacity: 0.42;
}

.bar button[type="button"] {
    margin-left: auto;
}

.bar nav input {
    overflow: hidden;
}

.bar nav > *:first-child {
    padding-left: 0;
}
</style>