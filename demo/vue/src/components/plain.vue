<template>
    <div class="row card">
        <textarea v-model="text" @keyup.enter="add"></textarea>
        <p v-for="item in set" :key="item.last" :class="{'done':item.done}">
            {{item.text}}
            <sub>
                <!-- 🔥❌ -->
                <a @click="()=>done(item.id)" v-if="!item.done">✔</a>
                <a @click="()=>handleDel(item.id)" v-else>✖</a>
            </sub>
        </p>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { put, del, getList, createKey } from '../utils'

const plainDir = 'plain'

export default {
    setup() {
        const state = reactive({
            set: [],
            text: '',
        })

        async function add() {
            if (state.text.trim()) {
                const id = await createKey(state.text)
                await put({
                    key: `${plainDir}/${id}`,
                    data: '',
                })
                state.text = ''
                fetchData()
            }
        }

        async function done(id) {
            await put({
                key: `${plainDir}/${id}`,
                data: 'done',
            })
            fetchData()
        }

        async function fetchData() {
            const data = await getList()
            const list = data.map(item => {
                if (+item.size > 30) item.done = true
                return item
            })
            list.sort((a, b) => {
                if (a.done && !b.done) return true
                if (!a.done && b.done) return false
                return new Date(b.last) - new Date(a.last)
            })
            // console.log(list)
            state.set = list
        }

        async function handleDel(id) {
            await del(`${plainDir}/${id}`)
            fetchData()
        }

        fetchData()

        return {
            ...toRefs(state),
            add,
            done,
            handleDel,
        }
    }
}

</script>

<style scoped>
.row {
    padding: 1rem;
}
textarea {
    width: 500px;
    max-width: 100%;
    height: 120px;
    padding: 0.7rem;
    resize: none;
    font-size: 1rem;
    margin-bottom: 2rem;
}
p {
    word-break: break-all;
}
p.done {
    text-decoration: line-through;
    color: #a9a9a9;
}
</style>