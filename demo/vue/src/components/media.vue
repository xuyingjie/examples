<template>
    <div class="row card">
        <label>
            🍀🌼🍄🍂🐌🐛🐜
            <input
                type="file"
                multiple
                accept="video/*, image/*"
                @change="handleFileChange"
            />
            <i ref="progress"></i>
        </label>

        <div class="list">
            <div
                class="item"
                v-for="(item,i) of list"
                :id="item.id"
                :key="item.id"
                :ref="el=>mediaNodeList[i]=el"
            >
                <template v-if="item.src">
                    <img :src="item.src" :alt="item.name" v-if="item.type.match(/image/)" />
                    <video controls :src="item.src" v-if="item.type.match(/video/)"></video>

                    <a @click="()=>handleDel(item.id,i)">✖</a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { getList, del } from '@/utils'
import { upload, readAsBlobURL } from '@/utils/file'

const mediaDir = 'media'

export default {
    setup() {
        const state = reactive({
            list: [],
            progress: null,
            mediaNodeList: [],
        })

        async function fetchData() {
            const list = await getList(mediaDir)
            state.list = list.map(item => {
                const [name, type] = item.text.split(',')
                return { ...item, name, type, text: '' }
            })
        }

        async function handleFileChange(e) {
            const files = e.target.files
            await upload({
                files,
                dirname: mediaDir,
                onprogress: (e) => {
                    if (e.lengthComputable) state.progress.style.width = (e.loaded === e.total) ? 0 : e.loaded / e.total * 100 + '%'
                }
            })
            fetchData()
        }

        async function handleDel(id, index) {
            await del(`${mediaDir}/${id}`)
            state.list[index].src = ''
        }

        async function loadMedia(id) {
            const index = state.list.findIndex(el => el.id === id)
            state.list[index]['src'] = await readAsBlobURL({
                key: `${mediaDir}/${id}`,
                type: state.list[index].type,
            })
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        function handleIntersect(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMedia(entry.target.id)
                    observer.unobserve(entry.target)
                }
            })
        }
        const observer = new IntersectionObserver(handleIntersect)

        watchEffect(() => {
            if (state.mediaNodeList.length) {
                // mediaNodeObserver
                state.mediaNodeList.forEach(node => node && observer.observe(node))
            }
        })

        fetchData()

        return {
            ...toRefs(state),
            handleFileChange,
            handleDel,
        }
    }
}
</script>

<style scoped>
label {
    position: relative;
    cursor: pointer;
    color: #2ba6cb;
    display: inline-block;
    padding: 1rem;
}
input[type="file"] {
    display: none;
}
i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
}
.list {
    display: flex;
    flex-wrap: wrap;
}
.item {
    flex: none;
    max-width: 100%;
    margin-bottom: 1rem;
    margin-right: 1rem;
    position: relative;

    min-width: 300px;
    min-height: 300px;
}
.item a {
    position: absolute;
    right: 5px;
    top: 2px;
}
</style>
